import React from 'react'
import telegram from '../images/telegram.png'
import { useEffect,useState } from "react";
import { Header } from './Header';
import { Footer } from './Footer';

export const Telegram = (props) => {
  const [isLightTheme, setIsLightTheme ] = useState(false);
  const [istelegrampage, setistelegrampage ] = useState(true);
  const onThemeButtonClick = () => {
    setIsLightTheme(!isLightTheme)

};
  return (
      <>
      <div className={("theme-") + (props.isLightTheme ? "light" : "dark")}>
    
      <div class="Container-fluid " style={{ padding: "4px 30px" }}>
        <p className='text-center '>
        <span className='average-header-maintext '>Connect {<img src={telegram} className='telegram-logo-tg' />}Telegram</span><br></br><br></br>
<span className='subText-heading'>Add bot to your group </span><br></br><br></br>
<span className='font-medium'>Manual :</span><br></br>
1. Open the telegram app.<br></br>
2. Open the group you want to add the bot to.<br></br>
3. Click on add members in group settings.<br></br>
4. Search @HodlInfoBot and click it.<br></br><br></br>

<span className='font-medium'>Automatic :</span><br></br>
Go to : { <a href='https://t.me/HodlInfoBot?startgroup=true'className={props.isLightTheme=== false?'linktelegram':'linktelegramdark'} >https://t.me/HodlInfoBot?startgroup=true </a>}<br></br><br></br><br></br>

<span className='subText-heading'>Chat with the bot</span><br></br><br></br>
<span className='font-medium'>Manual :</span><br></br>
1. Open the telegram app.<br></br>
2. Click on new message button.<br></br>
3. In search bar type HodlInfoBot.<br></br>
4. Click on @HodlInfoBot.<br></br><br></br>

<span className='font-medium'>Automatic :</span><br></br>
Go to : {<a href='https://t.me/HodlInfoBot' className={props.isLightTheme=== false?'linktelegram':'linktelegramdark'}>https://t.me/HodlInfoBot</a>}<br></br>
        </p>

        </div>

      
   
      <div class="d-flex justify-content-center" style={{border:"solid 1px #191d28","background-color":"#191d28",position:"fixed",left:"0","align-items":"center",width:"100vw",height:"47px",bottom:"0","z-index":"8"}}><button class="add-button btn btn-outline-info" style={{display: "block"}}>Add hodlinfo to home screen</button></div>
      
    </div>

      </>
   
  )
}
