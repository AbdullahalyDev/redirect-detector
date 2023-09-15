import commander from "commander";
import lodash from "lodash";
import axios from "axios";
import colors from "colors";
import { createStream } from "table";

import config from "./config";

import UrlHelpers from "./helpers/url.helper";

const application = commander.program;

application.name("redirect-detector");
application.description(
  "this project let you check if the url have redirect link"
);
application.version("0.0.1");

application.argument("url", "url to check it");

application.option("-m --method <method>", "method of request");
application.option(
  "-r --redirects <number>",
  "number of max redirects",
  Number.parseInt
);

application.action(async function (argument, options) {
  const url = UrlHelpers.isUrl(argument);
  if (!url) {
    console.log("invalid url format, may you forgot the proctol");
    return;
  }

  const stream = createStream({
    columnCount: 1,
    columnDefault: { width: 62 },
  });

  const request = await axios
    .get(argument, {
      method: options.method ?? config.method,
      maxRedirects: options.redirects ?? config.redirects,
      headers: {
        "User-Agent": config.agent,
      },
      beforeRedirect: async function (record, response) {
        if (lodash(response.headers).has("location")) {
          stream.write([record.href]);
        }
      },
      validateStatus: function () {
        return true;
      },
    })
    .catch(function (error) {
      if (!error.message.includes("redirects")) {
        console.log();
        console.log("request error:", error.message);
      }
    });

  console.log();
  console.log(
    colors.yellow("WARNING:"),
    "dont enter any unkown links for your safe"
  );
  console.log(
    colors.yellow("WARNING:"),
    'be carefull with unsecured protocols like "http"'
  );
});

application.parse(process.argv);
