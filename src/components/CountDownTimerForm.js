import { useState, useMemo, useEffect } from 'react';
import CountDownTimer from './CountDownTimer';
import AuthService from '../app/service/AuthService';

const CountDownTimerForm = (props) => {

  const service = useMemo(() => {
    return new AuthService();
  }, []);

  console.log('service.getExpirationToken() : ', new Date(service.getExpirationTokenPlusNow()));

  const [targetDate, setTargetDate] = useState(new Date(service.getExpirationTokenPlusNow()));

  return (
    <>
      <div className="play-details">
        <div className="play-details-body">
          <div className="countdown-container">
            <p>
              Select a date and time in the past, present, and future to see how the countdown timer
              will display.
            </p>
            <CountDownTimer targetDate={targetDate} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CountDownTimerForm;