import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigController } from './config.controller';
import { Config, ConfigSchema } from './config.schema';
import { ConfigService } from './config.service';

@Module({
    imports: [MongooseModule.forFeature([{name: Config.name, schema: ConfigSchema}])],
    controllers: [ConfigController],
    providers: [ConfigService],
})
export class ConfigModule {}
