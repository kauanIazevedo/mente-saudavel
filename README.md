# mente-saudavel-senac
# 💛 Mente Saudável SENAC

Uma aplicação web de acolhimento, conscientização e interação voltada à saúde mental, desenvolvida como Projeto Integrador do curso de Programador Web do SENAC.

O projeto busca oferecer uma experiência digital simples, acessível e acolhedora, permitindo que o usuário reflita sobre como está se sentindo, encontre conteúdos educativos e participe de atividades interativas.

> ⚠️ O projeto possui finalidade educativa e de conscientização. Não realiza diagnósticos nem substitui acompanhamento profissional.

---

## 🎯 Objetivo

O **Mente Saudável SENAC** foi desenvolvido com o objetivo de criar um espaço digital acolhedor, onde o usuário possa:

- refletir sobre seu estado emocional;
- aprender sobre saúde mental por meio de conteúdos educativos;
- utilizar um termômetro emocional;
- receber mensagens de acolhimento;
- participar de um quiz interativo;
- compartilhar mensagens positivas no mural;
- enviar mensagens pelo Correio do Acolhimento.

---

## ✨ Funcionalidades

### 🌡️ Termômetro Emocional
Permite que o usuário indique, em uma escala de 0 a 10, como está se sentindo.

A partir do nível informado, o sistema apresenta uma mensagem de acolhimento e uma sugestão de ação.

### 🧠 Quiz
Quiz interativo desenvolvido em JavaScript, com perguntas, alternativas, cálculo da pontuação e apresentação do resultado.

### 💬 Mural de Mensagens
Espaço para os visitantes compartilharem mensagens positivas.

As mensagens são armazenadas no Supabase e podem ser visualizadas pelos visitantes.

### 💌 Correio do Acolhimento
Área destinada ao envio de mensagens de acolhimento e carinho.

### 🧘 Pausa
Área com sugestões de atividades simples para ajudar o usuário a fazer uma pausa e cuidar de si.

---

## 🛠️ Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Supabase
- PostgreSQL

---

## 🗄️ Banco de dados

O projeto utiliza o **Supabase** como Backend as a Service (BaaS), utilizando PostgreSQL para armazenamento dos dados.

Entre os dados armazenados estão:

- registros do Termômetro;
- mensagens do Mural;
- mensagens do Correio do Acolhimento.

O acesso às tabelas é protegido por **Row Level Security (RLS)** e políticas de acesso.

---

## 🔐 Privacidade e segurança

O projeto foi pensado para evitar a coleta de informações pessoais desnecessárias.

Não são necessários:

- cadastro;
- senha;
- CPF;
- e-mail;
- informações médicas;
- diagnóstico clínico.

O projeto utiliza políticas de segurança no Supabase para controlar as operações permitidas aos visitantes.

---

## 📱 Responsividade

A interface foi desenvolvida buscando oferecer uma boa experiência em diferentes tamanhos de tela, incluindo computadores, tablets e dispositivos móveis.

---

## 📁 Estrutura do projeto

```text
mente-saudavel/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── script.js
│   ├── supabase.js
│   └── ...
│
├── img/
│   └── ...
│
├── video/
│   └── ...
│
└── README.md

👥 Equipe
Projeto desenvolvido pelos alunos do curso de Programador Web — SENAC:
Felippe
Marlon
Kauan
Eunice
Júlia
Safira
Cherlivan
Wallace
🎓 Projeto Integrador
Projeto: Mente Saudável SENAC
Curso: Programador Web
Instituição: SENAC
O projeto foi desenvolvido como parte do Projeto Integrador, com foco em tecnologia, conscientização e acolhimento.
⚠️ Observação
O Mente Saudável SENAC possui caráter educativo e de conscientização. As informações apresentadas não substituem avaliação, diagnóstico ou acompanhamento de profissionais de saúde.
