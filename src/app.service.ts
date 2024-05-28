import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Returns a greeting message.
   * @returns A Promise resolving to a string representing the greeting message.
   */
  async getHello() {
    return 'hello world !';
  }
}
