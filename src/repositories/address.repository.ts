import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlConnDataSource} from '../datasources';
import {Address, AddressRelations} from '../models';

export class AddressRepository extends DefaultCrudRepository<
  Address,
  typeof Address.prototype.address_id,
  AddressRelations
> {
  constructor(
    @inject('datasources.mysqlConn') dataSource: MysqlConnDataSource,
  ) {
    super(Address, dataSource);
  }
}
