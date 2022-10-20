import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Mixed } from "mongoose";

export type ConfigDocument = Config & Document;

@Schema()
export class Config {
    @Prop({ type: String, unique : true, required: true, dropDups: true })
    service: string;

    @Prop({ required: true, type: mongoose.Schema.Types.Mixed })
    data: Mixed;
}

export const ConfigSchema = SchemaFactory.createForClass(Config);