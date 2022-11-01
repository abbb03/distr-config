import { configStub } from "test/config/config.stub";
import { configVersionsStub } from "./config-versions.stub";

export const ConfigVersionsServiceMock = jest.fn().mockReturnValue({
    update: jest.fn().mockReturnValue(configVersionsStub()),
    findLastServiceConfig: jest.fn().mockReturnValue(configStub()),
    findOneByVersion: jest.fn().mockReturnValue(configStub()),
    findAllServiceConfigs: jest.fn().mockReturnValue([configStub()]),
    findConfigVersionsDocument: jest.fn().mockReturnValue(configVersionsStub())
});