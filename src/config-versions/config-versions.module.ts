import { Module } from '@nestjs/common';
import { ConfigVersionsService } from './config-versions.service';
import { ConfigVersionsController } from './config-versions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from 'src/config/config.module';
import { ConfigVersions, ConfigVersionsSchema } from './config-versions.schema';
import { handleError } from 'src/config-versions/config.error-handler';

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forFeatureAsync([{
            name: ConfigVersions.name,
            useFactory: () => {
                const schema = ConfigVersionsSchema;
                schema.post('save', handleError);
                return schema;
            }
        }]),
    ],
    providers: [ConfigVersionsService],
    controllers: [ConfigVersionsController],
})
export class ConfigVersionsModule {}
