import { ICommand, ICommandHandler } from "@nestjs/cqrs";
import { DataSource } from "typeorm";

export abstract class BaseCommandHandler<T extends ICommand = any> implements ICommandHandler<T> {

    constructor(private readonly dataSource: DataSource) { }

    async execute(command: T): Promise<any> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        let result;
        try {
            result = await this.onExecute(command);
            await queryRunner.commitTransaction();
        } catch (err) {
            // since we have errors lets rollback the changes we made
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            // you need to release a queryRunner which was manually instantiated
            await queryRunner.release();
        }
        return result;

    }

    abstract onExecute(command: T): Promise<any>;
}
