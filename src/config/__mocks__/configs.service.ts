import { configStub } from '../test/stubs/config.stub';

export const ConfigsService = jest.fn().mockReturnValue({
    create: jest.fn().mockReturnValue(configStub())
});
