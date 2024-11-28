# Descrição

Este projeto foi desenvolvido como parte da disciplina de Programação de Scripts na Fatec Franca, com o objetivo de criar um website para gerenciar uma loja virtual.

## O que foi feito
Foi implementada a listagem e manipulação de produtos, carrinhos e usuários, simulando o funcionamento de um sistema de gestão para uma loja virtual. Além disso, foi desenvolvido um sistema de login com geração de token de sessão para proteger as rotas (todas as rotas, com exceção da home, estão protegidas). Todo o layout é responsivo, adaptando-se a dispositivos de diferentes tamanhos.

## Como acessar
Acesse através do link `https://gerenciador-ecommerce.onrender.com/`

## Como logar no sistema
Na página de login, utilize o usuário `mor_2314` e a senha `83r5^_`

## Como acessar localmente
1. Clone este repositório
2. Execute o comando `npm install` dentro da pasta raiz do projeto
3. Adicione o arquivo `.env` e coloque a variável de ambiente `NEXT_PUBLIC_API_BASE=https://fakestoreapi.com`
4. Execute `npm run dev` para executar o projeto em desenvolvimento
5. Abra o navegador e acesse a URL `http://localhost:3000/`

## API consumida
- A API utilizada para fornecer os dados ao projeto é a `fakestoreapi`, acessível através do link `https://fakestoreapi.com`

## Principais Tecnologias e Bibliotecas Utilizadas
- ReactJS: Biblioteca JavaScript para construção de interfaces de usuário.
- TypeScript: Superset de JavaScript que adiciona tipagem estática ao código.
- NextJS: Framework React que oferece renderização do lado do servidor (SSR), geração de sites estáticos (SSG) e suporte para rotas dinâmicas.
- Tailwind CSS: Framework de CSS utilitário para estilização.
- Zod: Biblioteca de validação e definição de esquemas para dados.
- Axios: Cliente HTTP para realizar requisições a APIs.
- React-toastify: Biblioteca para exibição de notificações configuráveis em aplicações React.
- Universal-cookie: Biblioteca para manipulação de cookies.
