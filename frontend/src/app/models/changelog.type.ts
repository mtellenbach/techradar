export class ChangeLog {
  _id: string;
  _changelog_id: string;
  _technology_id: string;
  _version_increment: string;
  _created_at: string;

  public constructor(id: string, changelog_id: string, technology_id: string, version_increment: string, created_at: string){
    this._id = id;
    this._changelog_id = changelog_id;
    this._technology_id = technology_id;
    this._version_increment = version_increment;
    this._created_at = created_at;
  }

  public get id(): string {
    return this._id;
  }

  public get changelogId(): string {
    return this._changelog_id;
  }

  public get technologyId(): string {
    return this._technology_id;
  }

  public get versionIncrement(): string {
    return this._version_increment;
  }

  public get createdAt(): string {
    return this._created_at;
  }
}
