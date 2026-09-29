/* =========================================================
   MENTE SAUDÁVEL
   JAVASCRIPT PRINCIPAL
========================================================= */

"use strict";


/* =========================================================
   TERMÔMETRO
========================================================= */

const faixas = [

    {
        min: 0,
        max: 2,
        cor: "#ef4444",
        mensagem:
            "Parece que hoje está sendo um dia difícil. Procure conversar com alguém de confiança e cuide de você.",
        recomendacao:
            "💡 Recomendação: Se possível, entre em contato com uma pessoa de confiança ou profissional de saúde. Você não está sozinho."
    },

    {
        min: 3,
        max: 4,
        cor: "#f97316",
        mensagem:
            "Talvez seja um bom momento para fazer uma pausa e observar como você está se sentindo.",
        recomendacao:
            "💡 Recomendação: Experimente sair para tomar um ar fresco por 5 minutos e alongue o corpo."
    },

    {
        min: 5,
        max: 7,
        cor: "#eab308",
        mensagem:
            "Você está em um nível intermediário. Reserve um momento para perceber suas necessidades.",
        recomendacao:
            "💡 Recomendação: Faça 3 respirações profundas e observe o que está ocupando sua mente no momento."
    },

    {
        min: 8,
        max: 9,
        cor: "#22c55e",
        mensagem:
            "Que bom! Aproveite esse momento e continue cuidando do seu bem-estar.",
        recomendacao:
            "💡 Recomendação: Que tal anotar o que está fazendo você se sentir bem hoje para repetir amanhã?"
    },

    {
        min: 10,
        max: 10,
        cor: "#06b6d4",
        mensagem:
            "Você parece estar se sentindo muito bem hoje! Compartilhe essa energia positiva.",
        recomendacao:
            "💡 Recomendação: Compartilhe esse sentimento com alguém que você gosta."
    }

];


function atualizarTermometro() {

    const nivelElemento =
        document.getElementById("nivel");

    const valorNivel =
        document.getElementById("valorNivel");

    const preenchimento =
        document.getElementById("preenchimento");

    const mensagemNivel =
        document.getElementById("mensagemNivel");

    const recomendacao =
        document.getElementById("recomendacao");


    if (
        !nivelElemento ||
        !valorNivel ||
        !preenchimento ||
        !mensagemNivel ||
        !recomendacao
    ) {
        return;
    }


    const nivel =
        Number(nivelElemento.value);


    const faixaAtual =
        faixas.find(
            faixa =>
                nivel >= faixa.min &&
                nivel <= faixa.max
        );


    if (!faixaAtual) {
        return;
    }


    valorNivel.textContent =
        nivel;


    preenchimento.style.width =
        `${nivel * 10}%`;


    preenchimento.style.backgroundColor =
        faixaAtual.cor;


    mensagemNivel.textContent =
        faixaAtual.mensagem;


    recomendacao.textContent =
        faixaAtual.recomendacao;

}


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
   QUIZ
========================================================= */

function verificarQuiz(event) {

    event.preventDefault();


    let pontos = 0;


    const resposta1 =
        document.querySelector(
            'input[name="pergunta1"]:checked'
        );


    const resposta2 =
        document.querySelector(
            'input[name="pergunta2"]:checked'
        );


    const resposta3 =
        document.querySelector(
            'input[name="pergunta3"]:checked'
        );


    if (
        resposta1 &&
        resposta1.value === "b"
    ) {

        pontos++;

    }


    if (
        resposta2 &&
        resposta2.value === "a"
    ) {

        pontos++;

    }


    if (
        resposta3 &&
        resposta3.value === "c"
    ) {

        pontos++;

    }


    const resultado =
        document.getElementById(
            "resultadoQuiz"
        );


    if (!resultado) {
        return;
    }


    if (pontos === 3) {

        resultado.textContent =
            "Você acertou 3 de 3 perguntas. Parabéns! Você demonstrou bons conhecimentos sobre saúde mental.";

    }

    else if (pontos >= 2) {

        resultado.textContent =
            `Você acertou ${pontos} de 3 perguntas. Muito bem! Continue aprendendo sobre saúde mental.`;

    }

    else {

        resultado.textContent =
            `Você acertou ${pontos} de 3 perguntas. Continue explorando o conteúdo do Mente Saudável.`;

    }

}


