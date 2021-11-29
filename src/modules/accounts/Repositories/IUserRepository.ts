import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(name: string): Promise<User>;
  findById(name: string): Promise<User>;
}

export { IUserRepository };
