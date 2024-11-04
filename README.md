<h1>Postech FIAP - Software Architecture</h1>
<h2>Tech Challenge - Fase 1</h2>

Projeto desenvolvido para o desafio técnico pro curso de Pós-graduação em Arquitetura de Software da Fiap. O objetivo é criar uma solução para uma empresa de fastfood e automatizar o atendimento.

### Requisitos da primeira fase

- Cadastro do Cliente
- Identificação do Cliente via CPF
- Criar, editar e remover produtos
- Buscar produtos por categoria
- Fake checkout, apenas enviar os produtos escolhidos para a fila. O checkout é a finalização do pedido.
- Listar os pedidos

### Para rodar o sistema

#### É obrigatorio a instalação do docker

- Clonar o projeto: `git clone https://github.com/brunoleonardobr/pos-tech-9soat-fastfood-fase1.git`
- Entrar no diretório raiz
- Rodar o comando `docker compose build`
- Rodar o comando `docker compose up`
- Acessar a documentação do swagger http://localhost:3000/docs/

Já existem alguns registros de produtos e clientes para criar pedidos.
