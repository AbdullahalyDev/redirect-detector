import commander from "commander";
import lodash from "lodash";
import axios from "axios";

import config from "./config";

import UrlHelpers from "./helpers/url.helper";

const application = commander.program;

application.name("redirect-detector");
application.description(
  "this project let you check if the url have redirect link"
);
application.version("0.0.1");

application.argument("url", "url to check it");

application.action(async function (argument) {
  const url = UrlHelpers.isUrl(argument);
  if (!url) {
    console.log("invalid url format, may you forgot the proctol");
    return;
  }

  const request = await axios
    .get(argument, {
      method: "GET",
      maxRedirects: 0,
      headers: {
        "User-Agent": config.agent,
      },
      validateStatus: function () {
        return true;
      },
    })
    .catch(function (error) {
      console.log("request error:", error.message);
    });

  if (!request) {
    return;
  }

  if (
    !(
      lodash(request.headers).has("location") &&
      lodash(request.status).inRange(300, 308)
    )
  ) {
    console.log("link not include any redirect headers");
  }

  console.log("redirect header detected");
  console.log(request.headers.location);
});

application.parse(process.argv);
