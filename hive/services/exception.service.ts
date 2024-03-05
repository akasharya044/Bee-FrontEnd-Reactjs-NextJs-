import axios from 'axios';
export class ExceptionService {
  handle(error: Error) {
    console.error('An error occurred:', error.message);
    throw error;
  }
}
