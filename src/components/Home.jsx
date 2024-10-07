import React, { useState, useEffect } from 'react';
import styles from './Home.module.css'; // Está estilizando os textos
import axios from 'axios';

function Home() {
  const [time, setTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const today = new Date();
  const day = today.getDate();   
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  const fetchTimeForBrasilia = async () => {
    try {
      const response = await axios.get("http://worldtimeapi.org/api/timezone/America/Sao_Paulo");
      const dateTime = new Date(response.data.datetime); // Obtém a hora de Brasília da API
      const hours = String(dateTime.getHours()).padStart(2, '0');
      const minutes = String(dateTime.getMinutes()).padStart(2, '0');
      const seconds = String(dateTime.getSeconds()).padStart(2, '0');
      setTime({ hours, minutes, seconds });
    } catch (error) {
      console.log('Erro ao buscar a hora de Brasília:', error);
      console.log('Tenta verificar o horário do seu dispositivo, verifique se está correto.')
    }
  };

  const handleLocationSuccess = () => {
    setLocationAllowed(true);
    fetchTimeForBrasilia(); // Usa o horário de Brasília
  };

  const handleLocationError = () => {
    setErrorMsg('Não foi possível acessar sua localização. Usando Brasília como padrão.');
    setLocationAllowed(false);
    fetchTimeForBrasilia(); // Usa o horário de Brasília como fallback
  };

  useEffect(() => {
    // Solicita a localização do usuário
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleLocationSuccess, handleLocationError);
    } else {
      setErrorMsg('Geolocalização não é suportada pelo seu navegador. Usando Brasília como padrão.');
      fetchTimeForBrasilia(); // Usa Brasília como fallback
    }

    const intervalId = setInterval(fetchTimeForBrasilia, 1000); // Atualiza o horário a cada segundo

    return () => clearInterval(intervalId);
  }, []);

  const marcarPonto = () => {
    if (!locationAllowed) {
      console.log('Erro: Permita o acesso à localização para marcar o ponto.');
    } else {
      console.log(`Hora marcada com sucesso às ${time.hours}:${time.minutes}:${time.seconds}`);
    }
  };

  return (
    <div>
      <div className='relogio'>
        <h1 style={{color: 'white'}}>Relógio de Ponto</h1>
        <h2 style={{color: 'white'}}>{day}/{month}/{year}</h2>
        <h2 style={{color: 'white'}}>{time.hours}:{time.minutes}:{time.seconds}</h2>
        {errorMsg && <p style={{color: 'red'}}>{errorMsg}</p>}
        <button onClick={marcarPonto} className="btn btn-outline-primary" disabled={!locationAllowed}>
          Marcar ponto
        </button>
      </div>
    </div>
  );
}

export default Home;
