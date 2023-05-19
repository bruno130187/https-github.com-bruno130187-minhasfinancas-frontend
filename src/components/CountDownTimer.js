import CountDownDisplay from './CountDownDisplay';
import UseCountDown from '../app/service/UseCountDown';

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </div>
  );
};

const ShowCounter = ({ minutes, seconds }) => {
  return (
    <div className="show-counter">
      <a
        className="countdown-link"
        href="https://tapasadhikary.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        <CountDownDisplay isDanger={false} type="Mins" value={minutes} />
        <p>:</p>
        <CountDownDisplay isDanger={false} type="Seconds" value={seconds} />
      </a>
    </div>
  );
};

const CountDownTimer = ({ targetDate }) => {
  const [minutes, seconds] = UseCountDown(targetDate);

  if (minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return <ShowCounter minutes={minutes} seconds={seconds} />;
  }
};

export default CountDownTimer;