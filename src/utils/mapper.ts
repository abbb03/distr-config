import { ConfigVersionsDto } from 'src/config-versions/config-versions.dto';
import { ConfigVersions } from 'src/config-versions/config-versions.schema';
import { Config } from '../config/config.schema';

export const toConfigData = (config: Config): object => {
    const data: object = config.data;
    return data;
}

export const toConfigVersionsDto = (configVersions: ConfigVersions): ConfigVersionsDto => {
    const configVersionsDto: ConfigVersionsDto = {
        service: configVersions.service,
        data: configVersions.configs.pop().data
    };
    return configVersionsDto;
}