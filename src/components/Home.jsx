import React from 'react';
import { useState, useEffect } from 'react';
import styles from './Home.module.css'; // Está estilizando os textos



function Home() {

    function marcarPonto(){
        console.log(`Hora marcada com sucesso às ${time.hours}:${time.minutes}:${time.seconds}`)
    }

    const today = new Date();
    const day = today.getDate();   
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    const [time, setTime] = useState({
        hours: "00",
        minutes: "00",
        seconds: "00",
        day: "00"
      });
    
      useEffect(() => {
        const updateTime = () => {
          const now = new Date();
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          const seconds = String(now.getSeconds()).padStart(2, '0');
    
          setTime({ hours, minutes, seconds, day });
        };

        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
      }, []);

  return (
    <div>
        <div className='relogio'>
            <h1 style="color: white">Relógio de Ponto</h1>
            <h2 style="color: white">{day}/{month}/{year}</h2>
            <h2 style="color: white">{time.hours}:{time.minutes}:{time.seconds}</h2>
            <button onClick={marcarPonto} className="btn btn-outline-primary">Marcar ponto</button>
        </div>

    </div>
  )
}

export default Home