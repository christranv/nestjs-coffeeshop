import { ItemType } from '@src/shared/domain/base/enums/item-type';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Item } from '../../domain/item';

export default class ItemSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
    ): Promise<any> {
        const repository = dataSource.getRepository(Item);

        const isDataExisted = await repository.exist({});
        if (isDataExisted) return;

        const items: Item[] = [
            new Item(ItemType.CAPPUCCINO, 4.5),
            new Item(ItemType.COFFEE_BLACK, 3),
            new Item(ItemType.COFFEE_WITH_ROOM, 3),
            new Item(ItemType.ESPRESSO, 4.5),
            new Item(ItemType.ESPRESSO_DOUBLE, 2),
            new Item(ItemType.LATTE, 6),
            new Item(ItemType.CAKEPOP, 5.5),
            new Item(ItemType.CROISSANT, 6),
            new Item(ItemType.MUFFIN, 7),
            new Item(ItemType.CROISSANT_CHOCOLATE, 9),
        ];
        await repository.insert(items);
    }
}