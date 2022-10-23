import { Injectable, NotFoundException } from "@nestjs/common";
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
        const config: Config = await this.configService.create(configDto);

        let configVersions: ConfigVersionsDocument = new this.configVersionsModel();
        configVersions.service = configDto.service;
        configVersions.configs.push(config);

        return (await this.configVersionsModel.create(configVersions)).save();
    }

    async update(configDto: ConfigDto): Promise<ConfigVersionsDocument> 
    {
        const configVersion = await this.configVersionsModel.findOne({service: configDto.service}).exec();
        if (!configVersion) {
            throw new NotFoundException('Service not found');
        }

        const config = await this.configService.create(configDto);

        configVersion.configs.push(config);
        return configVersion.save();
    }

    async findAll(): Promise<ConfigVersionsDocument[]> {
        return this.configVersionsModel.find();
    }

    async findOneLast(service: string): Promise<Config> 
    {
        let res: ConfigVersionsDocument= await this.configVersionsModel.findOne({service: service});
        if (!res) {
            throw new NotFoundException('Service not found');
        }

        const config: Config = res.configs.pop();        
        return config;
    }
}
