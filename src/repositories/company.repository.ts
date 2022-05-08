import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlConnDataSource} from '../datasources';
import {Company, CompanyRelations} from '../models';

export class CompanyRepository extends DefaultCrudRepository<
  Company,
  typeof Company.prototype.company_id,
  CompanyRelations
> {
  constructor(
    @inject('datasources.mysqlConn') dataSource: MysqlConnDataSource,
  ) {
    super(Company, dataSource);
  }
}
