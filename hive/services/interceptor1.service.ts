import axios from 'axios';

export class InterceptorService {
  interceptHeadersJson() {
    return {
      'X-Custom-Header': 'SampleValue',
      'tenant': 'HC_1',
      'Content-Type': 'application/json',
    };
  }

  interceptHeadersFormData() {
    return {
      'X-Custom-Header': 'SampleValue',
      'tenant': 'HC_1',
      'Content-Type': 'multipart/form-data',
    };
  }

  applyJsonInterceptor() {
    axios.interceptors.request.use(config => {
      // Ensure config.headers exists
      config.headers = config.headers || {};
      // Append custom headers for JSON
      Object.assign(config.headers, this.interceptHeadersJson());
      return config;
    }, error => {
      // Handle request error here
      return Promise.reject(error);
    });
  }

  applyFormDataInterceptor() {
    axios.interceptors.request.use(config => {
      // Ensure config.headers exists
      config.headers = config.headers || {};
      // Append custom headers for FormData
      Object.assign(config.headers, this.interceptHeadersFormData());
      return config;
    }, error => {
      // Handle request error here
      return Promise.reject(error);
    });
  }
}
