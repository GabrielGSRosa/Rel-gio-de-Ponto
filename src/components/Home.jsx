import React, { useState, useEffect } from 'react';

function Home() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  // Função para verificar o tamanho da tela
  const checkDeviceType = () => {
    const width = window.innerWidth;
    if (width <= 1075) { 
      setIsMobileOrTablet(true);
    } else {
      setIsMobileOrTablet(false);
    }
  };

  useEffect(() => {
    checkDeviceType(); 
    window.addEventListener('resize', checkDeviceType); 
    
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  const handleDownloadClick = () => {
    window.location.href = 'https://drive.google.com/uc?export=download&id=1F1WReQXi83RI9hQQH7XPyVPvfDXrMTY1'; 
  };

  const [time, setTime] = useState({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds(),
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const [locationAllowed, setLocationAllowed] = useState(true); // Simulação da permissão de localização

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date(); // Atualiza o objeto Date a cada segundo
      setTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
        day: now.getDate(),
        month: now.getMonth() + 1,
        year: now.getFullYear(),
      });
    }, 1000); // Atualiza a cada segundo

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar
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
      <div className="relogio">
        <h1 style={{ color: 'white' }}>Relógio de Ponto</h1>
        <h2 style={{ color: 'white' }}>
          {time.day}/{time.month}/{time.year}
        </h2>
        <h2 style={{ color: 'white' }}>
          {String(time.hours).padStart(2, '0')}:{String(time.minutes).padStart(2, '0')}:
          {String(time.seconds).padStart(2, '0')}
        </h2>
        {/* Caso haja um erro, ele será exibido aqui */}
        <button onClick={marcarPonto} className="btn btn-outline-primary">
          Marcar ponto
        </button>
      </div>
      {isMobileOrTablet && (
        <button onClick={handleDownloadClick} className="btn btnDownload btn-primary">
          Baixe nosso Aplicativo
        </button>
      )}
    </div>
  );
}

export default Home;