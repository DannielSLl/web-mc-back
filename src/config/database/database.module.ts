import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities: [join(process.cwd(), 'dist/**/*.entity{.ts,.js}')],
            synchronize: true,
            autoLoadEntities : true,
            ssl: {
              rejectUnauthorized: false,
            },
          }),
          inject: [ConfigService],
        }),
      ],
})
export class DatabaseModule {}