import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Rentals1643647647371 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await  queryRunner.createTable(
            new Table({
                name: "rentals_cars",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "car_id",
                        type: "uuid"
                    },
                    {
                        name: "user_id",
                        type: "uuid"
                    },
                    {
                       name: "start_date",
                       type: "timestamp",
                       default: "now()"
                    },
                    {
                        name: "end_date",
                        type: "timestamp",
                        isNullable: true
                    },
                    {
                        name: "total",
                        type: "numeric",
                        isNullable: true
                    },
                    {
                        name: "expected_return_date",
                        type: "timestamp",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKRentalCarId",
                        referencedTableName: "cars",
                        referencedColumnNames: ["id"],
                        columnNames: ["car_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                    {
                        name: "FKRentalUserId",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("rentals_cars")
    }

}
