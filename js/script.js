/* =========================================================
   MENTE SAUDÁVEL
   JAVASCRIPT PRINCIPAL
========================================================= */

"use strict";


/* =========================================================
   QUIZ integrado ao TERMÔMETRO
========================================================= */

function verificarQuiz(event) {
    event.preventDefault();

    let pontos = 0;

    // Captura das respostas
    const resposta1 = document.querySelector('input[name="pergunta1"]:checked');
    const resposta2 = document.querySelector('input[name="pergunta2"]:checked');
    const resposta3 = document.querySelector('input[name="pergunta3"]:checked');

    // Verificação das respostas corretas
    if (resposta1 && resposta1.value === "b") pontos++;
    if (resposta2 && resposta2.value === "a") pontos++;
    if (resposta3 && resposta3.value === "c") pontos++;

    // Exibição do resultado textual
    const resultado = document.getElementById("resultadoQuiz");
    if (!resultado) return;

    if (pontos === 3) {
        resultado.textContent =
            "Você acertou 3 de 3 perguntas. Parabéns! Você demonstrou bons conhecimentos sobre saúde mental.";
    } else if (pontos >= 2) {
        resultado.textContent =
            `Você acertou ${pontos} de 3 perguntas. Muito bem! Continue aprendendo sobre saúde mental.`;
    } else {
        resultado.textContent =
            `Você acertou ${pontos} de 3 perguntas. Continue explorando o conteúdo do Mente Saudável.`;
    }

    // Integração com o termômetro
    const preenchimento = document.getElementById("preenchimento");
    const valorNivel = document.getElementById("valorNivel");
    const mensagemNivel = document.getElementById("mensagemNivel");
    const recomendacao = document.getElementById("recomendacao");

    // Converter pontos (0–3) para escala 0–10
    const nivelConvertido = Math.round((pontos / 3) * 10);

    // Atualizar barra e textos
    if (preenchimento && valorNivel && mensagemNivel && recomendacao) {
        valorNivel.textContent = nivelConvertido;
        preenchimento.style.width = `${nivelConvertido * 10}%`;

        // Definir mensagens conforme faixas
        if (nivelConvertido <= 2) {
            preenchimento.style.backgroundColor = "#ef4444";
            mensagemNivel.textContent = "Parece que hoje está sendo um dia difícil. Procure conversar com alguém de confiança e cuide de você.";
            recomendacao.textContent = "💡 Recomendação: Se possível, entre em contato com uma pessoa de confiança ou profissional de saúde. Você não está sozinho.";
        } else if (nivelConvertido <= 4) {
            preenchimento.style.backgroundColor = "#f97316";
            mensagemNivel.textContent = "Talvez seja um bom momento para fazer uma pausa e observar como você está se sentindo.";
            recomendacao.textContent = "💡 Recomendação: Experimente sair para tomar um ar fresco por 5 minutos e alongue o corpo.";
        } else if (nivelConvertido <= 7) {
            preenchimento.style.backgroundColor = "#eab308";
            mensagemNivel.textContent = "Você está em um nível intermediário. Reserve um momento para perceber suas necessidades.";
            recomendacao.textContent = "💡 Recomendação: Faça 3 respirações profundas e observe o que está ocupando sua mente no momento.";
        } else if (nivelConvertido <= 9) {
            preenchimento.style.backgroundColor = "#22c55e";
            mensagemNivel.textContent = "Que bom! Aproveite esse momento e continue cuidando do seu bem-estar.";
            recomendacao.textContent = "💡 Recomendação: Que tal anotar o que está fazendo você se sentir bem hoje para repetir amanhã?";
        } else {
            preenchimento.style.backgroundColor = "#21d406";
            mensagemNivel.textContent = "Você parece estar se sentindo muito bem hoje! Compartilhe essa energia positiva.";
            recomendacao.textContent = "💡 Recomendação: Compartilhe esse sentimento com alguém que você gosta.";
        }
    }
}

