import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Order,
  Company,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderCompanyController {
  constructor(
    @repository(OrderRepository) protected orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/companies', {
    responses: {
      '200': {
        description: 'Array of Order has many Company',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Company)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Company>,
  ): Promise<Company[]> {
    return this.orderRepository.companies(id).find(filter);
  }

  @post('/orders/{id}/companies', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: {'application/json': {schema: getModelSchemaRef(Company)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Order.prototype.order_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Company, {
            title: 'NewCompanyInOrder',
            exclude: ['company_id'],
            optional: ['order_id']
          }),
        },
      },
    }) company: Omit<Company, 'company_id'>,
  ): Promise<Company> {
    return this.orderRepository.companies(id).create(company);
  }

  @patch('/orders/{id}/companies', {
    responses: {
      '200': {
        description: 'Order.Company PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Company, {partial: true}),
        },
      },
    })
    company: Partial<Company>,
    @param.query.object('where', getWhereSchemaFor(Company)) where?: Where<Company>,
  ): Promise<Count> {
    return this.orderRepository.companies(id).patch(company, where);
  }

  @del('/orders/{id}/companies', {
    responses: {
      '200': {
        description: 'Order.Company DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Company)) where?: Where<Company>,
  ): Promise<Count> {
    return this.orderRepository.companies(id).delete(where);
  }
}
