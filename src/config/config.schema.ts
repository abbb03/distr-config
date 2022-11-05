import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Mixed } from 'mongoose';

export type ConfigDocument = Config & Document;

@Schema()
export class Config {
    @Prop({ required: true, type: mongoose.Schema.Types.Mixed })
    data: object;

    @Prop({ type: Number, default: 1})
    version: number;
}

export const ConfigSchema = SchemaFactory.createForClass(Config);