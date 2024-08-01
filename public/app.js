function mostrarFormulario() {
    containerPonto.style.display = "none";
    cadastroFormulario.style.display = "block";
}

function voltar() {
    btnVoltar.style.display = "none";
    cadastroFormulario.style.display = "none";
    containerPonto.style.display = "block";
    cadastrarNovoUsuarioBtn.style.display = "block";
}

document.addEventListener('DOMContentLoaded', function() {
    /* Sistema de marcação de ponto */

    /* Atribuição de botões */
    const cadastroFormulario = document.getElementById("cadastroForm");
    const containerPonto = document.getElementById("container-ponto");
    const cadastrarNovoUsuarioBtn = document.getElementById("cadastrarNovoUsuarioBtn");
    const btnVoltar = document.getElementById("voltar");
    const marcarPontoBtn = document.getElementById("marcarPontoBtn");

    /* Funções */

    /* Formulário de cadastro de colaborador */

    async function cadastrarUsuarios(nome, sobrenome, dataNascimento, genero, email) {
        const usuario = {
            nome,
            sobrenome,
            dataNascimento,
            genero,
            email
        };

        try {
            const response = await fetch('https://relogio-de-ponto-kappa.vercel.app/api/usuarios', { // Atualize a URL para a URL de produção
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });
            const data = await response.json();
            console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    cadastroFormulario.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const sobrenome = document.getElementById('sobrenome').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const genero = document.getElementById('genero').value;
        const email = document.getElementById('email').value;

        cadastrarUsuarios(nome, sobrenome, dataNascimento, genero, email);

        cadastroFormulario.reset();
    });

    cadastrarNovoUsuarioBtn.addEventListener('click', function() {
        mostrarFormulario();
        mostrarVoltar();
    });

    /* Marcação do ponto */

    function mostrarVoltar() {
        btnVoltar.style.display = "block";
        cadastrarNovoUsuarioBtn.style.display = "none";
    }

    function voltar() {
        btnVoltar.style.display = "none";
        cadastroFormulario.style.display = "none";
        containerPonto.style.display = "block";
        cadastrarNovoUsuarioBtn.style.display = "block";
    }

    btnVoltar.addEventListener('click', function() {
        voltar();
    });

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
});
