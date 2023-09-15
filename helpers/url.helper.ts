import lodash from "lodash";

export default class UrlHelpers {
  static isUrl(url: string): any {
    try {
      const Url = new URL(url);

      return lodash(Url).pick([
        "host",
        "hostname",
        "href",
        "pathname",
        "protocol",
        "port",
      ]);
    } catch {
      return false;
    }
  }
}
