import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlConnDataSource} from '../datasources';
import {Order, OrderRelations, Customer} from '../models';
import {CustomerRepository} from './customer.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.order_id,
  OrderRelations
> {

  public readonly customers: BelongsToAccessor<Customer, typeof Order.prototype.order_id>;

  constructor(
    @inject('datasources.mysqlConn') dataSource: MysqlConnDataSource, @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>,
  ) {
    super(Order, dataSource);
    this.customers = this.createBelongsToAccessorFor('customers', customerRepositoryGetter,);
    this.registerInclusionResolver('customers', this.customers.inclusionResolver);
  }
}
