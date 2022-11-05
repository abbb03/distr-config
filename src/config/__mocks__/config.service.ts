import { configStub } from '../test/stubs/config.stub';

export const ConfigService = jest.fn().mockReturnValue({
    create: jest.fn().mockReturnValue(configStub())
});
