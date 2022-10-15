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
  Pedidos,
  Producto,
} from '../models';
import {PedidosRepository} from '../repositories';

export class PedidosProductoController {
  constructor(
    @repository(PedidosRepository) protected pedidosRepository: PedidosRepository,
  ) { }

  @get('/pedidos/{id}/producto', {
    responses: {
      '200': {
        description: 'Pedidos has one Producto',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Producto),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Producto>,
  ): Promise<Producto> {
    return this.pedidosRepository.producto(id).get(filter);
  }

  @post('/pedidos/{id}/producto', {
    responses: {
      '200': {
        description: 'Pedidos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pedidos.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInPedidos',
            exclude: ['Id'],
            optional: ['pedidosId']
          }),
        },
      },
    }) producto: Omit<Producto, 'Id'>,
  ): Promise<Producto> {
    return this.pedidosRepository.producto(id).create(producto);
  }

  @patch('/pedidos/{id}/producto', {
    responses: {
      '200': {
        description: 'Pedidos.Producto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Partial<Producto>,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.pedidosRepository.producto(id).patch(producto, where);
  }

  @del('/pedidos/{id}/producto', {
    responses: {
      '200': {
        description: 'Pedidos.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.pedidosRepository.producto(id).delete(where);
  }
}
