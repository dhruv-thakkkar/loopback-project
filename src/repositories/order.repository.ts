import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlConnDataSource} from '../datasources';
import {Order, OrderRelations, Customer, Company} from '../models';
import {CustomerRepository} from './customer.repository';
import {CompanyRepository} from './company.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.order_id,
  OrderRelations
> {

  public readonly customers: BelongsToAccessor<Customer, typeof Order.prototype.order_id>;

  public readonly companies: HasManyRepositoryFactory<Company, typeof Order.prototype.order_id>;

  constructor(
    @inject('datasources.mysqlConn') dataSource: MysqlConnDataSource, @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>, @repository.getter('CompanyRepository') protected companyRepositoryGetter: Getter<CompanyRepository>,
  ) {
    super(Order, dataSource);
    this.companies = this.createHasManyRepositoryFactoryFor('companies', companyRepositoryGetter,);
    this.registerInclusionResolver('companies', this.companies.inclusionResolver);
    this.customers = this.createBelongsToAccessorFor('customers', customerRepositoryGetter,);
    this.registerInclusionResolver('customers', this.customers.inclusionResolver);
  }
}
