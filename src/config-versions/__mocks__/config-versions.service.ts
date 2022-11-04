import { configStub } from "../../config/test/stubs/config.stub";
import { configVersionsStub } from "../test/stubs/config-versions.stub";

export const ConfigVersionsService = jest.fn().mockReturnValue({
    create: jest.fn().mockReturnValue(configVersionsStub()),
    delete: jest.fn().mockReturnValue(configVersionsStub()),
    update: jest.fn().mockReturnValue(configVersionsStub()),
    findConfigVersionsDocument: jest.fn().mockReturnValue(configVersionsStub()),
    findLastServiceConfig: jest.fn().mockReturnValue(configStub()),
    findOneByVersion: jest.fn().mockReturnValue(configVersionsStub().configs.pop()),
    findAllServiceConfigs: jest.fn().mockReturnValue([configStub()])
});
