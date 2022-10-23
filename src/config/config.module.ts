import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Config, ConfigSchema } from './config.schema';
import { ConfigService } from './config.service';

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
    providers: [ConfigService],
    exports: [ConfigService]
})
export class ConfigModule {}
