import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductNotFoundException extends HttpException {
  constructor(productId: string) {
    super(`Product with ID ${productId} not found`, HttpStatus.NOT_FOUND);
    this.name = 'ProductNotFoundException';
  }
}

export class ProductAlreadyExistsException extends HttpException {
  constructor(productName: string) {
    super(`Product with name "${productName}" already exists`, HttpStatus.CONFLICT);
    this.name = 'ProductAlreadyExistsException';
  }
}

