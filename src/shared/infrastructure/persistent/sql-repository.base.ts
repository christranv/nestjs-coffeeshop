// import { EventPublisher } from "@nestjs/cqrs";
// import { DataSource, Entity, ObjectLiteral, Repository } from "typeorm";

// export default abstract class SqlRepositoryBase<Entity extends ObjectLiteral> implements Repository<Entity> {
//     constructor(private dataSource: DataSource, private publisher: EventPublisher) {
//         super(Entity, dataSource.createEntityManager());
//     }
// }