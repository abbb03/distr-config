import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Config, ConfigSchema } from "../config/config.schema";

export type ConfigVersionsDocument = ConfigVersions & Document;

@Schema()
export class ConfigVersions {
    @Prop({ type: String, unique : true, required: true })
    service: string;

    @Prop({ type: [ConfigSchema], required: true})
    configs: Config[];

    @Prop({ type: Number, required: true, default: 1 })
    currentVersion: number;

    @Prop({type: Date, required: true, default: new Date()})
    expireTime: Date;
}

export const ConfigVersionsSchema = SchemaFactory.createForClass(ConfigVersions);