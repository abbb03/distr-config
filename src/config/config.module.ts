import { BadRequestException, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigController } from './config.controller';
import { handleE11000 } from './config.error-handler';
import { Config, ConfigSchema } from './config.schema';
import { ConfigService } from './config.service';

@Module({
    imports: [MongooseModule.forFeatureAsync([{
        name: Config.name,
        useFactory: () => {
            const schema = ConfigSchema;
            schema.post('save', handleE11000);
            return schema;
        }
    }])],
    controllers: [ConfigController],
    providers: [ConfigService],
})
export class ConfigModule {}
