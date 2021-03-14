import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get<string>('DB_TYPE'),
          host: configService.get<string>('DB_HOST'),
          port: +configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASS'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [],
          logging: true,
          subscribers: [],
          synchronize: false,
        } as MysqlConnectionOptions),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
