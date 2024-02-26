import {ChangeLog} from "./changelog.type";

export class Technology {
  _id: string;
  _technology_id: string;
  _organisation_id: string;
  _user_id: string;
  _name: string;
  _maturity: string;
  _type: string;
  _description: string;
  _is_published: string;
  _created_at: string;
  _updated_at: string|null;
  _deleted_at: string|null;
  _changelogs: Array<ChangeLog>;

  public constructor(id: string,
                     technology_id: string,
                     organisation_id: string,
                     user_id: string,
                     name: string,
                     maturity: string,
                     type: string,
                     description: string,
                     is_published: string,
                     created_at: string,
                     updated_at: string,
                     deleted_at: string,
                     changelogs: Array<ChangeLog>
  ){
    this._id = id;
    this._technology_id = technology_id;
    this._organisation_id = organisation_id;
    this._user_id = user_id;
    this._name = name;
    this._maturity = maturity;
    this._type = type;
    this._description = description;
    this._is_published = is_published;
    this._created_at = created_at;
    this._updated_at = updated_at;
    this._deleted_at = deleted_at;
    this._changelogs = changelogs;
  }
}
