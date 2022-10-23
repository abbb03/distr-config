import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigDto } from './config.dto';
import { Config, ConfigDocument } from './config.schema';

@Injectable()
export class ConfigService {
    constructor(@InjectModel(Config.name) private configModel: Model<ConfigDocument>) {}

    async create(createConfig: ConfigDto): Promise<Config> {
        let config: Config = new this.configModel();
        config.data = createConfig.data;
        return config;
    }
}
