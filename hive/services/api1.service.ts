import axios from 'axios';
import { InterceptorService } from './interceptor1.service';
import { ExceptionService } from './exception.service';

export class ApiService1 {
  private interceptor = new InterceptorService();
  private exceptionHandler = new ExceptionService();
  constructor() {
    this.interceptor.applyFormDataInterceptor();
  }
  async patchData(endpoint: string, body: any): Promise<any> {
    try {
      const url = `${endpoint}`;
      const response = await axios.patch(url, body);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      this.exceptionHandler.handle(error as Error);
      // You can re-throw the error or return a default value here
    }
  }
}
