import { Specification } from "../../entities/Specification";
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from "../ISpecificationRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);
  }
  async list(): Promise<Specification[]> {
    const all = this.specifications;

    return all;
  }
  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(specification => specification.name === name);

    return specification;
  }
}

export { SpecificationsRepositoryInMemory };
