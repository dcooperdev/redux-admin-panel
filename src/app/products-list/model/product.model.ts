interface UserObject {
  name: string;
  description?: string;
  observations?: string;
  size?: string;
  ammount: number;
  stock: number;
  uid?: string;
}

export class Product {
  [x: string]: any;
  name: string;
  description?: string;
  observations?: string;
  size?: string;
  ammount: number;
  stock: number;
  uid?: string;

  constructor( obj: UserObject ) {
    this.name = obj && obj.name || null;
    this.description = obj && obj.description || null;
    this.observations = obj && obj.observations || null;
    this.size = obj && obj.size || null;
    this.ammount = obj && obj.ammount || null;
    this.stock = obj && obj.stock || null;
  }

}
