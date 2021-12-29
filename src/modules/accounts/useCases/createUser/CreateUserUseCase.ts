import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/accounts/Repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if(userAlreadyExists) {
      throw new AppError('User Already Exists !')
    }
    const passwordHash = await hash(password, 8);

    await this.userRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });
  }
}

export { CreateUseCase };
