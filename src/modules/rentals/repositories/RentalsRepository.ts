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
    const openByCar = await this.repository.findOne({ 
      where: {car_id, end_date: null}
     });

    return openByCar;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.repository.findOne({
      where: {user_id, end_date: null}
    })

    return openByUser
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
      id,
      end_date,
      total
    })

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id)

    return rental;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const userId = await this.repository.find({
      user_id
    })

    return userId;
  }

}

export { RentalsRepository };
