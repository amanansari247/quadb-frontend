import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/hodlinfo_logo.png';
import telegram from '../images/telegram.png';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export const Header = (props) => {
  const navigate = useNavigate();
  const [dropdownOpenCurrency, setDropdownOpenCurrency] = useState(false);
  const [dropdownOpenAsset, setDropdownOpenAsset] = useState(false);
  const [currency, setCurrency] = useState('INR');
  const [asset, setAsset] = useState('BTC');
  const [baseUnits, setBaseUnits] = useState([]);

  const toggleCurrency = () => setDropdownOpenCurrency((prevState) => !prevState);
  const toggleAsset = () => setDropdownOpenAsset((prevState) => !prevState);

  const handleclick = (asset) => {
    setAsset(`${asset}`);
    navigate(`/${asset.toUpperCase()}-${currency}`);
  };

  useEffect(() => {
    // Fetch base units from the API
    const fetchBaseUnits = async () => {
      try {
        const response = await fetch('https://api-a88a.onrender.com/api/baseunit');
        const data = await response.json();
        setBaseUnits(data);
      } catch (error) {
        console.error('Error fetching base units:', error);
      }
    };

    fetchBaseUnits();
  }, []);

  return (
    <div className={`theme-${props.isLightTheme ? 'light' : 'dark'}`}>
      <div style={{ padding: '20px 30px 0px' }}>
        <div className="align-items-center justify-content-sm-center row">
          <div className="text-center-sm col-12 col-sm-7 col-md-5 col-lg-4">
            <a href="/">
              <div className="padding-none text-center-xs col-12 col-sm-12 col-md-11 col-lg-11">
                <img src={logo} className="fiat-logo" style={{ padding: '10px' }} alt="Logo" />
              </div>
            </a>
          </div>
          <div
            className={`text-center padding-none col-12 col-sm-12 col-md-2 col-lg-4 ${
              props.istelegrampage ? 'diplayhide' : 'displayvis'
            } `}
          >
            <div className="btn-group">
              <ButtonDropdown isOpen={dropdownOpenCurrency} toggle={toggleCurrency}>
                <DropdownToggle caret className="header-button">
                  {currency}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem value="INR" onClick={(e) => setCurrency(e.target.value)}>
                    INR
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </div>
            <div className="btn-group">
              <ButtonDropdown isOpen={dropdownOpenAsset} toggle={toggleAsset}>
                <DropdownToggle caret className="header-button">
                  {asset.toUpperCase()}
                </DropdownToggle>
                <DropdownMenu>
                  {baseUnits.map((unit) => (
                    <DropdownItem key={unit} value={unit} onClick={(e) => handleclick(e.target.value)}>
                      {unit.toUpperCase()}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </ButtonDropdown>
            </div>
            <div className="btn-group">
              <a
                target=""
                href=""
                type="button"
                aria-haspopup="true"
                aria-expanded="false"
                className="header-button btn btn-secondary"
              >
                BUY {asset.toUpperCase()}
              </a>
            </div>
          </div>
          <div className="right-header col-12 col-sm-12 col-md-5 col-lg-4">
            <div className="d-inline-flex flex-wrap align-items-center justify-content-center">
              <div className={`progress-bar-wrapper ${props.istelegrampage ? 'diplayhide' : 'displayvis'}`}>
                <CircularProgressbar value={parseFloat((props.countDownTimer * 100) / 60.0)} text={`${props.countDownTimer}`} />
              </div>
              <a className="color-white" href="/connect/telegram">
                <div
                  className={`d-flex telegram-logo-text header-telegram-button btn align-items-center pointer color-white ${
                    props.istelegrampage ? 'diplayhide' : 'displayvis'
                  } `}
                >
                  <div className="d-inline-block">
                    <img src={telegram} className="telegram-logo" alt="Telegram Logo" />
                  </div>
                  <div className="text-nowrap d-inline-block color-white">Connect Telegram</div>
                </div>
              </a>
              <div className="margin-10 d-inline-block">
                <label className="switch">
                  <input type="checkbox" checked={!props.isLightTheme} onChange={props.onThemeButtonClick} />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
