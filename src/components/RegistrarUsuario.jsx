import React, {useRef} from 'react'
import './RegisterUsuario.css';

function RegistrarUsuario({ isOpen, closeForm }) {
  const nomeRef = useRef('')
  const sobrenomeRef = useRef('')
  const dataNascRef = useRef('')
  const genRef = useRef('')
  const emailRef = useRef('')

  function registerSucess(nomeRef, sobrenomeRef, dataNascRef, genRef, emailRef) {
    if(nomeRef.current.value == "" || sobrenomeRef.current.value == "" || dataNascRef.current.value == "" || genRef.current.value == "" || emailRef.current.value == ""){
      console.log("Todos os campos devem ser preenchidos corretamente!")
    }

    console.log("Usuário cadastrado!")
  }

  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={closeForm} style={{color: 'white'}}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <form id="cadastroForm" className="cadastroForm" >
              <div className="form-group">
                <label htmlFor="nome">Nome:</label>
                <input type="text" id="nome" name="nome" required ref={nomeRef}/>
              </div>
              <div className="form-group">
                <label htmlFor="sobrenome">Sobrenome:</label>
                <input type="text" id="sobrenome" name="sobrenome" required />
              </div>
              <div className="form-group">
                <label htmlFor="dataNascimento">Data de Nascimento:</label>
                <input type="date" id="dataNascimento" name="dataNascimento" required />
              </div>
              <div className="form-group">
                <label htmlFor="genero">Gênero:</label>
                <select id="genero" name="genero" required>
                  <option value="" disabled selected>Selecione o gênero</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail:</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <button type="submit" onClick={registerSucess}>Enviar</button>
                <button type="button" onClick={closeForm}>Fechar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default RegistrarUsuario