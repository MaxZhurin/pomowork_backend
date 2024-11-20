import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1730291474525 implements MigrationInterface {
    name = 'Auto1730291474525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`emailVerified\` tinyint NOT NULL DEFAULT 1, \`picture\` varchar(255) NOT NULL, \`googleId\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`settings\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(255) NOT NULL, \`workTime\` decimal(6,2) NOT NULL DEFAULT '25.00', \`shortTime\` decimal(6,2) NOT NULL DEFAULT '5.00', \`longTime\` decimal(6,2) NOT NULL DEFAULT '15.00', \`theme\` varchar(255) NOT NULL DEFAULT 'LIGHT', \`digitsFont\` varchar(255) NOT NULL DEFAULT 'Mexcellent', \`autoStartBreaks\` tinyint NOT NULL DEFAULT 0, \`autoStartWorks\` tinyint NOT NULL DEFAULT 0, \`longBreakInterval\` int NOT NULL DEFAULT '3', \`workColor\` varchar(255) NOT NULL DEFAULT '#ffb8b8', \`shortColor\` varchar(255) NOT NULL DEFAULT '#8381df', \`longColor\` varchar(255) NOT NULL DEFAULT '#53c188', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_9175e059b0a720536f7726a88c\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`timer\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 0, \`step\` varchar(255) NOT NULL DEFAULT 'WORK', \`startTime\` bigint NOT NULL DEFAULT '0', \`finishTime\` bigint NOT NULL DEFAULT '0', \`pauseDate\` bigint NOT NULL DEFAULT '0', \`paused\` tinyint NOT NULL DEFAULT 0, \`pauseSec\` int NULL, \`startTimeSec\` int NULL, \`finishedWorks\` int NOT NULL DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_8b7bbfe2a83b70ceaa2d35bce8\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`session\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(255) NOT NULL, \`time\` int NOT NULL, \`date\` varchar(255) NOT NULL, \`step\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`webpush\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(255) NOT NULL, \`data\` varchar(1000) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_c90c5f71bfce432a9b6430dafc\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`settings\` ADD CONSTRAINT \`FK_9175e059b0a720536f7726a88c7\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`timer\` ADD CONSTRAINT \`FK_8b7bbfe2a83b70ceaa2d35bce80\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`session\` ADD CONSTRAINT \`FK_3d2f174ef04fb312fdebd0ddc53\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`webpush\` ADD CONSTRAINT \`FK_c90c5f71bfce432a9b6430dafc9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`webpush\` DROP FOREIGN KEY \`FK_c90c5f71bfce432a9b6430dafc9\``);
        await queryRunner.query(`ALTER TABLE \`session\` DROP FOREIGN KEY \`FK_3d2f174ef04fb312fdebd0ddc53\``);
        await queryRunner.query(`ALTER TABLE \`timer\` DROP FOREIGN KEY \`FK_8b7bbfe2a83b70ceaa2d35bce80\``);
        await queryRunner.query(`ALTER TABLE \`settings\` DROP FOREIGN KEY \`FK_9175e059b0a720536f7726a88c7\``);
        await queryRunner.query(`DROP INDEX \`REL_c90c5f71bfce432a9b6430dafc\` ON \`webpush\``);
        await queryRunner.query(`DROP TABLE \`webpush\``);
        await queryRunner.query(`DROP TABLE \`session\``);
        await queryRunner.query(`DROP INDEX \`REL_8b7bbfe2a83b70ceaa2d35bce8\` ON \`timer\``);
        await queryRunner.query(`DROP TABLE \`timer\``);
        await queryRunner.query(`DROP INDEX \`REL_9175e059b0a720536f7726a88c\` ON \`settings\``);
        await queryRunner.query(`DROP TABLE \`settings\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
