import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import message from '../config/message'; // Assuming this is where your message module is located

export class ErrorHandler {
  // Method to send a server error response
  async serverError(res: Response, error?: Error): Promise<void> {
    const response = {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: error?.message || null,
    };
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
  }

  // Method to send a forbidden response
  async forbidden(res: Response, message: string): Promise<void> {
    res.status(HttpStatus.FORBIDDEN).json({
      status: HttpStatus.FORBIDDEN,
      message: message,
    });
  }

  // Method to send a bad request response
  async badRequest(res: Response, message: string): Promise<void> {
    res.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message: message,
    });
  }

  // Method to send a not found response
  async notFound(res: Response, message?: string): Promise<void> {
    res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      message: message || 'Not found',
    });
  }

  // Method to send an unauthorized response
  async unauthorized(res: Response): Promise<void> {
    res.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      message: message.unauthorized, // Corrected to use message from the imported module
    });
  }

  // Method to download a file
  async download(
    res: Response,
    data: any,
    fileName: string,
    contentType: string,
    length: number,
  ): Promise<void> {
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Length', length.toString());
    res.setHeader('Content-Type', contentType);
    res.send(data);
  }
}

export default ErrorHandler; // Exporting the ErrorHandlingService class
