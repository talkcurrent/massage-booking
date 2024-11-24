"use client";

import React, { useEffect, useRef, useState } from "react";
import server from "../../server";
import { useRouter, usePathname } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getCountFromServer, getDoc, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";

export const CommonContext = React.createContext();

export const CommonProvider = (props) => {
    const { db } = server();
    const [commission, setcommision] = useState(1000);

    const [report, setReport] = useState(null);
    const [authUser, setauthUser] = useState(null);
    // const [report, setReport] = useState({
    //     template: "Lorem ipsum dolor sit  nesciunt, in amet corpor distur natuserum voluptatum, unde exercitationem! Eaque laborioslectus. Eveniet laboriosam reprehenderit quibusdam amet consectetur et voluptatem accusantium illo sint  voluptatibus ducimus",
    //     name: "JANET ENEMONA JOY",
    //     gender: "Female",
    //     age: "25",
    //     reportDate: new Date(),
    // });
    const [institutions, setinstitutions] = useState([]);
    const [articles, setarticles] = useState([]);

    const [posts, setposts] = useState([]); //admin use only
    const [users, setusers] = useState([]); //admin use only
    const [searchedUsers, setsearchedUsers] = useState([]); //admin use only
    const [usersDueForPay, setusersDueForPay] = useState([]); //admin use only
    const [allUsers, setallUsers] = useState([]); //admin use only
    const [transactions, settransactions] = useState([]); //admin use only
    const [pendingTransactions, setpendingTransactions] = useState([]); //admin use only
    const [settledTransactions, setsettledTransactions] = useState([]); //admin use only

    const [gettingInstitutions, setgettingInstitutions] = useState(false);
    const [savingReport, setSavingReport] = useState(false);
    const [savingReportResolved, setSavingReportResolved] = useState(false);
    const [gettingReport, setgettingReport] = useState(false);

    const [fetchingReferrals, setfetchingReferrals] = useState(false);
    const [fetchingTransactions, setfetchingTransactions] = useState(false);

    const { addInstitution, getInstitution, getReport, getArticle } = server();

    const router = useRouter();
    const currentPath = usePathname();
    const auth = getAuth();

    const userBanksFetch = useRef()
    const userReferralsFetch = useRef()
    const transactionsFetch = useRef()
    const earningFetch = useRef()

    useEffect(() => {
        // if (!institutions.length) {
        //     getInstitutions();
        // }
        onAuthStateChanged(auth, async (user) => {

            if (user) {
                const { email, uid, displayName } = user;
                if (displayName) {
                    const userRef = doc(db, "users", displayName);

                    await getDoc(userRef).then(docSnap => {
                        if (docSnap.exists()) {
                            setauthUser(docSnap.data())
                            document.cookie = `bluereport-user=${uid}; path=/;`;
                            if (docSnap.data().hasOwnProperty('isAdmin') && docSnap.data().isAdmin) {
                                document.cookie = `bluereport-odubaogagwu=${uid}; path=/;`;
                            }
                            // handleUserDashboard(docSnap.data());
                        }
                    })
                }
            } else {
                setauthUser(null)
                if (location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/odubaogagwu') || location.pathname.startsWith('/agabaidu')) {
                    document.cookie = `bluereport-user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                    document.cookie = `bluereport-odubaogagwu=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                    router.replace(`/affiliate/login`);
                }
            }
        })
    }, []);

    useEffect(() => {
        if (authUser) {
            updateUserEarnings()
        }
    }, [authUser]);

    useEffect(() => {
        if (authUser && !authUser.hasOwnProperty('referrals')) {
            getlatestReferrals()
        }
    }, [authUser]);

    useEffect(() => {
        if (authUser && !authUser.hasOwnProperty('accounts')) {
            getuserBanks()
        }
    }, [authUser]);

    const updateUserEarnings = async () => {
        clearTimeout(earningFetch.current);
        try {
            const { nickName } = authUser;
            let reportsCol = collection(db, "reports");
            const q = query(reportsCol,
                where("referrer", "==", nickName),
                where("paid", "==", 1),
                where("commissionClaimed", "==", false),
            );
            const snapshot = await getCountFromServer(q);
            let totalToClaim = snapshot.data().count;

            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    const docId = doc.id;
                    updateReportCommissionClaim(docId, totalToClaim)
                });
            }
        } catch (error) {
            earningFetch.current = setTimeout(() => {
                updateUserEarnings()
            }, 20000);
        }
    }
    const updateReportCommissionClaim = async (docId, totalToClaim) => {
        const reptRef = doc(db, "reports", docId);
        const userRef = doc(db, "users", authUser.nickName);

        await updateDoc(reptRef, {
            commissionClaimed: true
        }).then(async () => {
            //get user initial commission
            await getDoc(userRef).then(async (user) => {
                if (user.exists()) {
                    let lastCommission = user.data().commission;
                    await updateDoc(userRef, {
                        commission: lastCommission + (totalToClaim * commission)
                    }).then(async () => {
                        await getDoc(userRef).then(docSnap => {
                            if (docSnap.exists()) {
                                setauthUser(docSnap.data());
                            }
                        })
                        earningFetch.current = setTimeout(() => {
                            updateUserEarnings()
                        }, 20000);
                    })
                }
            });
        })

    }
    const getlatestReferrals = async () => {
        const { nickName, commission } = authUser;
        try {
            setfetchingReferrals(true)
            let reportsCol = collection(db, "reports");
            const q = query(reportsCol,
                where("referrer", "==", nickName),
                where("paid", "==", 1),
                limit(commission / 1000), //This will fetch only referrals as per the current commission
            );
            const querySnapshot = await getDocs(q);
            var referrals = [];
            querySnapshot.forEach((doc) => {
                const { name, phone, gender, path } = doc.data();
                let referral = { id: doc.id, name, phone, gender, path };

                referrals = [...referrals, referral];
            });
            setauthUser(prev => {
                return { ...prev, latestReferralsCount: referrals.length, referrals: referrals }
            })
            setfetchingReferrals(false)
        } catch (e) {
            userReferralsFetch.current = setTimeout(() => {
                getlatestReferrals()
            }, 1000);
        }
    }
    const getuserBanks = async () => {
        const { userId } = authUser;
        try {
            let reportsCol = collection(db, "accounts");
            const q = query(reportsCol,
                where("userId", "==", userId),
            );
            const querySnapshot = await getDocs(q);
            var accounts = [];
            querySnapshot.forEach((doc) => {
                const { accNumber, bankName } = doc.data();
                let acount = { id: doc.id, accNumber, bankName, default: doc.data().default };
                accounts = [...accounts, acount];
            });
            setauthUser(prev => {
                return { ...prev, accounts: accounts }
            })
            clearTimeout(userBanksFetch.current)
        } catch (e) {
            userBanksFetch.current = setTimeout(() => {
                getuserBanks()
            }, 1000);
        }
    }
    const handleTransactions = async () => {
        const { userId } = authUser;
        setfetchingTransactions(true)
        try {

            let transactionCol = collection(db, "transactions");
            const q = query(transactionCol,
                where("userId", "==", userId),
                orderBy("createdAt", "desc"),
                limit(50)
            );
            const querySnapshot = await getDocs(q);
            var transactions = [];
            querySnapshot.forEach((doc) => {
                let transact = { id: doc.id, ...doc.data() };
                transactions = [...transactions, transact];
            });
            setauthUser(prev => {
                return { ...prev, transactions: transactions }
            })
            setfetchingTransactions(false)
            clearTimeout(transactionsFetch.current)
        } catch (e) {
            setfetchingTransactions(false)
            transactionsFetch.current = setTimeout(() => {
                handleTransactions()
            }, 1000);
        }
    }

    const getClientReport = async (number) => {
        if (report == null) {
            setgettingReport(true);
            const response = await getReport(number);
            if (response.ok) {
                const { paid, path } = response.data
                if ((paid == 1) && (path == currentPath)) {
                    //data existed & applicant made payment
                    setReport(response.data);
                } else if ((paid == 0) && (path == currentPath)) {
                    router.push("/payment");
                } else {
                    router.push("/report-form");
                }
            } else {
                router.push("/report-form");
            }
            setgettingReport(false);
        }
    };

    const getInstitutions = async () => {
        setgettingInstitutions(true);
        const response = await getInstitution();
        if (response.ok) {
            let hospitals = response.data
            hospitals.sort((a, b) => {
                const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
            })
            setinstitutions(hospitals);
        }
        setgettingInstitutions(false);
    };

    const putReport = async (data) => {
        setSavingReport(true);
        setSavingReportResolved(false);
        const response = await addInstitution(data);
        if (response === true) {
            setSavingReportResolved(true);
            setSavingReport(false);
        }
    };
    return (
        <CommonContext.Provider
            value={{
                report, commission,
                setReport,
                gettingReport,
                savingReport,
                savingReportResolved,
                getClientReport,
                putReport, fetchingReferrals,
                gettingInstitutions, institutions, getInstitutions,
                institutions, articles, setarticles, posts, setposts,
                authUser, setauthUser, users, setusers,
                handleTransactions, fetchingTransactions, getuserBanks,
                searchedUsers, setsearchedUsers, usersDueForPay, setusersDueForPay,
                allUsers, setallUsers, transactions, settransactions,
                pendingTransactions, setpendingTransactions,
                settledTransactions, setsettledTransactions,
            }}
        >
            {props.children}
        </CommonContext.Provider>
    );
};

export default CommonProvider;
