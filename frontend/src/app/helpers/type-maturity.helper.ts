import {Technology} from "../models/technology.type";

export interface Converted {
  type: string,
  maturity: string
}

export function typeMaturityConverter(technology: Technology): Converted {
  let converted: Converted = {
    type: "undefined",
    maturity: "undefined"
  }
  if (technology && technology.type && technology.maturity) {
    switch (technology.type.toString()) {
      case "1":
        converted.type = "Techniques";
        break;
      case "2":
        converted.type = "Tools";
        break;
      case "3":
        converted.type = "Platforms";
        break;
      case "4":
        converted.type = "Language & Frameworks";
        break;
      default:
        converted.type = "undefined";
        break;
    }

    switch (technology.maturity.toString()) {
      case "1":
        converted.maturity = "assess";
        break;
      case "2":
        converted.maturity = "trial";
        break;
      case "3":
        converted.maturity = "adopt";
        break;
      case "4":
        converted.maturity = "hold";
        break;
      default:
        converted.maturity = "undefined";
        break;
    }
  }

  return converted;
}
