export class User {
  _user_id: string;
  _role: string;
  _organisation_id: string;

  public constructor(user_id: string, role: string, organisation_id: string){
    this._user_id = user_id;
    this._role = role;
    this._organisation_id = organisation_id;
  }

  public get userId(): string {
    return this._user_id;
  }

  public get role(): string {
    return this._role;
  }

  public get organisationId(): string {
    return this._organisation_id;
  }
}
