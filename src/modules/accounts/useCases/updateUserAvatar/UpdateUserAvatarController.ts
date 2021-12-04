import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUSeCase } from "./UpdateUserAvatarUseCase";

// interface IFiles {
//   filename: string;
// }

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    // Receber arquivo
    const avatar_file = request.file.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUSeCase);

    await updateUserAvatarUseCase.execute({
      user_id,
      avatar_file,
    });

    return response.status(200).json(avatar_file);
  }
}

export { UpdateUserAvatarController };
