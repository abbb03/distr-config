import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, InternalServerErrorException, Patch, Post, Put, Query, Req, UseInterceptors } from '@nestjs/common';
import { ConfigDto } from '../config/config.dto';
import { ConfigVersions, ConfigVersionsDocument } from './config-versions.schema';
import { ConfigVersionsService } from './config-versions.service';
import * as mapper from '../utils/mapper';

@Controller('config')
export class ConfigVersionsController {
    constructor(private configVersionsService: ConfigVersionsService) {}

    @Get()
    async find(@Query('service') service: string, @Query('v') version: number): Promise<object> 
    {
        if (!service) {
            throw new BadRequestException('Service not specified');
        }
        if (version) {
            return mapper.toConfigData(await this.configVersionsService.findOneByVersion(service, version));
        }

        return mapper.toConfigData(await this.configVersionsService.findLastServiceConfig(service));
    }

    @Patch()
    async update(@Body() configDto: ConfigDto): Promise<string> {
        let res: ConfigVersions = await this.configVersionsService.update(configDto);
        if (!res) {
            throw new InternalServerErrorException();
        }

        return 'Config for service ' + configDto.service + ' updated';
    }

    @Post()
    async create(@Body() configDto: ConfigDto): Promise<string> {
        if (!configDto.service) {
            throw new BadRequestException('Service not specified');
        }
        if (!configDto.data) {
            throw new BadRequestException('Data not specified');
        }
        
        const res: ConfigVersions = await this.configVersionsService.create(configDto);
        if (!res) {
            throw new InternalServerErrorException();
        }

        return 'Config for service ' + configDto.service + ' created';
    }

    @Delete()
    async delete(@Query('service') service: string): Promise<string> {
        let res: ConfigVersions = await this.configVersionsService.delete(service);
        if (!res) {
            throw new InternalServerErrorException();
        }

        return 'Config for service ' + service + ' deleted';
    }
}
