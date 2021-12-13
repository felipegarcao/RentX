import { container } from "tsyringe";

import { UserRepository } from "@modules/accounts/Repositories/implementations/UserRepository";
import { IUserRepository } from "@modules/accounts/Repositories/IUserRepository";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/cars/repositories/implementations/CategoriesRepository";

import { SpecificationRepository } from "@modules/cars/repositories/implementations/SpecificationRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationRepository";

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
