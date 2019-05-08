interface UserObject {
  uid: string;
  name: string;
  email: string;
}

export class User {
  public uid: string;
  public name: string;
  public email: string;

  constructor( obj: UserObject ) { // if exist obj then asign obj.property(uid, name, email) or if not exist assign null
    this.uid = obj && obj.uid || null;
    this.name = obj && obj.name || null;
    this.email = obj && obj.email || null;
  }

}
