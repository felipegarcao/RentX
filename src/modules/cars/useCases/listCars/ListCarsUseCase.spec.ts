import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name car",
      description: "Description car",
      brand: "Car_brand",
      fine_amount: 0,
      daily_rate: 0,
      license_plate: "FHL-1234",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      brand: "Car_brand"
    });

    console.log(cars)

    // eu espero que seja retornado as mesmas informação criadas acima.
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name car Two",
      description: "Description car",
      brand: "Car_brand_test",
      fine_amount: 0,
      daily_rate: 0,
      license_plate: "FHL-1234",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      name: "Name car Two"
    });

    expect(cars).toEqual([car])
  });
});
