import { Config } from "src/config/config.schema";

export const toConfigData = (config: Config) => {
    const data = config.data;
    return data;
}
