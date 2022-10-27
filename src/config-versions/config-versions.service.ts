import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConfigVersions, ConfigVersionsDocument } from "src/config-versions/config-versions.schema";
import { ConfigDto } from "src/config/config.dto";
import { Config } from "src/config/config.schema";
import { ConfigService } from "src/config/config.service";
import { hoursToMillis } from "src/utils/toMillis";

@Injectable()
export class ConfigVersionsService {
    private readonly expirationTime: number = hoursToMillis(24);

    constructor(
        @InjectModel(ConfigVersions.name) private configVersionsModel: Model<ConfigVersionsDocument>,
        private readonly configService: ConfigService,
    ) {}

    async create(configDto: ConfigDto): Promise<ConfigVersionsDocument> {
        const find = await this.configVersionsModel.findOne({service: configDto.service});
        if (find) {
            throw new BadRequestException('The config for this service already exists')
        }

        let configVersions: ConfigVersionsDocument = new this.configVersionsModel();
        let config: Config = await this.configService.create(configDto);
        this.setExpireTime(configVersions);
        
        configVersions.service = configDto.service;
        configVersions.configs.push(config);

        return await (await this.configVersionsModel.create(configVersions)).save();
    }

    async delete(service: string): Promise<ConfigVersionsDocument> {
        const config: ConfigVersionsDocument = await this.configVersionsModel.findOne({service: service});
        if (!config) {
            throw new BadRequestException('Config not found');
        }

        const curDate: Date = new Date();
        const isUsed: boolean = curDate.getTime() > config.expireTime.getTime();
        if (!isUsed) {
            throw new BadRequestException('Currently config is used');
        }
        return this.configVersionsModel.findOneAndDelete({service: service});
    }

    async update(configDto: ConfigDto): Promise<ConfigVersionsDocument> {
        let configVersionDoc: ConfigVersionsDocument = await this.configVersionsModel.findOne({service: configDto.service}).exec();
        if (!configVersionDoc) {
            throw new NotFoundException('Config not found');
        }

        let config: Config = await this.configService.create(configDto);
        configVersionDoc.currentVersion++;
        config.version = configVersionDoc.currentVersion;

        this.setExpireTime(configVersionDoc);
        
        configVersionDoc.configs.push(config);
        return this.configVersionsModel.findOneAndUpdate({service: configDto.service}, configVersionDoc, { new: true });
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

        this.setExpireTime(configVersion);

        return configVersion.save();
    }

    private setExpireTime(configVersions: ConfigVersionsDocument) {
        const expireTime: number = new Date().getTime() + this.expirationTime;
        configVersions.expireTime.setTime(expireTime);
    }
}
