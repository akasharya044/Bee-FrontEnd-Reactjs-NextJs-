import axios from 'axios';

export class InterceptorService {
  interceptHeaders(isFormData: boolean) {
    if (isFormData) {
      // For FormData, do not set 'Content-Type'; let the browser handle it
      return {
        'X-Custom-Header': 'SampleValue',
        tenant: 'HC_1',
      };
    } else {
      // For other requests, set 'Content-Type' to 'application/json'
      return {
        'X-Custom-Header': 'SampleValue',
        tenant: 'HC_1',
        'Content-Type': 'application/json',
      };
    }
  }

  applyInterceptors() {
    axios.interceptors.request.use(
      (config) => {
        // Check if the data is FormData (for file uploads)
        const isFormData = config.data instanceof FormData;

        // Ensure config.headers exists
        config.headers = config.headers || {};

        // Append custom headers based on the type of data
        Object.assign(config.headers, this.interceptHeaders(isFormData));

        return config;
      },
      (error) => {
        // Handle errors
        return Promise.reject(error);
      }
    );
  }
}
