import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Persona, PersonaRelations, Pedidos} from '../models';
import {PedidosRepository} from './pedidos.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.Id,
  PersonaRelations
> {

  public readonly pedidos: HasManyRepositoryFactory<Pedidos, typeof Persona.prototype.Id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('PedidosRepository') protected pedidosRepositoryGetter: Getter<PedidosRepository>,
  ) {
    super(Persona, dataSource);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidosRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
  }
}
