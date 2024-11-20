import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1730303171884 implements MigrationInterface {
    name = 'Auto1730303171884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`session\` ADD \`finishDate\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`session\` DROP COLUMN \`finishDate\``);
    }

}
