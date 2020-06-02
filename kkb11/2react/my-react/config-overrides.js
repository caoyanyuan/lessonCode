//根目录创建config-overrides.js 
const { override, fixBabelImports } = require("customize-cra");
const { addDecoratorsLegacy } = require("customize-cra");

module.exports = override( 
    fixBabelImports("import", 
        { 
            libraryName: "antd", 
            libraryDirectory: "es", 
            style: "css"
        }
    ),
    addDecoratorsLegacy()
);