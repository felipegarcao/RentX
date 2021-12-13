import { inject, injectable } from "tsyringe";
import { Specification } from "@modules/cars/entities/Specification";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationRepository";

@injectable()
class ListSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(): Promise<Specification[]> {
    const specifications = await this.specificationsRepository.list();

    return specifications;
  }
}

export { ListSpecificationUseCase };
