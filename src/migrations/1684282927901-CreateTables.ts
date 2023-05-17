import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1684282927901 implements MigrationInterface {
    name = 'CreateTables1684282927901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profileInfos" ("id" SERIAL NOT NULL, "description" text, "numberFollowers" integer NOT NULL DEFAULT '0', "numberFollowing" integer NOT NULL DEFAULT '0', "numberPosts" integer NOT NULL DEFAULT '0', "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, "userId" integer, CONSTRAINT "REL_e514ff7e2d51bcbfdfddfcd72b" UNIQUE ("userId"), CONSTRAINT "PK_e908c6c2a8f5aac99f48490949a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "fullName" character varying(60) NOT NULL, "nickname" character varying(20) NOT NULL, "email" character varying(45) NOT NULL, "phone" character varying(20), "profileImg" text NOT NULL DEFAULT '', "bannerImg" text NOT NULL DEFAULT '', "banned" boolean NOT NULL DEFAULT false, "suspended" boolean NOT NULL DEFAULT false, "suspendedTime" TIME, "admin" boolean NOT NULL DEFAULT false, "verified" boolean NOT NULL DEFAULT false, "confirmed" boolean NOT NULL DEFAULT false, "password" character varying(120) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, "profileInfosId" integer, CONSTRAINT "UQ_ad02a1be8707004cb805a4b5023" UNIQUE ("nickname"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "REL_f7297f2289efb670fb2348bfa8" UNIQUE ("profileInfosId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "followers" ("id" SERIAL NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_d052aca09cecd2e9b8b94e3c67" UNIQUE ("userId"), CONSTRAINT "PK_c90cfc5b18edd29bd15ba95c1a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "numberShares" integer NOT NULL DEFAULT '0', "description" text, "imgS" text, "likes" integer NOT NULL DEFAULT '0', "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, "userId" integer, CONSTRAINT "REL_ae05faaa55c866130abef6e1fe" UNIQUE ("userId"), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "description" character varying(255) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "deletedAt" date, "userId" integer, "postId" integer, CONSTRAINT "REL_7e8d7c49f218ebb14314fdb374" UNIQUE ("userId"), CONSTRAINT "REL_e44ddaaa6d058cb4092f83ad61" UNIQUE ("postId"), CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "profileInfos" ADD CONSTRAINT "FK_e514ff7e2d51bcbfdfddfcd72b7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_f7297f2289efb670fb2348bfa81" FOREIGN KEY ("profileInfosId") REFERENCES "profileInfos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "followers" ADD CONSTRAINT "FK_d052aca09cecd2e9b8b94e3c671" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);
        await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "FK_d052aca09cecd2e9b8b94e3c671"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_f7297f2289efb670fb2348bfa81"`);
        await queryRunner.query(`ALTER TABLE "profileInfos" DROP CONSTRAINT "FK_e514ff7e2d51bcbfdfddfcd72b7"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "followers"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "profileInfos"`);
    }

}
