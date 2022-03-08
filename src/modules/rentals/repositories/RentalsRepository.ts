import { IRentalsCarsRepository } from "@modules/rentals/repositories/IRentalsCarsRepository";
import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rentals";
import { getRepository, Repository } from "typeorm";

class RentalsRepository implements IRentalsCarsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({ car_id });

    return openByCar;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.repository.findOne({user_id})

    return openByUser
  }

  async create({
    car_id,
    expected_return_date,
    user_id,

  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id
    })

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id)

    return rental;
  }

}

export { RentalsRepository };
