import { IRentalsCarsRepository } from "@modules/rentals/repositories/IRentalsCarsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  user_id: string;
}

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsCarsRepository
  ) {}

  async execute({ user_id }: IRequest) {

    const rentalsByUser = await this.rentalsRepository.findByUser(user_id)

    return rentalsByUser;
  }
}

export { ListRentalsByUserUseCase };
