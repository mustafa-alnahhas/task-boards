import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
/* 
  This service generates a random string that will be used when creating the id.
  Used to avoid dealing with creating null with json-server.
*/
export class IdGeneratorService {
  generateId(): string {
    // Timestamp (13 digits)
    const timestamp = Date.now().toString();
    
    // Random component (9 digits)
    const random = Math.floor(Math.random() * 1e9).toString().padStart(9, '0');
    
    // Combine with separator
    return `${timestamp}-${random}`;
  }
}