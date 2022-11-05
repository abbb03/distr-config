import { ConfigDto } from '../../config.dto';
import { configStub } from './config.stub';

export const configDtoStub = (service?: string): ConfigDto => {
    return {
        service: service ? service : 'Test',
        data: configStub().data
    }
}