// Conectar o quiz ao formulário
document.getElementById("formQuiz").addEventListener("submit", verificarQuiz);



/* =========================================================
   HISTÓRICO DO TERMÔMETRO
========================================================= */

function carregarHistorico() {

    const lista =
        document.getElementById("listaHistorico");


    if (!lista) {
        return;
    }


    let historico = [];


    try {

        historico =
            JSON.parse(
                localStorage.getItem(
                    "historicoTermometro"
                ) || "[]"
            );

    } catch (erro) {

        historico = [];

    }


    lista.innerHTML = "";


    historico.forEach(item => {

        const registro =
            document.createElement("p");


        registro.textContent =
            `${item.data}: ${item.nivel}/10`;


        lista.appendChild(registro);

    });

}


function salvarRegistro() {

    const nivelElemento =
        document.getElementById("nivel");


    if (!nivelElemento) {
        return;
    }


    const nivel =
        nivelElemento.value;


    const data =
        new Date().toLocaleDateString("pt-BR");


    let historico = [];


    try {

        historico =
            JSON.parse(
                localStorage.getItem(
                    "historicoTermometro"
                ) || "[]"
            );

    } catch (erro) {

        historico = [];

    }


    historico.unshift({

        data: data,

        nivel: nivel

    });


    localStorage.setItem(

        "historicoTermometro",

        JSON.stringify(
            historico.slice(0, 7)
        )

    );


    carregarHistorico();


    alert("Registro salvo com sucesso!");

}

/* =========================================================
   MURAL VIRTUAL — PUBLICAÇÃO DE MENSAGENS NO SUPABASE
========================================================= */

async function publicarMensagem(event) {

    event.preventDefault();

    const campoNome = document.getElementById("nome");
    const campoMensagem = document.getElementById("mensagem");
    const mural = document.getElementById("muralMensagens");

    if (!campoNome || !campoMensagem || !mural) {
        return;
    }

    const nome = campoNome.value.trim();
    const mensagem = campoMensagem.value.trim();

    if (!nome || !mensagem) {
        return;
    }

    // Verifica se o Supabase está disponível
    const client = window.supabaseClient;

    if (!client) {
        alert("Erro de conexão com o Supabase. Verifique a inclusão da biblioteca CDN no HTML.");
        return;
    }

    try {
        const { data, error } = await client
            .from("mensagens")
            .insert([
                {
                    nome: nome,
                    mensagem: mensagem
                }
            ]);

        if (error) {
            console.error("Erro ao salvar mensagem no Supabase:", error);
            alert("Erro ao enviar mensagem: " + error.message);
            return;
        }

        // Adiciona a mensagem visualmente na tela
        const novaMensagem = document.createElement("div");
        novaMensagem.className = "mensagem-publicada";

        const autor = document.createElement("strong");
        autor.textContent = `${nome}: `;

        const texto = document.createElement("span");
        texto.textContent = mensagem;

        novaMensagem.appendChild(autor);
        novaMensagem.appendChild(texto);
        mural.appendChild(novaMensagem);

        campoNome.value = "";
        campoMensagem.value = "";

        alert("Mensagem publicada com sucesso!");

    } catch (err) {
        console.error("Erro inesperado:", err);
        alert("Erro de conexão com a base de dados.");
    }
}


/* =========================================================
   CARROSSEL — SAÚDE MENTAL
========================================================= */

