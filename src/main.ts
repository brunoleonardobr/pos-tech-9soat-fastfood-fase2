import {
  Checkout,
  CreateCustomer,
  CreateProduct,
  GetCustomerByCpf,
  ListProductsByCategory,
  UpdateProduct,
} from "./application/usecases";
import ListOrders from "./application/usecases/order/list-orders";
import DeleteProduct from "./application/usecases/product/remove-product";
import CustomerController from "./infra/controllers/customer-controller";
import HealthCheckController from "./infra/controllers/healthcheck-controller";
import OrderController from "./infra/controllers/order-controller";
import ProductsController from "./infra/controllers/products-controller";
import MysqlAdapter from "./infra/database/mysql-adapter";
import Registry from "./infra/di/registry";
import ExpressAdapter from "./infra/http/express-adapter";
import {
  CustomerRepositoryDatabase,
  OrderItemRepositoryDatabase,
  OrderRepositoryDatabase,
  ProductRepositoryDatabase,
} from "./infra/repositories";
import GetStatusOrder from "./application/usecases/order/get-status-order";
import ProcessPayment from "./application/usecases/payment/process-order";
import UpdateStatusOrder from "./application/usecases/order/update-status-order";
import PaymentController from "./infra/controllers/payment-controller";

(async () => {
  const productRepository = new ProductRepositoryDatabase();
  const orderRepository = new OrderRepositoryDatabase();
  const orderItemRepository = new OrderItemRepositoryDatabase();
  const customerRepository = new CustomerRepositoryDatabase();
  const dependencies = {
    database: new MysqlAdapter(),
    createProduct: new CreateProduct(productRepository),
    updateProduct: new UpdateProduct(productRepository),
    deleteProduct: new DeleteProduct(productRepository),
    listProductsByCategory: new ListProductsByCategory(productRepository),
    checkout: new Checkout(
      productRepository,
      orderRepository,
      orderItemRepository,
      customerRepository
    ),
    createCustomer: new CreateCustomer(customerRepository),
    getCustomerByCpf: new GetCustomerByCpf(customerRepository),
    listOrders: new ListOrders(orderRepository, orderItemRepository),
    getStatusOrder: new GetStatusOrder(orderRepository),
    processPayment: new ProcessPayment(orderRepository),
    updateStatusOrder: new UpdateStatusOrder(orderRepository),
  };
  const httpServer = new ExpressAdapter();
  const registry = Registry.getInstance();
  Object.entries({ ...dependencies, httpServer }).forEach(([key, value]) =>
    registry.provide(key, value)
  );

  new HealthCheckController();
  new ProductsController();
  new OrderController();
  new CustomerController();
  new PaymentController();
  httpServer.listen(3000);
})();
