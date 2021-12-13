import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

/**
 * [X] = Definir o tipo de Retorno
 * [X] = Alterar o Retorno do Error
 * [X] = Acessar o Repositório
 */

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError("Category already Exists !");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
