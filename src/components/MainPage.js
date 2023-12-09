import React from "react";
import { useEffect,useState } from "react";
import "./styles.css";
import {Header} from "./Header";
import {Footer} from "./Footer";
import wazix from '../images/wazix.png'
import bitbns from '../images/bitbns.png'
import colodax from '../images/colodax.png'
import zebpay from '../images/zebpay.png'
import giotus from '../images/giotus.png'
import { Link } from "react-router-dom";

import 'react-circular-progressbar/dist/styles.css';
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import { data } from "jquery";

const override = css`display: block;
  margin: 0 auto;
  border-color: #5dc7c2;
`;
export const MainPage = (props) => {
    const currentURL = window.location.href;


const pathname = window.location.pathname;


const currencyPair = pathname.substring(1); 
const currencies = currencyPair.split('-');


const firstCurrency = currentURL === "https://amanquadb-frontend.vercel.app/" ? "BTC" : currencies[0];



const secondCurrency = currencies[1];
const [loading, setLoading] = useState(true);
  const [tickerData, setTickerData] = useState([]);
 const [itembuy,setitembuy]= useState();
 const calculateDifferenceClass = (lastTradedPrice, buyPrice) => {
    const differencePercentage = ((lastTradedPrice - buyPrice) / buyPrice) * 100;
    return differencePercentage >= 0 ? 'color-green' : 'color-red';
  };
  
  // Function to calculate savings class
  const calculateSavingsClass = (lastTradedPrice, sellPrice) => {
    const savings = lastTradedPrice - sellPrice;
    return savings >= 0 ? 'color-green' : 'color-red';
  };
  
  // Function to calculate difference percentage
  const calculateDifferencePercentage = (lastTradedPrice, buyPrice) => {
    return (((lastTradedPrice - buyPrice) / buyPrice) * 100).toFixed(2);
  };
  
  // Function to calculate savings
  const calculateSavings = (lastTradedPrice, sellPrice) => {
    return Math.abs(lastTradedPrice - sellPrice).toLocaleString('en-IN');
  };
useEffect(() => {
  const fetchTickerData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://api-a88a.onrender.com/api/ticker?firstCurrency=${firstCurrency.toLowerCase()}`);
      const data = await response.json();

      // Wrap the single object in an array
      setTickerData(Array.isArray(data) ? data : [data]);
      setitembuy(data[0]?.buy);
    } catch (error) {
      console.error('Error fetching ticker data:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchTickerData();
}, [firstCurrency]);




    
    
    return (
        <>
            <div className={("theme-") + (props.isLightTheme ? "light" : "dark")}>
            
            {loading ? (
          <div style={{ textAlign: "center", color: "#5dc7c2", width: "100vw", height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <ClipLoader css={override} size={100} color={"#5dc7c2"} loading={loading} />
         
        </div>
        ) :  (<><div class="Container-fluid " style={{ padding: "0px 30px" }}>
        <div class="d-flex justify-content-around align-items-center average-header" style={{ padding: "10px 0px" }}>
            <div class="text-center">
                <div class="average-header-maintext color-green">0.47 %</div>
                <div class="average-header-subHeading">5 Mins</div>
            </div>
            <div class="text-center">
                <div class="average-header-maintext color-green">0.98 %</div>
                <div class="average-header-subHeading">1 Hour</div>
            </div>
            <div style={{ "max-width": "40%" }}>
                <div class="text-center font-32 average-block">
                    <div class="average-subText">
                        <span class="subText-heading">Best Price to Trade</span>
                    </div>
                    <div class="average-heading" style={{ "padding-bottom": "10px" }}> ₹ {parseInt(itembuy).toLocaleString('en-IN')}</div>
                    <div class="average-subText">Average {firstCurrency}/INR  net price including commission</div>
                </div>
            </div>
            <div class="text-center">
                <div class="average-header-maintext color-green">5.86 %</div>
                <div class="average-header-subHeading">1 Day</div>
            </div>
            <div class="text-center">
                <div class="average-header-maintext color-green">6.41 %</div>
                <div class="average-header-subHeading">7 Days</div>
            </div>
        </div>
        
    </div>
    <div class="fiat-crypto-table table-responsive" style={{ margin: "0px auto" }}>
        <table class="table table-borderless text-center">
            <thead>
                <tr>
                    <th>
                        <h4><span class="pointer">#</span></h4>
                    </th>
                    <th>
                        <h4><span class="pointer">Platform</span></h4>
                    </th>
                    <th>
                        <h4><span class="pointer">Last Traded Price</span></h4>
                    </th>
                    <th><h4><span class="pointer">Buy / Sell Price</span></h4>
                    </th>
                    <th><h4><span class="pointer">Difference</span></h4>
                    </th>
                    <th>
                        <h4><span class="pointer">Savings</span></h4>
                    </th>
                </tr>
            </thead>
            <tbody>
            
  {tickerData.map((item, index) => (
    <tr key={index}>
      <td class="align-middle"><h4 class="table-text">{index + 1}</h4></td>
      <td class="align-middle">
        <Link to="/" className="nameline">
          <h4 class="table-text">
            <img src={wazix} class="exchange-logo" alt={`logo-${index}`} />
            <span class="exchange-name ">WazirX</span>
          </h4>
        </Link>
      </td>
      <td class="align-middle"><h4 class="table-text">₹ {parseFloat(item.last).toLocaleString('en-IN')}</h4></td>
      <td class="align-middle"><h4 class="table-text"><span>₹ {parseFloat(item.buy).toLocaleString('en-IN')} / ₹ {parseFloat(item.sell).toLocaleString('en-IN')}</span></h4></td>
      
      <td class="align-middle"><h4 class={`table-text ${calculateDifferenceClass(item.last, item.buy)}`}>{calculateDifferencePercentage(item.last, item.buy)} %</h4></td>
    <td class="align-middle"><h4 class={`table-text ${calculateSavingsClass(item.last, item.sell)}`}>▼ ₹ {calculateSavings(item.last, item.sell)}</h4></td>
    </tr>
  ))}

 

                <tr><td class="align-middle"><h4 class="table-text">2</h4></td>
                    <td class="align-middle"><Link  to="/" className="nameline">
                        <h4 class="table-text">
                            <img src={bitbns} class="exchange-logo" />
                            <span class="exchange-name ">Bitbns</span>
                        </h4></Link></td>
                    <td class="align-middle"><h4 class="table-text">₹ 1,76,875</h4></td>
                    <td class="align-middle"><h4 class="table-text"><span>₹ 1,75,745 / ₹ 1,76,801</span></h4></td>
                    <td class="align-middle"><h4 class="table-text color-green">5.70 %</h4></td>
                    <td class="align-middle"><h4 class="table-text color-green">▲ ₹ 9,540</h4></td>
                </tr><tr><td class="align-middle"><h4 class="table-text">3</h4></td>
                    <td class="align-middle"><Link  to="/" className="nameline"><h4 class="table-text">
                        <img src={giotus}  class="exchange-logo" /><span class="exchange-name ">Colodax</span></h4></Link></td>
                    <td class="align-middle"><h4 class="table-text">₹ 1,79,000</h4></td><td class="align-middle"><h4 class="table-text"><span>₹ 1,78,010 / ₹ 1,79,000</span></h4></td>
                    <td class="align-middle"><h4 class="table-text color-green">6.97 %</h4></td>
                    <td class="align-middle"><h4 class="table-text color-green">▲ ₹ 11,665</h4></td>
                </tr>
                <tr>
                    <td class="align-middle"><h4 class="table-text">4</h4></td>
                    <td class="align-middle"><Link  to="/" className="nameline"><h4 class="table-text">
                        <img src={colodax} class="exchange-logo" /><span class="exchange-name ">Zebpay</span></h4></Link></td>
                    <td class="align-middle"><h4 class="table-text">₹ 1,08,675</h4></td>
                    <td class="align-middle"><h4 class="table-text"><span>₹ 1,08,675 / ₹ 1,10,469</span></h4></td>
                    <td class="align-middle"><h4 class="table-text color-red">-35.06 %</h4></td>
                    <td class="align-middle"><h4 class="table-text color-red">▼ ₹ 58,659</h4></td>
                </tr>
                <tr>
                    <td class="align-middle"><h4 class="table-text">5</h4></td>
                    <td class="align-middle"><Link  to="/" className="nameline"><h4 class="table-text">
                        <img src={zebpay}  class="exchange-logo" /><span class="exchange-name">CoinDCX</span></h4></Link></td>
                    <td class="align-middle"><h4 class="table-text">₹ 1,82,000</h4></td>
                    <td class="align-middle"><h4 class="table-text"><span>₹ 1,82,200 / ₹ 1,82,000</span></h4></td>
                    <td class="align-middle"><h4 class="table-text color-green">8.76 %</h4></td>
                    <td class="align-middle"><h4 class="table-text color-green">▲ ₹ 14,665</h4></td>
                </tr>
               
            </tbody>
        </table>
    </div>
    </>)}


            
           
        <div class="d-flex justify-content-center" style={{border:"solid 1px #191d28","background-color":"#191d28",position:"fixed",left:"0","align-items":"center",width:"100vw",height:"47px",bottom:"0","z-index":"8"}}><button class="add-button btn btn-outline-info" style={{display: "block"}}>Add hodlinfo to home screen</button></div>
        </div>

        </>
    )
};