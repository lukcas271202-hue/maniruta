import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Ruta } from './entities/ruta.entity.js';
import { CreateRutaDto } from './dto/create-ruta.dto.js';
import { UpdateRutaDto } from './dto/update-ruta.dto.js';

@Injectable()
export class RutasService {
  constructor(
    @InjectModel(Ruta.name) private readonly rutaModel: Model<Ruta>,
  ) {}

  async create(createRutaDto: CreateRutaDto) {
    return this.rutaModel.create(createRutaDto);
  }

  async findAll() {
    return this.rutaModel.find();
  }

  async findOne(id: string) {
    this.validarId(id);
    const ruta = await this.rutaModel.findById(id);
    if (!ruta) {
      throw new NotFoundException(`No existe una ruta con el id ${id}`);
    }
    return ruta;
  }

  async update(id: string, updateRutaDto: UpdateRutaDto) {
    this.validarId(id);
    const ruta = await this.rutaModel.findByIdAndUpdate(id, updateRutaDto, {
      returnDocument: 'after',
      runValidators: true,
    });
    if (!ruta) {
      throw new NotFoundException(`No existe una ruta con el id ${id}`);
    }
    return ruta;
  }

  async remove(id: string) {
    this.validarId(id);
    const ruta = await this.rutaModel.findByIdAndDelete(id);
    if (!ruta) {
      throw new NotFoundException(`No existe una ruta con el id ${id}`);
    }
    return { mensaje: `La ruta ${ruta.nombre} fue eliminada`, ruta };
  }

  private validarId(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`"${id}" no es un id válido`);
    }
  }
}