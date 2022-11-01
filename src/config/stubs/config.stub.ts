import { Config } from 'src/config/config.schema'

export const configStub = (): Config => {
    return {
        data: {
            name: 'testname',
            isTest: true
        },
        version: 1
    }
}
