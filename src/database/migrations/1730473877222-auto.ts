import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1730473877222 implements MigrationInterface {
    name = 'Auto1730473877222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timer\` DROP COLUMN \`finishTime\``);
        await queryRunner.query(`ALTER TABLE \`timer\` DROP COLUMN \`paused\``);
        await queryRunner.query(`ALTER TABLE \`timer\` DROP COLUMN \`pauseDate\``);
        await queryRunner.query(`ALTER TABLE \`timer\` DROP COLUMN \`startTime\``);
        await queryRunner.query(`ALTER TABLE \`timer\` DROP COLUMN \`startTimeSec\``);
        await queryRunner.query(`ALTER TABLE \`timer\` ADD \`startDate\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`timer\` ADD \`startSec\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`timer\` ADD \`lastStartSec\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timer\` DROP COLUMN \`lastStartSec\``);
        await queryRunner.query(`ALTER TABLE \`timer\` DROP COLUMN \`startSec\``);
        await queryRunner.query(`ALTER TABLE \`timer\` DROP COLUMN \`startDate\``);
        await queryRunner.query(`ALTER TABLE \`timer\` ADD \`startTimeSec\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`timer\` ADD \`startTime\` bigint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`timer\` ADD \`pauseDate\` bigint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`timer\` ADD \`paused\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`timer\` ADD \`finishTime\` bigint NOT NULL DEFAULT '0'`);
    }

}
