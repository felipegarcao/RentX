import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";


interface IRequest {
  name: string;
  description: string;
}

/**
 * [X] = Definir o tipo de Retorno
 * [X] = Alterar o Retorno do Error
 * [X] = Acessar o Repositório
 */
class CreateCategoryUseCase{
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category already Exists !");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
