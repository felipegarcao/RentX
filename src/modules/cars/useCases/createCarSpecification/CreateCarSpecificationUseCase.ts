import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

class CreateCarSpecificationUseCase {

  constructor(
    // @Inject("CarsRepository")
    private carsRepository: ICarsRepository
 ){}

  async execute({ car_id, specifications_id }: IRequest): Promise<void> {


    const carExists = await this.carsRepository.findById(car_id);


    if (!carExists) {
      throw new AppError("non existent car! ")
    }
  }
}

export { CreateCarSpecificationUseCase };
