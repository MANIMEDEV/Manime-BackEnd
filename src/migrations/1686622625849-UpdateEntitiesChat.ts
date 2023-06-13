import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEntitiesChat1686622625849 implements MigrationInterface {
    name = 'UpdateEntitiesChat1686622625849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_52af74c7484586ef4bdfd8e4dbb"`);
        await queryRunner.query(`CREATE TABLE "chat_users_users" ("chatId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_713b86e11c5953a582db371fa26" PRIMARY KEY ("chatId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cba23e8b1a61ac2f4b84060c57" ON "chat_users_users" ("chatId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dbcc3f102974a9e7213c35edac" ON "chat_users_users" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "users_chats_chat" ("usersId" integer NOT NULL, "chatId" integer NOT NULL, CONSTRAINT "PK_1ea105a595d621c3df0b7d7c01c" PRIMARY KEY ("usersId", "chatId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5937b033223a9f80a2338efe42" ON "users_chats_chat" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b0c01a6065a43f9bb1bcf460a9" ON "users_chats_chat" ("chatId") `);
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "chat_users_users" ADD CONSTRAINT "FK_cba23e8b1a61ac2f4b84060c573" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "chat_users_users" ADD CONSTRAINT "FK_dbcc3f102974a9e7213c35edacc" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_chats_chat" ADD CONSTRAINT "FK_5937b033223a9f80a2338efe426" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_chats_chat" ADD CONSTRAINT "FK_b0c01a6065a43f9bb1bcf460a97" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_chats_chat" DROP CONSTRAINT "FK_b0c01a6065a43f9bb1bcf460a97"`);
        await queryRunner.query(`ALTER TABLE "users_chats_chat" DROP CONSTRAINT "FK_5937b033223a9f80a2338efe426"`);
        await queryRunner.query(`ALTER TABLE "chat_users_users" DROP CONSTRAINT "FK_dbcc3f102974a9e7213c35edacc"`);
        await queryRunner.query(`ALTER TABLE "chat_users_users" DROP CONSTRAINT "FK_cba23e8b1a61ac2f4b84060c573"`);
        await queryRunner.query(`ALTER TABLE "chat" ADD "userId" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b0c01a6065a43f9bb1bcf460a9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5937b033223a9f80a2338efe42"`);
        await queryRunner.query(`DROP TABLE "users_chats_chat"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dbcc3f102974a9e7213c35edac"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cba23e8b1a61ac2f4b84060c57"`);
        await queryRunner.query(`DROP TABLE "chat_users_users"`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_52af74c7484586ef4bdfd8e4dbb" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
