import {
  ArrayUnique,
  IsArray,
  Max,
  Min,
  MaxDate,
  IsNotEmpty,
  IsString,
  Length,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProductUpdateInput {
  @IsOptional()
  @IsString()
  @Length(1, 255, { message: 'Name must be between 1 and 255 characters' })
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0, { message: 'Price must be non-negative' })
  @Type(() => Number)
  price?: number;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  category?: string;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Stock must be non-negative' })
  @Type(() => Number)
  stock?: number;
}
