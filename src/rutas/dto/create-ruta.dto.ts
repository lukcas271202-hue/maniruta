import {
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateRutaDto {
  @IsString()
  @IsNotEmpty({ message: 'El código de la ruta es obligatorio' })
  codigo: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre de la ruta es obligatorio' })
  nombre: string;

  @IsNumber()
  @Min(0, { message: 'La tarifa no puede ser negativa' })
  tarifa: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sectores?: string[];

  @IsOptional()
  @IsInt()
  @Min(1, { message: 'La frecuencia debe ser de al menos 1 minuto' })
  frecuenciaMin?: number;

  @IsOptional()
  @IsIn(['activa', 'en_revision', 'suspendida'], {
    message: 'El estado debe ser activa, en_revision o suspendida',
  })
  estado?: string;
}