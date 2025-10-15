import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';


export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

export class QueryOptionsDto {
  @IsOptional()
  @Type(()=>Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(()=> Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  sortBy?: string = 'createdAt';

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.DESC;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  search?: string;
}
