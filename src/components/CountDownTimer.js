import React, { useContext } from 'react';
import CountDownDisplay from './CountDownDisplay';
import UseCountDown from '../app/service/UseCountDown';
import { ProvedorAutenticacaoContext } from "../main/ProvedorAutenticacaoContext";

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Sessão expirada!</span>
    </div>
  );
};

const ShowCounter = ({ minutes, seconds }) => {
  return (
    <div className="show-counter">
      <a
        className="countdown-link"
        href='#'
        rel="noopener noreferrer"
        target="_blank"
      >
        <CountDownDisplay isDanger={false} type="min" value={minutes} />
        <p>:</p>
        <CountDownDisplay isDanger={false} type="seg" value={seconds} />
      </a>
    </div>
  );
};

const CountDownTimer = () => {
  const { auth, encerrarSessao } = useContext(ProvedorAutenticacaoContext);

  var minutes = null;
  var seconds = null;

  [minutes, seconds] = UseCountDown(new Date(auth.expiration));

  if (auth.expiration !== null && auth.expiration !== undefined) {
    if ((minutes + seconds) === 0) {
      encerrarSessao();
    } else {
      return <ShowCounter minutes={minutes} seconds={seconds} />;
    }
  }

};

export default CountDownTimer;