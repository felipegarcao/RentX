import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
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

    const cars = await listCarsUseCase.execute({});

    // eu espero que seja retornado as mesmas informação criadas acima.
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car2",
      description: "Description car",
      brand: "Car_brand_test",
      fine_amount: 0,
      daily_rate: 0,
      license_plate: "FHL-1234",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      brand: "Car_brand_test",
    });

    expect(cars).toEqual([car])
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car3",
      description: "Description car",
      brand: "Car_brand_test",
      fine_amount: 0,
      daily_rate: 0,
      license_plate: "FHL-1234",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      name: "car3",
    });

    expect(cars).toEqual([car])
  });


  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car3",
      description: "Description car",
      brand: "Car_brand_test",
      fine_amount: 0,
      daily_rate: 0,
      license_plate: "FHL-1234",
      category_id: "12345",
    });

    const cars = await listCarsUseCase.execute({
      category_id: "12345",
    });

    expect(cars).toEqual([car])
  });


});
