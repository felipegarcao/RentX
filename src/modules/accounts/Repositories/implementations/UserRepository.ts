import { User } from "../../entities/User";

import { IUserRepository } from "../IUserRepository";

import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    password,
    driver_license,
    avatar,
    id
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      avatar,
      id
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const users = await this.repository.findOne({email})
    return users;
  }

  async findById(id: string): Promise<User> {
    const userId = await this.repository.findOne(id)
    return userId;
  }
}

export { UserRepository };
