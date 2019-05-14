import { OperatorFunction } from 'rxjs';

interface UserObject {
  description: string;
  ammount: number;
  type: string;
  uid?: string;
}

export class Income {

  description: string;
  ammount: number;
  type: string;
  uid?: string;

  constructor( obj: UserObject ) {
    this.description = obj && obj.description || null;
    this.ammount     = obj && obj.ammount     || null;
    this.type        = obj && obj.type        || null;
    // this.uid         = obj && obj.uid         || null;
  }

}
