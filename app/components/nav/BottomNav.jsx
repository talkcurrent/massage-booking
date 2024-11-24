import React from 'react';
import DivTag from '../DivTag';
import NavBarMobile from './NavBarMobile';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Home } from '@mui/icons-material';
import LeftBar from '@/app/dashboard/components/LeftBar';

const BottomNav = ({ authUser, tab, settab, singOutUser }) => {
    return (
        <DivTag
            position={'fixed'}
            bottom={'0px'}
            left={'0px'}
            right={'0px'}
            width={'100%'}
            minHeight={'30px'}
            color={'#BEBEC4'}
            bgc={'#22262f'}
        >
            <DivTag gap={"5px"} gtc={"auto auto auto auto"} >
                <DivTag
                    display={'flex'}
                    justifyContent={'center'}
                    height={'max-content'}
                    align={'center'}
                    color={'white'}
                    bgc={tab === 1 ? '#1c5647' : 'transparent'}
                    gap={'5px'}
                    cursor={"pointer"}
                    handleClick={() => settab(1)}
                    padding={'5px 5px'}
                >
                    <Home fontSize={'large'} color="inherit" sx={{ p: "0px", fontSize: '1rem' }} />
                    <span style={{ fontSize: '1rem' }}>Dashboard</span>
                </DivTag>
                <DivTag
                    display={'flex'}
                    justifyContent={'center'}
                    height={'max-content'}
                    align={'center'}
                    color={'white'}
                    bgc={tab === 2 ? '#1c5647' : 'transparent'}
                    gap={'5px'}
                    cursor={"pointer"}
                    handleClick={() => settab(2)}
                    padding={'5px 5px'}
                >
                    <span style={{ fontSize: '15px', padding: '0 4px' }}>&#8358;</span>
                    <span style={{ fontSize: '1rem' }}>Withdrawal</span>
                </DivTag>
                <DivTag
                    display={'flex'}
                    justifyContent={'center'}
                    height={'max-content'}
                    align={'center'}
                    color={'white'}
                    bgc={tab === 3 ? '#1c5647' : 'transparent'}
                    gap={'5px'}
                    cursor={"pointer"}
                    handleClick={() => settab(3)}
                    padding={'5px 5px'}
                >
                    <QuestionAnswerIcon fontSize={'medium'} color="inherit" sx={{ p: "0px", fontSize: '1rem' }} />
                    <span style={{ fontSize: '1rem' }}>Q & A</span>
                </DivTag>
                <DivTag
                    display={'flex'}
                    justifyContent={'center'}
                    height={'max-content'}
                    align={'center'}
                    color={'#ADBBDA'}
                    gap={'10px'}
                    cursor={"pointer"}
                    padding={'5px 5px'}
                >
                    <NavBarMobile
                        // top={'unset'}
                        bottom={31}
                    >
                        <LeftBar
                            authUser={authUser}
                            tab={tab}
                            settab={settab}
                            singOutUser={singOutUser}
                        />
                    </NavBarMobile>
                </DivTag>

            </DivTag>
        </DivTag>
    )
}

export default BottomNav