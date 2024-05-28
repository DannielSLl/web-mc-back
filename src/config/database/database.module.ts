import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            type: 'mysql',
            host: process.env.DB_HOST || configService.get('DB_HOST'),
            port: +process.env.DB_PORT || +configService.get('DB_PORT'),
            username: process.env.DB_USERNAME || configService.get('DB_USERNAME'),
            password: process.env.DB_PASSWORD || configService.get('DB_PASSWORD'),
            database: process.env.DB_NAME || configService.get('DB_NAME'),
            entities: [join(process.cwd(), 'dist/**/*.entity{.ts,.js}')],
            synchronize: true,
            autoLoadEntities : true,
            ssl: {
              rejectUnauthorized: false,
            },
            extra: {
              ssl: false,
            }
          }),
          inject: [ConfigService],
        }),
      ],
})
export class DatabaseModule {}