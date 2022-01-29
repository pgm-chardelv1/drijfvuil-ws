/*
 * External imports
 */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { join } from 'path';

/*
 * App Controller & Provider
 */
import { AppController } from './app.controller';
import { AppService } from './app.service';

/*
 * Local Modules
 */
import { AuthModule } from './auth/auth.module';
import { CitiesModule } from './cities/cities.module';
import { CleanupsModule } from './cleanups/cleanups.module';
import { FilesModule } from './files/files.module';
import { ImagesModule } from './images/images.module';
import { QuartersModule } from './quarters/quarters.module';
import { ReportsModule } from './reports/reports.module';
import { SeederModule } from './seeder/seeder.module';
import { UsersModule } from './users/users.module';

/*
 * Local Entities
 */
import { City } from './cities/entities/city.entity';
import { Cleanup } from './cleanups/entities/cleanup.entity';
import { DbImage } from './images/entities/image.entity';
import { Quarter } from './quarters/entities/quarter.entity';
import { Report } from './reports/entities/report.entity';
import { User } from './users/entities/user.entity';

/**
 * Main App Module; declare all modules,
 * import Throttler, GraphQl, TypeOrm, Config
 *
 * @class AppModule
 */
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 2,
    }),
    GraphQLModule.forRoot({
      introspection: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<PostgresConnectionOptions> => {
        const config: PostgresConnectionOptions = {
          type: 'postgres',
          host: configService.get<string>('DB_HOST', 'localhost'),
          port: configService.get<number>('DB_PORT', 5433),
          username: configService.get<string>('DB_USERNAME', 'postgres'),
          password: configService.get<string>('DB_PASSWORD', 'toor'),
          database: configService.get<string>('DB_DATABASE_NAME', 'drijfvuil'),
          entities: [City, Cleanup, DbImage, Quarter, Report, User],
          migrations: ['apps/api/migration/*{.ts,.js}'],
          migrationsTableName: 'migration',
          cli: {
            migrationsDir: 'src/migration',
          },

          synchronize: configService.get<boolean>('DB_SYNC', true),
          logging: configService.get<boolean>('TYPEORM_LOGGING', false),
        };
        return config;
      },

      inject: [ConfigService],
    }),
    AuthModule,
    CitiesModule,
    CleanupsModule,
    FilesModule,
    ImagesModule,
    QuartersModule,
    ReportsModule,
    SeederModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
