import { container } from "tsyringe";


import { IUserRepository } from "@modules/accounts/Repositories/IUserRepository";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";

// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

// ISpecificationsRepository
container.registerSingleton<ISpecificationsRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

// IUsersRepository
container.registerSingleton<IUserRepository>("UsersRepository", UserRepository);
