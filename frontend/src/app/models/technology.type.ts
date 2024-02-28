import {ChangeLog} from "./changelog.type";

export interface Technology {
  _id: string;
  technology_id: string;
  organisation_id: string;
  user_id: string;
  name: string;
  maturity: string;
  type: string;
  description: string;
  decision: string;
  is_published: string;
  created_at: string;
  updated_at: string|null;
  deleted_at: string|null;
  changelogs: ChangeLog[]|null;
}
