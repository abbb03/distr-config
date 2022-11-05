import { Config } from '../../config.schema';

export const configStub = (): Config => {
    return {
        data: {
            name: 'testname',
            isTest: true
        },
        version: 1
    }
}
