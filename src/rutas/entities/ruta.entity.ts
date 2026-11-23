import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Ruta extends Document {
  @Prop({ required: true, trim: true, uppercase: true })
  codigo: string;

  @Prop({ required: true, trim: true })
  nombre: string;

  @Prop({ required: true, min: [0, 'La tarifa no puede ser negativa'] })
  tarifa: number;

  @Prop({ type: [String], default: [] })
  sectores: string[];

  @Prop({ default: 12, min: [1, 'La frecuencia debe ser de al menos 1 minuto'] })
  frecuenciaMin: number;

  @Prop({
    default: 'activa',
    enum: {
      values: ['activa', 'en_revision', 'suspendida'],
      message: 'El estado debe ser activa, en_revision o suspendida',
    },
  })
  estado: string;
}

export const RutaSchema = SchemaFactory.createForClass(Ruta);