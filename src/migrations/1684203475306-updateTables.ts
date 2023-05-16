import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1684203475306 implements MigrationInterface {
    name = 'UpdateTables1684203475306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "followers" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "followers" ADD CONSTRAINT "UQ_d052aca09cecd2e9b8b94e3c671" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "followers" ADD "userFollowerId" integer`);
        await queryRunner.query(`ALTER TABLE "followers" ADD CONSTRAINT "UQ_dbd30213dd525fa7f09e5e15b2c" UNIQUE ("userFollowerId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "profileInfosId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_f7297f2289efb670fb2348bfa81" UNIQUE ("profileInfosId")`);
        await queryRunner.query(`ALTER TABLE "profileInfos" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "profileInfos" ADD CONSTRAINT "UQ_e514ff7e2d51bcbfdfddfcd72b7" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "UQ_7e8d7c49f218ebb14314fdb3749" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "postId" integer`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "UQ_e44ddaaa6d058cb4092f83ad61f" UNIQUE ("postId")`);
        await queryRunner.query(`ALTER TABLE "followers" ADD CONSTRAINT "FK_d052aca09cecd2e9b8b94e3c671" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "followers" ADD CONSTRAINT "FK_dbd30213dd525fa7f09e5e15b2c" FOREIGN KEY ("userFollowerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_f7297f2289efb670fb2348bfa81" FOREIGN KEY ("profileInfosId") REFERENCES "profileInfos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profileInfos" ADD CONSTRAINT "FK_e514ff7e2d51bcbfdfddfcd72b7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "profileInfos" DROP CONSTRAINT "FK_e514ff7e2d51bcbfdfddfcd72b7"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_f7297f2289efb670fb2348bfa81"`);
        await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "FK_dbd30213dd525fa7f09e5e15b2c"`);
        await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "FK_d052aca09cecd2e9b8b94e3c671"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "UQ_e44ddaaa6d058cb4092f83ad61f"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "postId"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "UQ_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "profileInfos" DROP CONSTRAINT "UQ_e514ff7e2d51bcbfdfddfcd72b7"`);
        await queryRunner.query(`ALTER TABLE "profileInfos" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_f7297f2289efb670fb2348bfa81"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profileInfosId"`);
        await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "UQ_dbd30213dd525fa7f09e5e15b2c"`);
        await queryRunner.query(`ALTER TABLE "followers" DROP COLUMN "userFollowerId"`);
        await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "UQ_d052aca09cecd2e9b8b94e3c671"`);
        await queryRunner.query(`ALTER TABLE "followers" DROP COLUMN "userId"`);
    }

}
