import {Technology} from "../models/technology.type";
import {typeMaturityConverter} from "./type-maturity.helper";

describe('typeMaturityConverter', () => {
  it('should convert', () => {
    const technology: Technology = {
      _id: "",
      changelogs: null,
      created_at: "",
      decision: "",
      deleted_at: null,
      description: "",
      is_published: "",
      organisation_id: "",
      technology_id: "",
      updated_at: null,
      user_id: "",
      name: "test",
      type: "2",
      maturity: "3"
    };
    const expectedType: string = "Platforms";
    const expectedMaturity: string = "adopt";

    const result = typeMaturityConverter(technology);
    expect(expectedType).toBe(result.type);
    expect(expectedMaturity).toBe(result.maturity)
  });
});
