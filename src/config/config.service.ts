import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Config, ConfigDocument } from './config.schema';

@Injectable()
export class ConfigService {
    constructor(@InjectModel(Config.name) private configModel: Model<ConfigDocument>) {}

    async create(createConfig: Config): Promise<Config> {
        return await new this.configModel(createConfig).save();
    }

    async updateOne(createConfig: Config): Promise<Config> {
        let res = await this.configModel.findOneAndUpdate({service: createConfig.service}, createConfig);
        if (!res) {
            throw new NotFoundException('Config not found');
        }
        
        return res;
    }

    async findAll(): Promise<Config[]> {
        return this.configModel.find().exec();
    }

    async findOne(service: string): Promise<Config> {
        const data = await this.configModel.findOne({service: service}).exec();
        if (!data) {
            throw new NotFoundException('Config not found');
        }
        return data;
    }
}
