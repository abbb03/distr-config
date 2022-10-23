import { Mixed } from "mongoose";
import { Config, ConfigDocument } from "src/config/config.schema";

export const toConfigData = (config: Config): Mixed => {
    const data: Mixed = config.data;
    return data;
}
