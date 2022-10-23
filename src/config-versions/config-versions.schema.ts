import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Config, ConfigSchema } from "../config/config.schema";

export type ConfigVersionsDocument = ConfigVersions & Document;

@Schema()
export class ConfigVersions {
    @Prop({ type: String, unique : true, required: true, dropDups: true })
    service: string;

    @Prop({ type: [ConfigSchema], required: true})
    configs: Config[];
}

export const ConfigVersionsSchema = SchemaFactory.createForClass(ConfigVersions);