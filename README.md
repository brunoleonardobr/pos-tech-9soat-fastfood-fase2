<h1>Postech FIAP - Software Architecture</h1>
<h2>Tech Challenge - Fase 2</h2>

Projeto desenvolvido para o desafio técnico pro curso de Pós-graduação em Arquitetura de Software da Fiap. O objetivo é criar uma solução para uma empresa de fastfood e automatizar o atendimento.

### Requisitos da segunda fase - alterar a api utilizando Clean Architecture

- Criação do pedido deve retornar identificação do pedido.
- Consultar status de pagamento pedido, que informa se o pagamento foi aprovado ou não.
- Webhook para receber confirmação de pagamento aprovado ou recusado. A implementação deve ser clara quanto ao Webhook.
- A lista de pedidos deverá retorná-los com suas descrições, ordenados com a seguinte regra:
  1. Pronto > Em Preparação > Recebido;
  2. Pedidos mais antigos primeiro e mais novo depois;
  3. Pedidos com status Finalizado não devem aparecer na lista.
- Atualizar o status do pedido.
  1. Todo fluxo do pedido deve ser atualizado, tal informação deverá ser utilizada pela cozinha, garantindo que nenhum pedido seja perdido, e
     que a cozinha possa iniciar a preparação após o pagamento.

### Implementação de de deploy utilizando a arquitetura do Kubernetes
<img src="https://raw.githubusercontent.com/brunoleonardobr/pos-tech-9soat-fastfood-fase2/refs/heads/main/arquitetura_kubernetes_minikube.PNG?token=GHSAT0AAAAAACWORTHFNPYUBVYVRY6S7UOEZ4PZVMA"/>
- Ao entregar: Url do github. Nome, usuario do discord e endereço de email

### Para rodar o sistema

#### É obrigatorio a instalação do docker

- Clonar o projeto: `git clone https://github.com/brunoleonardobr/pos-tech-9soat-fastfood-fase1.git`
- Entrar no diretório raiz
- Rodar o comando `docker compose build`
- Rodar o comando `docker compose up`
- Acessar a documentação do swagger http://localhost:3000/docs/

Já existem alguns registros de produtos e clientes para criar pedidos.
