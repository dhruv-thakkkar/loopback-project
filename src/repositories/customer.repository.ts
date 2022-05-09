import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlConnDataSource} from '../datasources';
import {Customer, CustomerRelations, Order, Address} from '../models';
import {OrderRepository} from './order.repository';
import {AddressRepository} from './address.repository';

export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.customer_id,
  CustomerRelations
> {

  public readonly orders: HasManyRepositoryFactory<Order, typeof Customer.prototype.customer_id>;

  public readonly addresses: HasManyRepositoryFactory<Address, typeof Customer.prototype.customer_id>;

  constructor(
    @inject('datasources.mysqlConn') dataSource: MysqlConnDataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>, @repository.getter('AddressRepository') protected addressRepositoryGetter: Getter<AddressRepository>,
  ) {
    super(Customer, dataSource);
    this.addresses = this.createHasManyRepositoryFactoryFor('addresses', addressRepositoryGetter,);
    this.registerInclusionResolver('addresses', this.addresses.inclusionResolver);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', orderRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
