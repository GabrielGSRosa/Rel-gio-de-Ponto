document.addEventListener('DOMContentLoaded', function(){
    /* Sistema de marcação de ponto */

    /* Atribuiçaõ de botões */
    const cadastroFormulario = document.getElementById("cadastroForm");
    const containerPonto = document.getElementById("container-ponto");
    const cadastrarNovoUsuarioBtn = document.getElementById("cadastrarNovoUsuarioBtn");
    const btnVoltar = document.getElementById("voltar");

    /* Lista com os usuários */
    const usuarios = [];

    /* Lista de horas marcadas */

    /* Classes */
    class NovoFuncionario{
    constructor(nome, sobrenome, dataNascimento, genero, email){
        this.nome = nome
        this.sobrenome = sobrenome
        this.dataNascimento = dataNascimento
        this.genero = genero
        this.email = email
    }
    }

    /* Funções */

    /* Formulario de cadastro de colaborador */

    function mostrarFormulario(){
        containerPonto.style.display = "none";
        cadastroFormulario.style.display = "block";
    }

    function cadastrarUsuarios(nome, sobrenome, dataNascimento, genero, email){

            // Enviar os dados ao backend
        fetch('https://relogio-de-ponto-kappa.vercel.app/api/server', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Lógica para lidar com a resposta do servidor
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    cadastroFormulario.addEventListener('submit', function(event){
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const sobrenome = document.getElementById('sobrenome').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const genero = document.getElementById('genero').value;
        const email = document.getElementById('email').value;

        cadastrarUsuarios(nome, sobrenome, dataNascimento, genero, email)

        cadastroFormulario.reset()
    })

    cadastrarNovoUsuarioBtn.addEventListener('click', function() {
        mostrarFormulario();
        mostrarVoltar();
    });

    /* Marcação do ponto */

    function mostrarVoltar(){
        btnVoltar.style.display = "block";
        cadastrarNovoUsuarioBtn.style.display = "none";
    }

    function voltar(){
        btnVoltar.style.display = "none";
        cadastroFormulario.style.display = "none";
        containerPonto.style.display = "block";
        cadastrarNovoUsuarioBtn.style.display = "block";
    }

    btnVoltar.addEventListener('click', function() {
        voltar()
    })

    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        document.getElementById('current-time').textContent = `${hours}:${minutes}:${seconds}`;
    }

    marcarPontoBtn.addEventListener('click', function() {
        marcarPonto();
    });
    

    function marcarPonto() {
        alert('Ponto marcado!');
    }

    setInterval(updateTime, 1000);
    updateTime();


})

