import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1730475609385 implements MigrationInterface {
    name = 'Auto1730475609385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`session\` DROP COLUMN \`date\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`session\` ADD \`date\` varchar(255) NOT NULL`);
    }

}
