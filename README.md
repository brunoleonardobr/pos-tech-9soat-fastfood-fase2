<h1>Postech FIAP - Software Architecture</h1>
<h2>Tech Challenge - Fase 2</h2>

Projeto desenvolvido para o desafio técnico pro curso de Pós-graduação em Arquitetura de Software da Fiap. O objetivo é criar uma solução para uma empresa de fastfood e automatizar o atendimento.

### Requisitos da segunda fase
- Refatorar a api usando Clean Architecture
  <img src="https://github.com/brunoleonardobr/pos-tech-9soat-fastfood-fase2/blob/main/clean_architecture.PNG?raw=true"/>
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

<img src="https://github.com/brunoleonardobr/pos-tech-9soat-fastfood-fase2/blob/main/arquitetura_kubernetes_minikube.PNG?raw=true"/>
- Ao entregar: Url do github. Nome, usuario do discord e endereço de email

### Para rodar o sistema

#### 1. Instalar o Docker Desktop no Windows

- Baixe e instale o Docker Desktop: [Download Docker](https://www.docker.com/products/docker-desktop)

#### 2. Instalar o Minikube no Windows

1. Baixe o Minikube: [Download Minikube](https://minikube.sigs.k8s.io/docs/start/?arch=%2Fwindows%2Fx86-64%2Fstable%2F.exe+download)
2. Instale o Minikube.
3. Inicie o Minikube no terminal:
   ```bash
   minikube start --vm-driver=docker
   ```
4. Verificar o status da instalação:

```bash
 minikube status
```

#### 3. Executar o ambiente

- Clonar o projeto: `git clone https://github.com/brunoleonardobr/pos-tech-9soat-fastfood-fase2.git`
- Entrar no diretório raiz

#### 4. Executar os comandos no terminal:

Banco de dados:
- Rodar o comando `kubectl create configmap mysql-init-sql --from-file=init.sql`
- Rodar o comando `kubectl apply -f deployments/database/mysql-pvc.yaml`
- Rodar o comando `kubectl apply -f deployments/database/mysql-secret.yaml`
- Rodar o comando `kubectl apply -f deployments/database/mysql-service.yaml`
- Rodar o comando `kubectl apply -f deployments/database/mysql-statefulset.yaml`

Metricas:
- Rodar o comando `kubectl apply -f deployments/metrics/components.yaml`

Fastfood Api:
- Rodar o comando `kubectl apply -f deployments/app/fastfood-configmap.yaml`
- Rodar o comando `kubectl apply -f deployments/app/fastfood-deployment.yaml`
- Rodar o comando `kubectl apply -f deployments/app/fastfood-hpa.yaml`
- Rodar o comando `kubectl apply -f deployments/app/fastfood-secret.yaml`
- Rodar o comando `kubectl apply -f deployments/app/fastfood-service.yaml`

#### Criar um tunel de conexao com o minikube:

Rodar o comando `kubectl port-forward -n default services/fastfood-service 3000:3000`

#### Acessar a documentação do swagger:

http://localhost:3000/docs/
