import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Config, ConfigDocument } from './config.schema';

@Injectable()
export class ConfigService {
    constructor(@InjectModel(Config.name) private configModel: Model<ConfigDocument>) {}

    async create(createConfig): Promise<Config> {
        const createdConfig = new this.configModel(createConfig);
        return createdConfig.save();
    }

    async findAll(): Promise<Config[]> {
        return this.configModel.find().exec();
    }

    // async findOne(): Promise<Config> {
    //     return this.configModel.find().exec();
    // }
}
