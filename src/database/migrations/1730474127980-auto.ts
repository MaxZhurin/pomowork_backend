import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1730474127980 implements MigrationInterface {
    name = 'Auto1730474127980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timer\` DROP COLUMN \`startDate\``);
        await queryRunner.query(`ALTER TABLE \`timer\` ADD \`startDate\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`timer\` DROP COLUMN \`lastStartSec\``);
        await queryRunner.query(`ALTER TABLE \`timer\` ADD \`lastStartSec\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timer\` DROP COLUMN \`lastStartSec\``);
        await queryRunner.query(`ALTER TABLE \`timer\` ADD \`lastStartSec\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`timer\` DROP COLUMN \`startDate\``);
        await queryRunner.query(`ALTER TABLE \`timer\` ADD \`startDate\` int NULL`);
    }

}
