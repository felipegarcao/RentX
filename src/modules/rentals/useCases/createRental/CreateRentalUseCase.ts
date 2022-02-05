import { Rental } from "@modules/rentals/infra/typeorm/entities/Rentals";
import { IRentalsCarsRepository } from "@modules/rentals/repositories/IRentalsCarsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsCarsRepository) {}
  async execute({
    car_id,
    expected_return_date,
    user_id,
  }: IRequest): Promise<Rental> {
    // Não deve ser possível cadastrar um novo aluguel caso ja exista um aberto para o mesmo carro
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (carUnavailable) {
      throw new AppError("Car is unavailable");
    }

    // Não deve ser possível cadastrar um novo aluguel caso ja exista um aberto para o mesmo usuário
    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if(rentalOpenToUser){
      throw new AppError("There's a rental in progress for user")
    }

    // O Aluguel deve ter duração minima de 24 horas

   const rental =  await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    })

    return rental;

    
  }
}

export { CreateRentalUseCase };