function iniciarCarrosselSaude() {

    const secao =
        document.getElementById("sobre");


    if (!secao) {
        return;
    }


    const slides =
        secao.querySelectorAll(
            ".carrossel-slide"
        );


    const botaoAnterior =
        secao.querySelector(
            ".btn-anterior"
        );


    const botaoProximo =
        secao.querySelector(
            ".btn-proximo"
        );


    const indicadores =
        secao.querySelectorAll(
            ".indicador"
        );


    if (!slides.length) {
        return;
    }


    let slideAtual = 0;


    function mostrarSlide(numero) {

        if (
            numero < 0 ||
            numero >= slides.length
        ) {
            return;
        }


        slides.forEach(slide => {

            slide.classList.remove(
                "carrossel-slide-ativo"
            );

        });


        indicadores.forEach(indicador => {

            indicador.classList.remove(
                "ativo"
            );

        });


        slides[numero].classList.add(
            "carrossel-slide-ativo"
        );


        if (indicadores[numero]) {

            indicadores[numero].classList.add(
                "ativo"
            );

        }


        slideAtual = numero;

    }


    if (botaoAnterior) {

        botaoAnterior.addEventListener(
            "click",
            () => {

                slideAtual--;

                if (slideAtual < 0) {

                    slideAtual =
                        slides.length - 1;

                }

                mostrarSlide(slideAtual);

            }
        );

    }


    if (botaoProximo) {

        botaoProximo.addEventListener(
            "click",
            () => {

                slideAtual++;

                if (
                    slideAtual >=
                    slides.length
                ) {

                    slideAtual = 0;

                }

                mostrarSlide(slideAtual);

            }
        );

    }


    indicadores.forEach(
        (indicador, index) => {

            indicador.addEventListener(
                "click",
                () => {

                    mostrarSlide(index);

                }
            );

        }
    );


    mostrarSlide(0);

}


/* =========================================================
   CARROSSEL — MURAL MOTIVACIONAL
========================================================= */

function iniciarMuralMotivacional() {

    const mural =
        document.getElementById("mural");


    if (!mural) {
        return;
    }


    const track =
        mural.querySelector(
            ".carrosel-track"
        );


    const mensagens =
        mural.querySelectorAll(
            ".mensagem"
        );


    const botaoAnterior =
        mural.querySelector(
            ".prev"
        );


    const botaoProximo =
        mural.querySelector(
            ".next"
        );


    const indicadores =
        mural.querySelectorAll(
            ".dot"
        );


    if (
        !track ||
        !mensagens.length
    ) {
        return;
    }


    let indiceAtual = 0;


    function atualizarMural() {

        const primeiroCard =
            mensagens[0];


        const largura =
            primeiroCard.getBoundingClientRect()
                .width;


        const estilo =
            window.getComputedStyle(
                track
            );


        const gap =
            parseFloat(
                estilo.gap
            ) || 0;


        /*
         * Quantidade de cards visíveis.
         */

        let cardsVisiveis = 1;


        if (window.innerWidth > 900) {

            cardsVisiveis = 3;

        }

        else if (window.innerWidth > 600) {

            cardsVisiveis = 2;

        }


        /*
         * Quantidade máxima de posições.
         */

        const maximo =
            Math.max(
                0,
                mensagens.length -
                cardsVisiveis
            );


        if (
            indiceAtual >
            maximo
        ) {

            indiceAtual = 0;

        }


        const deslocamento =
            indiceAtual *
            (largura + gap);


        track.style.transform =
            `translateX(-${deslocamento}px)`;


        indicadores.forEach(
            (indicador, index) => {

                indicador.classList.toggle(
                    "active",
                    index === indiceAtual
                );

            }
        );

    }


    if (botaoAnterior) {

        botaoAnterior.addEventListener(
            "click",
            () => {

                indiceAtual--;

                if (indiceAtual < 0) {

                    indiceAtual =
                        mensagens.length - 1;

                }


                atualizarMural();

            }
        );

    }


    if (botaoProximo) {

        botaoProximo.addEventListener(
            "click",
            () => {

                indiceAtual++;


                if (
                    indiceAtual >=
                    mensagens.length
                ) {

                    indiceAtual = 0;

                }


                atualizarMural();

            }
        );

    }


    indicadores.forEach(
        (indicador, index) => {

            indicador.addEventListener(
                "click",
                () => {

                    indiceAtual = index;

                    atualizarMural();

                }
            );

        }
    );


    atualizarMural();


    window.addEventListener(
        "resize",
        atualizarMural
    );

}

