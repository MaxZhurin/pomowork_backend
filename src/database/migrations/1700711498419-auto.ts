import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1700711498419 implements MigrationInterface {
    name = 'Auto1700711498419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ingredient\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`unit\` enum ('quantity', 'weight') NOT NULL DEFAULT 'quantity', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`device_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`limit\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` enum ('user', 'admin', 'moderator', 'manager', 'superadmin') NOT NULL DEFAULT 'user', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_ingredient\` (\`id\` varchar(36) NOT NULL, \`index\` int NOT NULL, \`productId\` varchar(255) NOT NULL, \`ingredientId\` varchar(255) NOT NULL, \`count\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_flow\` (\`id\` varchar(36) NOT NULL, \`index\` int NOT NULL, \`productId\` varchar(255) NOT NULL, \`deviceTypeId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_category\` (\`id\` varchar(36) NOT NULL, \`index\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`workpointId\` int NOT NULL, \`icon\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`categoryId\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`version\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`price_group_product\` (\`id\` varchar(36) NOT NULL, \`index\` int NOT NULL, \`productId\` varchar(255) NOT NULL, \`priceGroupId\` varchar(255) NOT NULL, \`price\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`price_group\` (\`id\` varchar(36) NOT NULL, \`index\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workpoint\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`priceGroupId\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`login\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`device\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`connected\` tinyint NOT NULL DEFAULT 0, \`connectedAt\` datetime NULL, \`online\` tinyint NOT NULL DEFAULT 0, \`deviceTypeId\` int NULL, \`workpointId\` int NULL, \`createdById\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workpoint_product\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`workpointId\` int NULL, \`productId\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`version\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_roles_role\` (\`userId\` varchar(36) NOT NULL, \`roleId\` int NOT NULL, INDEX \`IDX_5f9286e6c25594c6b88c108db7\` (\`userId\`), INDEX \`IDX_4be2f7adf862634f5f803d246b\` (\`roleId\`), PRIMARY KEY (\`userId\`, \`roleId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_workpoints_workpoint\` (\`userId\` varchar(36) NOT NULL, \`workpointId\` int NOT NULL, INDEX \`IDX_9d75d831ac688ba8be882e999a\` (\`userId\`), INDEX \`IDX_3070968d7dccd18289a534f6e1\` (\`workpointId\`), PRIMARY KEY (\`userId\`, \`workpointId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product_ingredient\` ADD CONSTRAINT \`FK_d6fd52ba735eee4514d0a9a92cc\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_ingredient\` ADD CONSTRAINT \`FK_1525d4cd30cd2af9de7952a0fe2\` FOREIGN KEY (\`ingredientId\`) REFERENCES \`ingredient\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_flow\` ADD CONSTRAINT \`FK_782836aac150da60545752f76a1\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_flow\` ADD CONSTRAINT \`FK_ea5713f9f573f3a0bf46f677039\` FOREIGN KEY (\`deviceTypeId\`) REFERENCES \`device_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_category\` ADD CONSTRAINT \`FK_147986b46e38620d4cfcdfbf1cb\` FOREIGN KEY (\`workpointId\`) REFERENCES \`workpoint\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_ff0c0301a95e517153df97f6812\` FOREIGN KEY (\`categoryId\`) REFERENCES \`product_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`price_group_product\` ADD CONSTRAINT \`FK_3d4eefc252a06941380c11f1e29\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`price_group_product\` ADD CONSTRAINT \`FK_571acf57f276687a5f6017a0bb3\` FOREIGN KEY (\`priceGroupId\`) REFERENCES \`price_group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workpoint\` ADD CONSTRAINT \`FK_134eb6c691ef2cb7132b319bbe9\` FOREIGN KEY (\`priceGroupId\`) REFERENCES \`price_group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`device\` ADD CONSTRAINT \`FK_e23ca0c7e22ffc2d8c6233c20d9\` FOREIGN KEY (\`deviceTypeId\`) REFERENCES \`device_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`device\` ADD CONSTRAINT \`FK_a5026b28f6c97b066b93563a569\` FOREIGN KEY (\`workpointId\`) REFERENCES \`workpoint\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`device\` ADD CONSTRAINT \`FK_d355bf1a9e7fbdde3a0a05523b9\` FOREIGN KEY (\`createdById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workpoint_product\` ADD CONSTRAINT \`FK_8b84cc5b6a855fcb46fb470b9bc\` FOREIGN KEY (\`workpointId\`) REFERENCES \`workpoint\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workpoint_product\` ADD CONSTRAINT \`FK_2033f0218eccab34173427167e6\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_roles_role\` ADD CONSTRAINT \`FK_5f9286e6c25594c6b88c108db77\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_roles_role\` ADD CONSTRAINT \`FK_4be2f7adf862634f5f803d246b8\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_workpoints_workpoint\` ADD CONSTRAINT \`FK_9d75d831ac688ba8be882e999a1\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_workpoints_workpoint\` ADD CONSTRAINT \`FK_3070968d7dccd18289a534f6e1a\` FOREIGN KEY (\`workpointId\`) REFERENCES \`workpoint\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_workpoints_workpoint\` DROP FOREIGN KEY \`FK_3070968d7dccd18289a534f6e1a\``);
        await queryRunner.query(`ALTER TABLE \`user_workpoints_workpoint\` DROP FOREIGN KEY \`FK_9d75d831ac688ba8be882e999a1\``);
        await queryRunner.query(`ALTER TABLE \`user_roles_role\` DROP FOREIGN KEY \`FK_4be2f7adf862634f5f803d246b8\``);
        await queryRunner.query(`ALTER TABLE \`user_roles_role\` DROP FOREIGN KEY \`FK_5f9286e6c25594c6b88c108db77\``);
        await queryRunner.query(`ALTER TABLE \`workpoint_product\` DROP FOREIGN KEY \`FK_2033f0218eccab34173427167e6\``);
        await queryRunner.query(`ALTER TABLE \`workpoint_product\` DROP FOREIGN KEY \`FK_8b84cc5b6a855fcb46fb470b9bc\``);
        await queryRunner.query(`ALTER TABLE \`device\` DROP FOREIGN KEY \`FK_d355bf1a9e7fbdde3a0a05523b9\``);
        await queryRunner.query(`ALTER TABLE \`device\` DROP FOREIGN KEY \`FK_a5026b28f6c97b066b93563a569\``);
        await queryRunner.query(`ALTER TABLE \`device\` DROP FOREIGN KEY \`FK_e23ca0c7e22ffc2d8c6233c20d9\``);
        await queryRunner.query(`ALTER TABLE \`workpoint\` DROP FOREIGN KEY \`FK_134eb6c691ef2cb7132b319bbe9\``);
        await queryRunner.query(`ALTER TABLE \`price_group_product\` DROP FOREIGN KEY \`FK_571acf57f276687a5f6017a0bb3\``);
        await queryRunner.query(`ALTER TABLE \`price_group_product\` DROP FOREIGN KEY \`FK_3d4eefc252a06941380c11f1e29\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_ff0c0301a95e517153df97f6812\``);
        await queryRunner.query(`ALTER TABLE \`product_category\` DROP FOREIGN KEY \`FK_147986b46e38620d4cfcdfbf1cb\``);
        await queryRunner.query(`ALTER TABLE \`product_flow\` DROP FOREIGN KEY \`FK_ea5713f9f573f3a0bf46f677039\``);
        await queryRunner.query(`ALTER TABLE \`product_flow\` DROP FOREIGN KEY \`FK_782836aac150da60545752f76a1\``);
        await queryRunner.query(`ALTER TABLE \`product_ingredient\` DROP FOREIGN KEY \`FK_1525d4cd30cd2af9de7952a0fe2\``);
        await queryRunner.query(`ALTER TABLE \`product_ingredient\` DROP FOREIGN KEY \`FK_d6fd52ba735eee4514d0a9a92cc\``);
        await queryRunner.query(`DROP INDEX \`IDX_3070968d7dccd18289a534f6e1\` ON \`user_workpoints_workpoint\``);
        await queryRunner.query(`DROP INDEX \`IDX_9d75d831ac688ba8be882e999a\` ON \`user_workpoints_workpoint\``);
        await queryRunner.query(`DROP TABLE \`user_workpoints_workpoint\``);
        await queryRunner.query(`DROP INDEX \`IDX_4be2f7adf862634f5f803d246b\` ON \`user_roles_role\``);
        await queryRunner.query(`DROP INDEX \`IDX_5f9286e6c25594c6b88c108db7\` ON \`user_roles_role\``);
        await queryRunner.query(`DROP TABLE \`user_roles_role\``);
        await queryRunner.query(`DROP TABLE \`workpoint_product\``);
        await queryRunner.query(`DROP TABLE \`device\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`workpoint\``);
        await queryRunner.query(`DROP TABLE \`price_group\``);
        await queryRunner.query(`DROP TABLE \`price_group_product\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`product_category\``);
        await queryRunner.query(`DROP TABLE \`product_flow\``);
        await queryRunner.query(`DROP TABLE \`product_ingredient\``);
        await queryRunner.query(`DROP TABLE \`role\``);
        await queryRunner.query(`DROP TABLE \`device_type\``);
        await queryRunner.query(`DROP TABLE \`ingredient\``);
    }

}
