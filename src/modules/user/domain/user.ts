import { BaseAggregateRoot } from '@src/shared/domain/seedwork/base-entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import Role from './role.enum';

@Entity()
export class User extends BaseAggregateRoot {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public name: string;

  @Column()
  public username: string;

  @Column()
  public hashedPassword: string;

  @Column({
    type: 'enum',
    enum: Role
  })
  public role: Role

  constructor(name: string, username: string, hashedPassword: string, role: Role) {
    super();
    this.name = name;
    this.username = username;
    this.hashedPassword = hashedPassword;
    this.role = role;
  }
}