/* =========================================================
   NOVO FUNDO ANIMADO
   "MOVIMENTO SUAVE DA MENTE"
========================================================= */

function iniciarFundoAnimado() {

    /* -----------------------------------------------------
       CRIA O ELEMENTO DO FUNDO
    ----------------------------------------------------- */

    const fundo =
        document.createElement("div");

    fundo.id =
        "fundoAnimado";


    document.body.prepend(fundo);


    /* -----------------------------------------------------
       VARIÁVEIS DA ANIMAÇÃO
    ----------------------------------------------------- */

    let mouseX = 0;
    let mouseY = 0;

    let movimentoX = 0;
    let movimentoY = 0;

    let escala = 1;


    /* -----------------------------------------------------
       MOVIMENTO DO MOUSE
    ----------------------------------------------------- */

    window.addEventListener(
        "mousemove",
        evento => {

            mouseX =
                (evento.clientX /
                    window.innerWidth -
                    0.5);

            mouseY =
                (evento.clientY /
                    window.innerHeight -
                    0.5);

        }
    );


    /* -----------------------------------------------------
       MOVIMENTO POR TOQUE
    ----------------------------------------------------- */

    window.addEventListener(
        "touchmove",
        evento => {

            if (
                evento.touches &&
                evento.touches.length
            ) {

                const toque =
                    evento.touches[0];


                mouseX =
                    (toque.clientX /
                        window.innerWidth -
                        0.5);


                mouseY =
                    (toque.clientY /
                        window.innerHeight -
                        0.5);

            }

        },
        {
            passive: true
        }
    );


    /* -----------------------------------------------------
       ANIMAÇÃO PRINCIPAL
    ----------------------------------------------------- */

    function animarFundo() {

        /*
         * Movimento suave do fundo
         */

        movimentoX +=
            (mouseX * 12 -
                movimentoX) *
            0.025;


        movimentoY +=
            (mouseY * 8 -
                movimentoY) *
            0.025;


        /*
         * Efeito de respiração
         */

        const tempo =
            Date.now() * 0.001;


        escala =
            1 +
            Math.sin(
                tempo * 0.18
            ) * 0.012;


        /*
         * Aplicação da animação
         */

        fundo.style.transform =
            `translate(
                ${movimentoX}px,
                ${movimentoY}px
            )
            scale(${escala})`;


        requestAnimationFrame(
            animarFundo
        );

    }


    /* -----------------------------------------------------
       INICIA A ANIMAÇÃO
    ----------------------------------------------------- */

    animarFundo();

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /*
         * Termômetro
         */

        const nivel =
            document.getElementById("nivel");


        if (nivel) {

            nivel.addEventListener(
                "input",
                atualizarTermometro
            );

        }


        const botaoSalvar =
            document.querySelector(
                ".botao-salvar"
            );


        if (botaoSalvar) {

            botaoSalvar.addEventListener(
                "click",
                salvarRegistro
            );

        }


        /*
         * Quiz
         */

        const formQuiz =
            document.getElementById(
                "formQuiz"
            );


        if (formQuiz) {

            formQuiz.addEventListener(
                "submit",
                verificarQuiz
            );

        }


        /*
         * Mural Virtual
         */

        const formMensagem =
            document.getElementById(
                "formMensagem"
            );


        if (formMensagem) {

            formMensagem.addEventListener(
                "submit",
                publicarMensagem
            );

        }


        /*
         * Carrosséis
         */

        iniciarCarrosselSaude();

        iniciarMuralMotivacional();


        /*
         * Dados iniciais
         */

        atualizarTermometro();

        carregarHistorico();


        /*
         * Fundo animado
         */

        iniciarFundoAnimado();

    }
);




