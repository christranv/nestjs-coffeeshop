import { ICommand, ICommandHandler } from "@nestjs/cqrs";
import { DataSource } from "typeorm";

abstract class BaseCommandHandler<T extends ICommand = any, R = any> implements ICommandHandler<T> {

    constructor(readonly dataSource: DataSource) { }

    async execute(command: T): Promise<R> {
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

    abstract onExecute(command: T): Promise<R>;
}

export default BaseCommandHandler