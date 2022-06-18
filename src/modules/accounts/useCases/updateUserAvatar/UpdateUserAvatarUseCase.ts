import { inject, injectable } from "tsyringe";
import { IUserRepository } from "@modules/accounts/Repositories/IUserRepository";


import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

// Adicionar coluna avatar na tabela de users
// Refatorar usuário com coluna avatar
// Configuração upload Multer
// Criar Regra de Negocio de Upload
// Criar Controller

@injectable()
class UpdateUserAvatarUSeCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ avatar_file, user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar){
      await this.storageProvider.delete(user.avatar, "avatar")
    }

    await this.storageProvider.save(avatar_file, "avatar")

    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUSeCase };
