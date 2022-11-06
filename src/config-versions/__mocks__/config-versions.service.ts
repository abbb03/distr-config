import { ConfigDto } from '../../config/config.dto';
import { configStub } from '../../config/test/stubs/config.stub';
import { configVersionsStub } from '../test/stubs/config-versions.stub';

export const ConfigVersionsService = jest.fn().mockReturnValue({
    create: jest.fn((configDto: ConfigDto) => {
        if (configDto.service === 'Fail') {
            return undefined;
        }

        return configVersionsStub();
    }),
    delete: jest.fn((service: string) => {
        if (service === 'Fail') {
            return undefined;
        }

        return configVersionsStub();
    }),
    update: jest.fn((configDto: ConfigDto) => {
        if (configDto.service === 'Fail') {
            return undefined;
        }

        return configVersionsStub();
    }),
    findConfigVersionsDocument: jest.fn().mockReturnValue(configVersionsStub()),
    findLastServiceConfig: jest.fn().mockReturnValue(configStub()),
    findOneByVersion: jest.fn().mockReturnValue(configVersionsStub().configs.pop()),
    findAllServiceConfigs: jest.fn().mockReturnValue([configStub()])
});
