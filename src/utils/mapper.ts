import { Config } from 'src/config/config.schema';

export const toConfigData = (config: Config): object => {
    const data: object = config.data;
    return data;
}
