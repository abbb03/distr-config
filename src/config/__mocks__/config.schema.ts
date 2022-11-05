import { version } from 'os';
import { ConfigDto } from '../config.dto';
import { configStub } from '../test/stubs/config.stub';

export class Config {
    data: object;
    version: number;
};

export const ConfigModel = {
    create: jest.fn((configDto: ConfigDto) => {
        return configStub();
    }),
};
