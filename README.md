<p align="center">
  <img src="site/src/view/assets/imgs/Logo_Heal4.png" alt="Heal Logo" width="160">
</p>

<h1 align="center">Heal - Monitoramento Inteligente de Feridas</h1>
<p align="center"><b>Landing page e sistema web para profissionais da saúde</b></p>
<p align="center"><i>👨‍⚕️ Tecnologia a serviço do cuidado</i></p>

---

<p align="center">
  <a href="#funcionalidades">✨ Funcionalidades</a> •
  <a href="#tecnologias">🧑‍💻 Tecnologias</a> •
  <a href="#estrutura">📁 Estrutura</a> •
  <a href="#como-usar">🚀 Como Usar</a> •
  <a href="#contato">📞 Contato</a>
</p>

---

## 📲 O que é o Heal?

O **Heal** é um sistema completo para o monitoramento inteligente de feridas, voltado a enfermeiros e profissionais da saúde. Permite registrar, acompanhar e analisar a evolução de lesões em pacientes, facilitando decisões clínicas e o cuidado.

A landing page apresenta o app, diferenciais, funcionalidades, depoimentos, planos, perguntas frequentes e formas de contato, além de acesso ao sistema web e links para download do app.

---

## ✨ Funcionalidades

- **Landing Page Responsiva:** Apresentação clara dos benefícios do Heal, com seções de recursos, depoimentos, planos, FAQ e contato.
- **Cadastro e Login Seguro:** Profissionais criam contas e acessam o sistema de forma protegida.
- **CRUD de Perfil Profissional:** Visualize, edite e atualize dados do perfil (nome, email, telefone, profissão, COREN/CRM, etc).
- **Internacionalização (i18n):** Textos de login, cadastro e navegação em Português e Inglês.
- **Design Moderno:** Tailwind CSS, Font Awesome e efeitos visuais para uma experiência agradável em qualquer dispositivo.
- **Redirecionamento Estilizado:** Página inicial com redirecionamento elegante para a landing page.
- **Footer Completo:** Links úteis, redes sociais, contato e informações institucionais centralizados e responsivos.
- **Acessibilidade:** Suporte a VLibras, aumento/diminuição de fonte e navegação acessível.

---

## 🧑‍💻 Tecnologias Utilizadas

| 🛠️ Tecnologia      | 💡 Finalidade                                 |
|--------------------|----------------------------------------------|
| **HTML5**          | Estrutura das páginas                        |
| **Tailwind CSS**   | Estilização responsiva e moderna via CDN     |
| **Font Awesome**   | Ícones estilizados                           |
| **Google Fonts**   | Tipografia (Open Sans)                       |
| **CSS Customizado**| Arquivos `style.css` e `generalcss.css`      |
| **PHP (MVC)**      | Backend do sistema de perfil e autenticação  |
| **JavaScript**     | Validação, i18n, interatividade              |
| **MySQL**          | Banco de dados para usuários e perfis        |

---

## 📁 Estrutura do Projeto

```
landing-page-heal/
│
├── index.html                # Redirecionamentoestilizado para a landing page
├── site/
│   ├── banco_paciente.sql    # Script do banco de dados
│   ├── public/               # Ponto de entrada do backend PHP
│   ├── src/
│   │   ├── view/             # Páginas HTML, assets, CSS, JS
│   │   ├── controller/       # Lógica de controle (MVC)
│   │   ├── model/            # Entidades e repositórios
│   │   ├── service/          # Lógica de negócio
│   │   ├── routes/           # Rotas da API
│   │   └── config/           # Configurações de conexão
│   └── vendor/               # Dependências do Composer
└── README.md                 # Este arquivo
```

---

## 🚀 Como Usar

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/SEU_USUARIO/landing-page-heal.git
   ```
2. **Acesse a pasta do projeto:**
   ```bash
   cd landing-page-heal
   ```
3. **Abra o arquivo `index.html` na raiz para ser redirecionado à landing page.**
4. **Para rodar o sistema completo (backend):**
   - Configure um servidor local (XAMPP, WAMP, etc).
   - Importe o banco de dados `banco_paciente.sql` (em `site/`).
   - Acesse `site/src/view/index.html` para a landing page ou `site/public/index.php` para a API/backend.

---

## 👥 Integrantes

- **Guilherme Alves de Campos** — RA: 2920482411018
- **Paulo Henrique Leal dos Santos** — RA: 2920482411024
- **Pedro Antonio Silvestre Tescaro** — RA: 2920482411010

---

## 💡 Diferenciais

- Visual moderno e responsivo
- Internacionalização real (i18n)
- Acessibilidade e usabilidade
- Código limpo e organizado (MVC)
- Pronto para deploy em qualquer servidor PHP/MySQL

---

## 📞 Contato

Dúvidas, sugestões ou feedback?  
Entre em contato pelo email: **healgrupo@gmail.com**

---
