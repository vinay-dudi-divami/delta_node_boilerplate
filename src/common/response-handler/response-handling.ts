import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class ResponseService {
  // Method to send a success response
  async success(res: Response, message: string, data?: object): Promise<void> {
    const response = {
      status: HttpStatus.OK,
      message: data == null ? message : data,
    };
    res.status(HttpStatus.OK).json(response);
  }
}
