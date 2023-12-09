import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { MainPage } from '../src/components/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/components/styles.css';
import { Telegram } from './components/Telegram';
import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [countDownTimer, setCountDownTimer] = useState(60);
  const [istelegrampage, setIstelegrampage] = useState(false);

 

  const onThemeButtonClick = () => {
    setIsLightTheme(!isLightTheme);
  };

  useEffect(() => {
    if (countDownTimer === 0) setCountDownTimer(60);
    countDownTimer > 0 &&
      setTimeout(() => setCountDownTimer(countDownTimer - 1), 1000);
  }, [countDownTimer]);

  useEffect(() => {
    // Check if the current route is "/connect/telegram"
    setIstelegrampage(window.location.pathname === '/connect/telegram');
  }, []);

  return (
    <Router>
      
        <Header
          isLightTheme={isLightTheme}
          onThemeButtonClick={onThemeButtonClick}
          countDownTimer={countDownTimer}
          istelegrampage={istelegrampage}
        />
        <Routes>
          <Route path="/" element={<MainPage isLightTheme={isLightTheme} />} />
          <Route path="/:currency" element={<MainPage isLightTheme={isLightTheme} />} />
          <Route
            path="/connect/telegram"
            element={<Telegram isLightTheme={isLightTheme} />}
          />
        </Routes>
        <div className={("theme-") + (isLightTheme ? "light" : "dark")}>
          <Footer />
        </div>
      
    </Router>
  );
}

export default App;
