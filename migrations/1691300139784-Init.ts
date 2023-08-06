import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1691300139784 implements MigrationInterface {
    name = 'Init1691300139784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "barista_item" ("id" character varying NOT NULL, "itemType" integer NOT NULL, "itemName" character varying NOT NULL, "timeIn" TIMESTAMP NOT NULL, "timeUp" TIMESTAMP NOT NULL, CONSTRAINT "PK_d2fcdb499431fc4f97da952dd68" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item" ("id" integer NOT NULL, "name" character varying NOT NULL, "price" double precision NOT NULL, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "kitchen_order" ("id" character varying NOT NULL, "itemType" integer NOT NULL, "itemName" character varying NOT NULL, "timeIn" TIMESTAMP NOT NULL, "timeUp" TIMESTAMP NOT NULL, CONSTRAINT "PK_307189bb6b47643d1bef8a64747" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "line_item" ("id" character varying NOT NULL, "itemType" integer NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "itemStatus" integer NOT NULL, "isBaristaOrder" boolean NOT NULL, "orderId" character varying, CONSTRAINT "PK_cce6b13e67fa506d1d9618ac68b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" character varying NOT NULL, "orderSource" integer NOT NULL, "loyaltyMemberId" character varying NOT NULL, "orderStatus" integer NOT NULL, "location" integer NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('User', 'Admin')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "username" character varying NOT NULL, "hashedPassword" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "line_item" ADD CONSTRAINT "FK_7a2c5ccd90e7df4fc8465903a17" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "line_item" DROP CONSTRAINT "FK_7a2c5ccd90e7df4fc8465903a17"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "line_item"`);
        await queryRunner.query(`DROP TABLE "kitchen_order"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`DROP TABLE "barista_item"`);
    }

}
