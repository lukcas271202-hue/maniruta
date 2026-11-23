import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RutasController } from './rutas.controller.js';
import { RutasService } from './rutas.service.js';
import { Ruta, RutaSchema } from './entities/ruta.entity.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ruta.name, schema: RutaSchema }]),
  ],
  controllers: [RutasController],
  providers: [RutasService],
})
export class RutasModule {}