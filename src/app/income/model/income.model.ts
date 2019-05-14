interface UserObject {
  description: string;
  ammount: number;
  type: string;
  uid?: string;
}

export class Income {
  [x: string]: any;
  description: string;
  ammount: number;
  type: string;
  uid?: string;

  constructor( obj: UserObject ) {
    this.description = obj && obj.description || null;
    this.ammount     = obj && obj.ammount     || null;
    this.type        = obj && obj.type        || null;
  }

}
