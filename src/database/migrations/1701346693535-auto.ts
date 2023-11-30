import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1701346693535 implements MigrationInterface {
    name = 'Auto1701346693535'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`price_group\` ADD \`currency\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_a62473490b3e4578fd683235c5\` (\`login\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_a62473490b3e4578fd683235c5\``);
        await queryRunner.query(`ALTER TABLE \`price_group\` DROP COLUMN \`currency\``);
    }

}
