import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConfigVersions, ConfigVersionsDocument } from "src/config-versions/config-versions.schema";
import { ConfigDto } from "src/config/config.dto";
import { Config } from "src/config/config.schema";
import { ConfigService } from "src/config/config.service";

@Injectable()
export class ConfigVersionsService {
    constructor(
        @InjectModel(ConfigVersions.name) private configVersionsModel: Model<ConfigVersionsDocument>,
        private readonly configService: ConfigService
    ) {}

    async create(configDto: ConfigDto): Promise<ConfigVersionsDocument> {
        const find = await this.configVersionsModel.findOne({service: configDto.service});
        if (find) {
            throw new BadRequestException('Config for this service already exists')
        }

        let configVersions = new this.configVersionsModel();
        let config: Config = await this.configService.create(configDto);
        configVersions.service = configDto.service;
        configVersions.configs.push(config);

        return await (await this.configVersionsModel.create(configVersions)).save();
    }

    async delete(service: string): Promise<ConfigVersionsDocument> {
        const config = await this.configVersionsModel.findOne({service: service});
        if (!config) {
            throw new BadRequestException('Config not found');
        }

        const curDate = new Date();
        const difference = (config.lastUpdate.getTime() - curDate.getTime()) / (1000 * 3600);
        if (difference < 24) {
            throw new BadRequestException('Currently config is used');
        }
        return this.configVersionsModel.findOneAndDelete({service: service});
    }

    async update(configDto: ConfigDto): Promise<ConfigVersionsDocument> {
        let configVersion = await this.configVersionsModel.findOne({service: configDto.service}).exec();
        if (!configVersion) {
            throw new NotFoundException('Config not found');
        }

        let config: Config = await this.configService.create(configDto);
        configVersion.currentVersion++;
        config.version = configVersion.currentVersion;
        configVersion.lastUpdate = new Date();
        configVersion.configs.push(config);
        return this.configVersionsModel.findOneAndUpdate({service: configDto.service}, configVersion, { new: true });
    }

    async findLastServiceConfig(service: string): Promise<Config> 
    {
        const res: ConfigVersionsDocument = await this.findConfigVersionsDocument(service);
        const configLen: number = res.configs.length;
        return res.configs[configLen - 1];
    }

    async findOneByVersion(service: string, version: number): Promise<Config> {
        let configs: Config[] = await this.findAllServiceConfigs(service);
        const config = configs.find(cfg => cfg.version == version);
        if (!config) {
            throw new BadRequestException('Version not found');
        }

        return config;
    }

    async findAllServiceConfigs(service: string): Promise<Config[]> {
        let res: ConfigVersionsDocument = await this.findConfigVersionsDocument(service);
        return res.configs;
    }

    async findConfigVersionsDocument(service: string): Promise<ConfigVersionsDocument> {
        let configVersion = await this.configVersionsModel.findOne({service: service}).exec();
        if (!configVersion) {
            throw new NotFoundException('Config not found');
        }

        configVersion.lastUpdate = new Date();
        return configVersion.save();
    }

    async findAllConfigVersions(): Promise<ConfigVersionsDocument[]> {
        return this.configVersionsModel.find();
    }
}
