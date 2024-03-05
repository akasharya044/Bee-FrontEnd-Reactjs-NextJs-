import axios from 'axios';
import { InterceptorService } from './interceptor.service';
import { ExceptionService } from './exception.service';

export class ApiService {
  [x: string]: any;
  private interceptor = new InterceptorService();
  private exceptionHandler = new ExceptionService();

  constructor() {
    this.interceptor.applyInterceptors();
  }

  async fetchData(endpoint: string, payload?: any): Promise<any> {
    try {
      const url = `${endpoint}`;
      const response = await axios.get(url);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      this.exceptionHandler.handle(error as Error);
      // You can re-throw the error or return a default value here
    }
  }

  async fetchCountry(endpoint: string): Promise<any> {
    try {
      const url = `${endpoint}`;
      const response = await axios.get(url);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      this.exceptionHandler.handle(error as Error);
      // You can re-throw the error or return a default value here
    }
  }

  async fetchstate(endpoint: string): Promise<any> {
    try {
      const url = `${endpoint}`;
      const response = await axios.get(url);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      this.exceptionHandler.handle(error as Error);
      // You can re-throw the error or return a default value here
    }
  }

  async fetchvendorlist(endpoint: string): Promise<any> {
    try {
      const url = `${endpoint}`;
      const response = await axios.get(url);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      this.exceptionHandler.handle(error as Error);
      // You can re-throw the error or return a default value here
    }
  }
  async fetchtreelist(endpoint: string): Promise<any> {
    try {
      const url = `${endpoint}`;
      const response = await axios.get(url);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      this.exceptionHandler.handle(error as Error);
      // You can re-throw the error or return a default value here
    }
  }

  async postDatawareHouse(endpoint: string, data: any): Promise<any> {
    try {
      const url = `${endpoint}`;
      const response = await axios.post(url, data);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      this.exceptionHandler.handle(error as Error);
      // You can re-throw the error or return a default value here
    }
  }

  async postData(endpoint: string, data: any): Promise<any> {
    try {
      const url = `${endpoint}`;
      const response = await axios.post(url, data);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      this.exceptionHandler.handle(error as Error);
      // You can re-throw the error or return a default value here
    }
  }
  async patchData(endpoint: string, data: any): Promise<any> {
    try {
      const response = await axios.patch(`${endpoint}`);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      this.exceptionHandler.handle(error as Error);
      // You can re-throw the error or return a default value here
    }
  }




  async patchDataBulk(endpoint: string, payload: any): Promise<any> {
    try {
      const response = await axios.patch(endpoint, payload, {
        headers: { tenant: 'HC_1' },
      });

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      this.exceptionHandler.handle(error as Error);
      // You might want to re-throw the error or return a default value here
    }
  }
  async fetchUnitsOfMeasurement(endpoint: string): Promise<any> {
    try {
      const url = `http://20.207.68.38${endpoint}`;
      const response = await axios.get(url);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      this.exceptionHandler.handle(error as Error);
      // You can re-throw the error or return a default value here
    }
  }

  async postAttributeData(data: any): Promise<any> {
    const endpoint = '/hiveconnect/configuration/attributes'; // Specific endpoint for attribute data
    try {
      const url = `http://20.207.68.38${endpoint}`;
      const response = await this.postData(url, data);
      return response;
    } catch (error) {
      this.exceptionHandler.handle(error as Error);
      // Optionally re-throw the error or return a default value
    }
  }
  async fetchProjectTypeName(endpoint: string): Promise<any> {
    try {
      const url = `${endpoint}`;
      const response = await axios.get(url);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      this.exceptionHandler.handle(error as Error);
      // You can re-throw the error or return a default value here
    }
  }
  async postProjectName(endpoint: string, data: any): Promise<any> {
    try {
      const url = `${endpoint}`;
      const response = await axios.post(url, data);

      return response.data;
    } catch (error) {
      this.exceptionHandler.handle(error as Error);

      // Re-throw the error, or return a default value
      throw error; // Or return null; or return { success: false };
    }
  }
  async postDataUploadfile(endpoint: string, data: any): Promise<any> {
    try {
      const url = `${endpoint}`;
      const response = await axios.post(url, data);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      this.exceptionHandler.handle(error as Error);
      // You can re-throw the error or return a default value here
    }
  }
  async postDataBulkuploadProceed(endpoint: string): Promise<any> {
    try {
      const url = `${endpoint}`;
      const response = await axios.post(url);
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
