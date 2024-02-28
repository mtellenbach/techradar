import {Organisation} from "./organisation.type";

export interface User {
    _id: string;
    username: string | null;
    email: string | null;
    user_id: string;
    role: string;
    organisation_id: Organisation | null;
    organisation: Organisation | null;
}
