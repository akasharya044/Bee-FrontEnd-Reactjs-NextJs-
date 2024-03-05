//hive/services/auth.services.ts
import axios from 'axios';
export class AuthService {
  login(username: string, password: string): boolean {
    // Mock authentication logic
    return username === 'valethi' && password === 'hiveconnect';
  }
}
