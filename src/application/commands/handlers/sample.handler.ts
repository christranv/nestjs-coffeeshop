import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SampleCommand } from '../../../domain/counter/commands/place-order.command';

@CommandHandler(SampleCommand)
export class SampleHandler
    implements ICommandHandler<SampleCommand> {
    constructor(
        private readonly publisher: EventPublisher,
    ) { }

    async execute(command: SampleCommand) {
        // console.log(clc.yellowBright('Async DropAncientItemCommand...'));

        // const { heroId, itemId } = command;
        // const hero = this.publisher.mergeObjectContext(
        //     await this.repository.findOneById(+heroId),
        // );
        // hero.addItem(itemId);
        // hero.commit();
    }
}
