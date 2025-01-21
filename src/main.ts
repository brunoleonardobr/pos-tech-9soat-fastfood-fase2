import CustomerApiController from "./infra/api-controllers/customer-api-controller";
import HealthCheckController from "./infra/api-controllers/healthcheck-controller";
import OrderApiController from "./infra/api-controllers/order-api-controller";
import ProductsApiController from "./infra/api-controllers/products-api-controller";
import MysqlAdapter from "./infra/database/mysql-adapter";
import Registry from "./infra/di/registry";
import ExpressAdapter from "./infra/http/express-adapter";
import {
  CustomerRepositoryDatabase,
  OrderItemRepositoryDatabase,
  OrderRepositoryDatabase,
  ProductRepositoryDatabase,
} from "./infra/repositories";
import PaymentController from "./infra/api-controllers/payment-api-controller";

(async () => {
  const productRepository = new ProductRepositoryDatabase();
  const orderRepository = new OrderRepositoryDatabase();
  const orderItemRepository = new OrderItemRepositoryDatabase();
  const customerRepository = new CustomerRepositoryDatabase();
  const dependencies = {
    database: new MysqlAdapter(),
    customerRepository: new CustomerRepositoryDatabase(),
    orderRepository: new OrderRepositoryDatabase(),
    orderItemRepository: new OrderItemRepositoryDatabase(),
    productRepository: new ProductRepositoryDatabase(),
  };
  const httpServer = new ExpressAdapter();
  const registry = Registry.getInstance();
  Object.entries({ ...dependencies, httpServer }).forEach(([key, value]) =>
    registry.provide(key, value)
  );

  new HealthCheckController();
  new ProductsApiController();
  new OrderApiController();
  new CustomerApiController();
  new PaymentController();
  httpServer.listen(3000);
})();
