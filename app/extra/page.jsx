"use client"
import { CommonContext } from '@/app/components/context/CommonContext';
import useViewPort from '@/app/components/customHooks/useViewPort';
import DivTag from '@/app/components/DivTag';
import Navigation from '@/app/components/nav/Navigation';
import { useParams } from 'next/navigation'
import React, { useContext, useState } from 'react'
import Footer from '../components/nav/Footer';
import InputSelect from '../components/form/InputSelect';
import { Email, MonetizationOn, Person } from '@mui/icons-material';
import Translate from '../components/Translate';
import { FlutterWaveButton } from 'flutterwave-react-v3';
import InputText from '../components/form/InputText';
import AnimateBtn from '../components/reuseable/AnimateBtn';

const Page = (props) => {
  const { deviceHeight, deviceWidth, language, currency } = useContext(CommonContext);
  const [navHeight, setnavHeight] = useState(0);
  const [amount, setamount] = useState('');
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [error, seterror] = useState({ name: false, email: false, amount: false });

  const { price } = useParams();
  const articlePad = useViewPort([
    '10px', '10px', '20px', '10px 10%', '10px 20%', '10px 30%'
  ]);
  const cardWidth = useViewPort(['340px', '360px', '400px']);

  const getLayout = (rect) => {
    const { height } = rect
    setnavHeight(height)
  }

  const config = {
    public_key: 'FLWPUBK-b407c2d81af92b2e9df00e00ea51b4d3-X',
    tx_ref: Date.now(),
    amount: Number(amount),
    currency: currency.name,
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'space.wisdom@yahoo.com',
      phone_number: '09078378247',
      name: name,
    },
    customizations: {
      title: 'Massage Booking: extra fee',
      description: 'Booking',
      logo: 'https://www.tpurse.com/therabonnie.png',
    },
  };

  const fwConfig = {
    ...config,
    text: Translate(`Pay Extra Fee`, language),
    callback: async (response) => {
      closePaymentModal() // this will close the modal programmatically
    },
    onClose: () => { },
  };

  const handleError = () => {
    if (amount.trim() == "") {
      seterror((prev) => {
        return { ...prev, amount: true }
      })
    }
    if (name.trim() == "") {
      seterror((prev) => {
        return { ...prev, name: true }
      })
    }
    if (email.trim() == "") {
      seterror((prev) => {
        return { ...prev, email: true }
      })
    }
  }

  return (
    <DivTag
      // width={windowWidth + "px"}
      height={deviceHeight + "px"}
      bgc={"linear-gradient(0deg, #0a0f15 44%, #14181d)"}
      position={"relative"}
      overflow={"auto"}
      gtr={"auto 1fr auto"}
    >
      <DivTag
        position={'sticky'}
        top={'0px'}
        zIndex={"100"}
        maxWidth={deviceWidth + "px"}
      >
        <Navigation onLayout={getLayout} />
      </DivTag>
      <DivTag
        height={'max-content'}
      >
        <main
          style={{
            // height: (deviceHeight - navHeight),
            // width: windowWidth + 'px',
            overflowY: 'auto',
            overflowX: 'hidden',
            display: 'grid',
            padding: articlePad,
            boxSizing: 'border-box'
          }}
        >
          <DivTag
            display={"block"}
            // padding={'0 15px'}
            bSizing={'border-box'}
          >
            <DivTag
              margin={'1.5rem 0'}
              gap={'10px'}
              align={'center'}
              justify={'center'}
            >
              <DivTag
                color={"#417e38"}
              >
                <h2>Extra Charges</h2>
              </DivTag>
            </DivTag>
            <DivTag
              gap={"10px"}
              margin={'0 auto'}
              width={cardWidth}
              bSizing={'border-box'}
              bgc={'linear-gradient(180deg, rgba(255, 255, 255, 0.8), rgb(255 255 255))'}
              minHeight={"max-content"}
              bRadius={"15px"}
              color={"black"}
              padding={'1rem 10px'}
            >
              <InputText
                tabIndex={"1"}
                label={Translate("Full Name", language)}
                inputType={"text"}
                autoComplete={"false"}
                padding={0}
                id={"name"}
                name={"name"}
                value={name}
                error={error.name}
                inputBgc={"#fdfdfd"}
                width={"320px"}
                placeholder={"E.g John Doe..."}
                inputColor={"black"}
                onChange={(e) => {
                  setname(e.target.value);
                  seterror({ ...error, ['name']: false });
                }}
                iconLeft={<Person fontSize="large" color="action" sx={{ p: "0px" }} />}
              />
              <InputText
                tabIndex={"2"}
                label={Translate("email", language)}
                inputType={"email"}
                autoComplete={"false"}
                padding={0}
                id={"email"}
                name={"email"}
                value={email}
                error={error.email}
                inputBgc={"#fdfdfd"}
                width={"320px"}
                placeholder={"e.g customer@email.com..."}
                inputColor={"black"}
                iconLeft={<Email fontSize="large" color="action" sx={{ padding: "0px" }} />}
                onChange={(e) => {
                  setemail(e.target.value);
                  seterror({ ...error, ['email']: false });
                }}
              />
              <InputSelect
                label={Translate("Extra fee as agreed with the therapist.", language)}
                // padding={'10px 0 0 0'}
                id={"bank"}
                name={"bank"}
                value={amount}
                error={error.amount}
                inputBgc={"#fdfdfd"}
                inputColor={"black"}
                valueColor={"black"}
                width={"320px"}
                iconLeft={<MonetizationOn fontSize="large" color="action" sx={{ padding: "0px" }} />}
                onChange={(e) => {
                  setamount(e.target.value)
                  seterror({ ...error, ['amount']: false })
                }}
              >
                <option value="">-- {Translate('select amount', language)} --</option>
                <option value={60}>{currency.symbol}{60}</option>
                <option value={100}>{currency.symbol}{100}</option>
                <option value={150}>{currency.symbol}{150}</option>
                <option value={200}>{currency.symbol}{200}</option>
                <option value={250}>{currency.symbol}{250}</option>
                <option value={300}>{currency.symbol}{300}</option>
                <option value={350}>{currency.symbol}{350}</option>
                <option value={400}>{currency.symbol}{400}</option>
                <option value={450}>{currency.symbol}{450}</option>
                <option value={500}>{currency.symbol}{500}</option>
                <option value={550}>{currency.symbol}{550}</option>
                <option value={600}>{currency.symbol}{600}</option>
                <option value={650}>{currency.symbol}{650}</option>
                <option value={700}>{currency.symbol}{700}</option>
                <option value={750}>{currency.symbol}{750}</option>
                <option value={800}>{currency.symbol}{800}</option>
                <option value={850}>{currency.symbol}{850}</option>
                <option value={900}>{currency.symbol}{900}</option>
                <option value={950}>{currency.symbol}{950}</option>
                <option value={1000}>{currency.symbol}{1000}</option>
              </InputSelect>
              <DivTag
                // display={"flex"}
                justify={"center"}
                align={"center"}
                gtc={"1fr"}
                margin={"15px 0 0 0"}
              >
                {name.trim() == '' || email.trim() == "" || amount.trim() == "" ?
                  <AnimateBtn
                    btnText={Translate('Pay Extra Fee', language)}
                    bgc={'#417e38'}
                    buttonStyle={{ padding: "3px 15px", fontSize: 18 }}
                    justify={"center"}
                    animateColor={"white"}
                    animateBgColor={"green"}
                    color={"white"}
                    handleClick={handleError}
                  />
                  :
                  <FlutterWaveButton className={"btn-pay"} {...fwConfig} />
                }
              </DivTag>
            </DivTag>
          </DivTag>
        </main>
      </DivTag>
      <Footer />
    </DivTag>
  )
}

export default Page