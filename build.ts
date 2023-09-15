import shell from "shelljs";

// build windows
shell.exec(
  "npx pkg ./dist/index.js --target node16-win-x64 --public --output ./build/win/redirect"
);

// build linux
shell.exec(
  "npx pkg ./dist/index.js --target node16-linux-x64 --public --output ./build/linux/redirect"
);

// build macos
shell.exec(
  "npx pkg ./dist/index.js --target node16-macos-x64 --public --output ./build/macos/redirect"
);
