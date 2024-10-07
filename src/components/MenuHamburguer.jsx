import React from 'react';
import { useState } from 'react';
import './HamburguerMenu.css';
import RegistrarUsuario from './RegistrarUsuario';

function MenuHamburguer() {
    const [isOpen, setIsOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    const registerMenu = () => {
      setRegisterOpen(!registerOpen);
    };

  return (
    <div>
        {/* Botão de menu hambúrguer */}
      <button className="hamburger-btn" onClick={toggleMenu}>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
      </button>

       {/* Menu lateral */}
      <div className={`menu ${isOpen ? 'menu-open' : ''}`}>
        <ul>
          <li><a onClick={registerMenu}>Cadastrar novo colaborador</a></li>
          <li><a href="https://github.com/GabrielGSRosa/Rel-gio-de-Ponto/tree/main">Sobre</a></li>
        </ul>
      </div>

      {/* Tela de Registro */}
      <RegistrarUsuario isOpen={registerOpen} closeForm={registerMenu} />
    </div>
  )
}

export default MenuHamburguer