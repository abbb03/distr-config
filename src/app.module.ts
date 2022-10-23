import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { ConfigVersionsModule } from './config-versions/config-versions.module';

@Module({
  imports: [DatabaseModule, ConfigModule, ConfigVersionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
