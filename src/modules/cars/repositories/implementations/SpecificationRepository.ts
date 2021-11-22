import { Specification } from "../../entities/Specification";

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationRepository";

import { Repository, getRepository } from "typeorm";

class SpecificationRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  // para criar especificação do carro
  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);
  }


  // para buscar pelo nome de alguma especificação
  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });
    return specification;
  }

  // para listar todas especificações
  async list(): Promise<Specification[]> {
    const specification = await this.repository.find();
    return specification;
  }
}

export { SpecificationRepository };
