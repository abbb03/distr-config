import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigVersions, ConfigVersionsDocument } from './config-versions.schema';
import { ConfigDto } from '../config/config.dto';
import { Config } from '../config/config.schema';
import { ConfigsService } from '../config/configs.service';

@Injectable()
export class ConfigVersionsService {
    constructor(
        @InjectModel(ConfigVersions.name) private configVersionsModel: Model<ConfigVersionsDocument>,
        private readonly configService: ConfigsService,
    ) {}

    async create(configDto: ConfigDto): Promise<ConfigVersions> {
        const find: ConfigVersionsDocument = await this.configVersionsModel.findOne({service: configDto.service});
        if (find) {
            throw new BadRequestException('The config for this service already exists');
        }

        const config: Config = await this.configService.create(configDto);

        const configVersions = await this.configVersionsModel.create({service: configDto.service });
        configVersions.configs.push(config);
        configVersions.updateExpireTime();
        configVersions.markModified('expireDate');
        return configVersions.save();
    }

    async delete(service: string): Promise<ConfigVersions> {
        const config: ConfigVersionsDocument = await this.configVersionsModel.findOne({service: service});
        if (!config) {
            throw new NotFoundException('Config not found');
        }

        const curDate: Date = new Date();
        const isUsed: boolean = curDate.getTime() > config.expireDate.getTime();
        if (!isUsed) {
            throw new BadRequestException('Currently config is used');
        }
        return this.configVersionsModel.findOneAndDelete({service: service});
    }

    async update(configDto: ConfigDto): Promise<ConfigVersions> {
        let configVersionDoc: ConfigVersionsDocument = await this.configVersionsModel.findOne({service: configDto.service});
        if (!configVersionDoc) {
            throw new NotFoundException('Config not found');
        }

        let config: Config = await this.configService.create(configDto);
        configVersionDoc.incVersion();
        config.version = configVersionDoc.currentVersion;
        configVersionDoc.configs.push(config);
        configVersionDoc.updateExpireTime();
        
        return this.configVersionsModel.findOneAndUpdate({service: configDto.service}, configVersionDoc, { new: true });
    }

    async findLastServiceConfig(service: string): Promise<Config> 
    {
        const res: ConfigVersions = await this.findConfigVersionsDocument(service);
        return res.configs.pop();
    }

    async findOneByVersion(service: string, version: number): Promise<Config> {
        let configs: Config[] = await this.findAllServiceConfigs(service);
        const config = configs.find(cfg => cfg.version == version);
        if (!config) {
            throw new NotFoundException('Version not found');
        }

        return config;
    }

    async findAllServiceConfigs(service: string): Promise<Config[]> {
        let res: ConfigVersions = await this.findConfigVersionsDocument(service);
        return res.configs;
    }

    async findConfigVersionsDocument(service: string): Promise<ConfigVersions> {
        let configVersion: ConfigVersions = await this.configVersionsModel.findOne({service: service});
        if (!configVersion) {
            throw new NotFoundException('Config not found');
        }

        configVersion.updateExpireTime();
        return configVersion;
    }
}
