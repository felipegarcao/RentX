import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUSeCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    // Receber arquivo

    const avatar_file = null;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUSeCase);

    await updateUserAvatarUseCase.execute({
      user_id: id,
      avatar_file,
    });

    return response.status(204).send()
  }
}

export { UpdateUserAvatarController };