/* =========================================================
   MURAL VIRTUAL — PUBLICAÇÃO DE MENSAGENS
========================================================= */

function publicarMensagem(event) {

    event.preventDefault();


    const campoNome =
        document.getElementById("nome");


    const campoMensagem =
        document.getElementById("mensagem");


    const mural =
        document.getElementById(
            "muralMensagens"
        );


    if (
        !campoNome ||
        !campoMensagem ||
        !mural
    ) {
        return;
    }


    const nome =
        campoNome.value.trim();


    const mensagem =
        campoMensagem.value.trim();


    if (!nome || !mensagem) {
        return;
    }


    const novaMensagem =
        document.createElement("div");


    novaMensagem.className =
        "mensagem-publicada";


    const autor =
        document.createElement("strong");


    autor.textContent =
        `${nome}: `;


    const texto =
        document.createElement("span");


    texto.textContent =
        mensagem;


    novaMensagem.appendChild(autor);

    novaMensagem.appendChild(texto);


    mural.appendChild(novaMensagem);


    campoNome.value = "";

    campoMensagem.value = "";

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
   FUNDO ANIMADO
   "RESPIRAÇÃO DA MENTE"
========================================================= */

function iniciarFundoAnimado() {

    const canvas =
        document.createElement("canvas");


    canvas.id =
        "fundoAnimado";


    document.body.prepend(canvas);


    const ctx =
        canvas.getContext("2d");


    let largura = 0;

    let altura = 0;

    let particulas = [];

    let quantidadeParticulas = 0;

    let tempo = 0;


    const mouse = {

        x: null,

        y: null,

        raio: 130

    };


    const CORES = {

        verde: "15, 118, 110",

        amarelo: "234, 179, 8"

    };


    function definirQuantidadeParticulas() {

        if (window.innerWidth <= 480) {

            quantidadeParticulas = 22;

        }

        else if (window.innerWidth <= 768) {

            quantidadeParticulas = 32;

        }

        else if (window.innerWidth <= 1200) {

            quantidadeParticulas = 45;

        }

        else {

            quantidadeParticulas = 60;

        }

    }


    function criarParticula() {

        return {

            x:
                Math.random() *
                largura,

            y:
                Math.random() *
                altura,

            tamanho:
                Math.random() *
                2.4 +
                0.7,

            velocidadeX:
                (Math.random() - 0.5) *
                0.22,

            velocidadeY:
                (Math.random() - 0.5) *
                0.22,

            fase:
                Math.random() *
                Math.PI *
                2,

            velocidadeFase:
                Math.random() *
                0.015 +
                0.005,

            cor:
                Math.random() > 0.72
                    ? CORES.amarelo
                    : CORES.verde,

            brilho:
                Math.random() *
                0.35 +
                0.25

        };

    }


    function criarParticulas() {

        particulas = [];


        for (
            let i = 0;
            i < quantidadeParticulas;
            i++
        ) {

            particulas.push(
                criarParticula()
            );

        }

    }


    function ajustarCanvas() {

        const escala =
            window.devicePixelRatio ||
            1;


        largura =
            window.innerWidth;


        altura =
            window.innerHeight;


        canvas.width =
            largura * escala;


        canvas.height =
            altura * escala;


        canvas.style.width =
            `${largura}px`;


        canvas.style.height =
            `${altura}px`;


        ctx.setTransform(
            escala,
            0,
            0,
            escala,
            0,
            0
        );


        definirQuantidadeParticulas();

        criarParticulas();

    }


    function atualizarParticulas() {

        particulas.forEach(
            particula => {

                particula.x +=
                    particula.velocidadeX;


                particula.y +=
                    particula.velocidadeY;


                particula.y +=
                    Math.sin(
                        tempo * 0.01 +
                        particula.fase
                    ) * 0.08;


                particula.x +=
                    Math.cos(
                        tempo * 0.008 +
                        particula.fase
                    ) * 0.05;


                if (
                    particula.x <
                    -10
                ) {

                    particula.x =
                        largura + 10;

                }


                if (
                    particula.x >
                    largura + 10
                ) {

                    particula.x = -10;

                }


                if (
                    particula.y <
                    -10
                ) {

                    particula.y =
                        altura + 10;

                }


                if (
                    particula.y >
                    altura + 10
                ) {

                    particula.y = -10;

                }


                particula.fase +=
                    particula.velocidadeFase;

            }
        );

    }


    function reagirAoMouse() {

        if (
            mouse.x === null ||
            mouse.y === null
        ) {
            return;
        }


        particulas.forEach(
            particula => {

                const dx =
                    particula.x -
                    mouse.x;


                const dy =
                    particula.y -
                    mouse.y;


                const distancia =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distancia <
                    mouse.raio &&
                    distancia > 0
                ) {

                    const forca =
                        (mouse.raio -
                            distancia) /
                        mouse.raio;


                    particula.x +=
                        (dx / distancia) *
                        forca *
                        0.35;


                    particula.y +=
                        (dy / distancia) *
                        forca *
                        0.35;

                }

            }
        );

    }


    function desenharParticula(
        particula
    ) {

        const brilho =
            particula.brilho +
            Math.sin(
                particula.fase
            ) *
            0.12;


        ctx.beginPath();


        ctx.arc(
            particula.x,
            particula.y,
            particula.tamanho,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            `rgba(${particula.cor}, ${brilho})`;


        ctx.fill();

    }


    function desenharConexoes() {

        const distanciaMaxima =
            145;


        for (
            let i = 0;
            i < particulas.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < particulas.length;
                j++
            ) {

                const p1 =
                    particulas[i];


                const p2 =
                    particulas[j];


                const dx =
                    p1.x - p2.x;


                const dy =
                    p1.y - p2.y;


                const distancia =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distancia <
                    distanciaMaxima
                ) {

                    const opacidade =
                        (1 -
                            distancia /
                            distanciaMaxima) *
                        0.11;


                    ctx.beginPath();


                    ctx.moveTo(
                        p1.x,
                        p1.y
                    );


                    ctx.lineTo(
                        p2.x,
                        p2.y
                    );


                    ctx.strokeStyle =
                        `rgba(${CORES.verde}, ${opacidade})`;


                    ctx.lineWidth = 1;


                    ctx.stroke();

                }

            }

        }

    }


    function desenharRespiracao() {

        const respiracao =
            (
                Math.sin(
                    tempo *
                    0.006
                ) +
                1
            ) / 2;


        const centroX =
            largura * 0.5;


        const centroY =
            altura * 0.52;


        const raio =
            100 +
            respiracao *
            100;


        desenharOnda(
            centroX,
            centroY,
            raio,
            respiracao,
            0.10
        );


        desenharOnda(
            centroX,
            centroY,
            raio * 0.68,
            respiracao,
            0.06
        );

    }


    function desenharOnda(
        x,
        y,
        raio,
        respiracao,
        opacidade
    ) {

        ctx.beginPath();


        ctx.arc(
            x,
            y,
            raio,
            0,
            Math.PI * 2
        );


        ctx.strokeStyle =
            `rgba(
                ${CORES.verde},
                ${opacidade *
                (1 - respiracao * 0.3)}
            )`;


        ctx.lineWidth = 1;


        ctx.stroke();

    }


    function desenhar() {

        ctx.clearRect(
            0,
            0,
            largura,
            altura
        );


        tempo++;


        atualizarParticulas();

        reagirAoMouse();

        desenharRespiracao();

        desenharConexoes();


        particulas.forEach(
            particula => {

                desenharParticula(
                    particula
                );

            }
        );


        requestAnimationFrame(
            desenhar
        );

    }


    window.addEventListener(
        "mousemove",
        evento => {

            mouse.x =
                evento.clientX;

            mouse.y =
                evento.clientY;

        }
    );


    window.addEventListener(
        "mouseleave",
        () => {

            mouse.x = null;

            mouse.y = null;

        }
    );


    window.addEventListener(
        "touchmove",
        evento => {

            if (
                evento.touches &&
                evento.touches.length
            ) {

                mouse.x =
                    evento.touches[0]
                        .clientX;

                mouse.y =
                    evento.touches[0]
                        .clientY;

            }

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "touchend",
        () => {

            mouse.x = null;

            mouse.y = null;

        }
    );


    let redimensionando;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                redimensionando
            );


            redimensionando =
                setTimeout(
                    ajustarCanvas,
                    150
                );

        }
    );


    ajustarCanvas();

    desenhar();

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