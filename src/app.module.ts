import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WorkpointsModule } from './workpoints/workpoints.module';
// import { UserWorkpointsModule } from './user-workpoints/user-workpoints.module';

import { AuthGuard } from '@/src/auth/auth.guard';

// import { User } from './users/entities/user.entity';
// import { Role } from './users/entities/role.entity';
// import { Workpoint } from './workpoints/entities/workpoint.entity';
// import { UserWorkpoint } from './user-workpoints/entities/user-workpoint.entity';
import { CONNECTION } from '@/src/shared/db.connection';
import { DevicesModule } from './devices/devices.module';
import { DeviceTypesModule } from './device-types/device-types.module';
import { RolesModule } from './roles/roles.module';
import { DeviceConnectionsModule } from './device-connections/device-connections.module';
import { ProductsModule } from './products/products.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';
import { ProductsService } from './products/products.service';
import { WorkpointProductsModule } from './workpoint-products/workpoint-products.module';
import { PriceGroupsModule } from './price-groups/price-groups.module';
@Module({
  imports: [
    //@ts-ignore
    TypeOrmModule.forRoot({
      ...CONNECTION,
      synchronize: false,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    WorkpointsModule,
    DevicesModule,
    DeviceTypesModule,
    RolesModule,
    DeviceConnectionsModule,
    ProductsModule,
    IngredientsModule,
    ProductCategoriesModule,
    WorkpointProductsModule,
    PriceGroupsModule,
    // UserWorkpointsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      //@ts-ignore
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    AppService,
    // ProductsService,
  ],
})
export class AppModule {}
