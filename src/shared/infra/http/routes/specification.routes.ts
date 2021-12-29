import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import {ListSpecificationController} from '@modules/cars/useCases/listSpecification/ListSpecificationController'
const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();


specificationRoutes.use(ensureAuthenticated)

specificationRoutes.post("/", ensureAuthenticated, createSpecificationController.handle);
specificationRoutes.get('/', listSpecificationController.handle);

export { specificationRoutes };
