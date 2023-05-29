import React, { useContext } from 'react';
import CountDownDisplay from './CountDownDisplay';
import UseCountDown from '../app/service/UseCountDown';
import { ProvedorAutenticacaoContext } from "../main/ProvedorAutenticacaoContext";

const ShowCounter = ({ minutes, seconds, cor }) => {
  return (
    <div className="show-counter">
      <a
        className="countdown-link"
        style={{color: cor}}
        href='#'
        rel="noopener noreferrer"
        target="_blank"
      >
        <CountDownDisplay isDanger={false} type="min" value={minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})} />
        <p>:</p>
        <CountDownDisplay isDanger={false} type="seg" value={seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})} />
      </a>
    </div>
  );
};

const CountDownTimer = () => {
  const { auth, encerrarSessao } = useContext(ProvedorAutenticacaoContext);

  var minutes = null;
  var seconds = null;
  var cor = '';

  [minutes, seconds] = UseCountDown(new Date(auth.expiration));

  if (auth.expiration !== null && auth.expiration !== undefined) {
    if ((minutes + seconds) === 0) {
      encerrarSessao();
    } else {
      if (((minutes * 60) + seconds) < 300) {
        cor = 'yellow';
      } else {
        cor = '#ececec';
      }
      return <ShowCounter minutes={minutes} seconds={seconds} cor={cor}/>;
    }
  }

};

export default CountDownTimer;