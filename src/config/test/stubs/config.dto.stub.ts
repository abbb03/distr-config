import { ConfigDto } from "../../config.dto";
import { configStub } from "./config.stub";

export const configDtoStub = (): ConfigDto => {
    return {
        service: 'Test',
        data: configStub().data
    }
}
