import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { ConfigVersionsModule } from './config-versions/config-versions.module';

@Module({
  imports: [DatabaseModule, ConfigModule, ConfigVersionsModule],
})
export class AppModule {}
