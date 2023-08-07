import { BcryptHelper } from '@src/modules/user/domain/helpers/bcrypt.helper';
import Role from '@src/modules/user/domain/role.enum';
import { User } from '@src/modules/user/domain/user';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
    ): Promise<any> {
        const repository = dataSource.getRepository(User);

        const isDataExisted = await repository.exist({});
        if (isDataExisted) return;

        const users: User[] = [
            new User('Admin', 'admin', await BcryptHelper.hash('admin123'), Role.Admin),
            new User('Customer 01', 'customer01', await BcryptHelper.hash('customer123'), Role.User),
        ];
        await repository.save(users);
    }
}