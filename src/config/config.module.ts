import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Config, ConfigSchema } from './config.schema';
import { ConfigsService } from './configs.service';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([{
            name: Config.name,
            useFactory: () => {
                const schema = ConfigSchema;
                return schema;
            }
        }])
    ],
    providers: [ConfigsService],
    exports: [ConfigsService]
})
export class ConfigModule {}
