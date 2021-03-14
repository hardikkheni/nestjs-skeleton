import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { DatabaseModule } from './database/database.module';

const NODE_ENV: string = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        join(__dirname, '..', 'env', `.${NODE_ENV || 'dev'}.env`),
        join(__dirname, '..', 'env', '.env'),
      ],
      isGlobal: true,
    }),
    DatabaseModule,
  ],
})
export class AppModule {}
