const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

process.env.NODE_ENV = "development";

const IS_PRODUCTION = process.env.NODE_ENV === "production";
const IS_DEVELOPMENT = !IS_PRODUCTION;

let getCSSLoaders = () => {
  const loaders = [];
  loaders.push({
    loader: "style-loader"
  });

  const cssLoaderConfig = {
    loader: "css-loader",
    options: {
      modules: true,
      localIdentName: "[local]"
    }
  };
  loaders.push(cssLoaderConfig);
  loaders.push({
    loader: "sass-loader",
    options: { sourceMap: IS_DEVELOPMENT }
  });

  return loaders;
};

const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: ["babel-loader", "eslint-loader"]
  },
  {
    test: /\.s?css$/,
    use: getCSSLoaders()
  }
];

// Loader for all external files (e.g. font or image files)
rules.push({
  test: /\.(woff|woff2|eot|ttf|jpg|png|svg)$/,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "static/[name]-[hash].[ext]"
      }
    }
  ]
});

const appJson = JSON.parse(fs.readFileSync("./app.json", "utf-8"));
const devConfig = JSON.parse(fs.readFileSync("./devConfig.json", "utf-8"));
// With production code, the app runs on APIC itself as an appCenter app.
// With development code, the app runs on outside of APIC.
let env = {
  production: IS_PRODUCTION,
  development: IS_DEVELOPMENT,
  appConfig: {
    APP_ID: appJson.appid,
    SIGNATURE: appJson.signature,
    NAME: appJson.name,
    TITLE: appJson.title,
    VERSION: appJson.version
  },
  endpointConfig: {
    BASE_URI: "/appcenter/Cisco/" + appJson.appid + "/", // for backend query
    BASE_NATIVE_URI: "/api" // for apic query
  }
};
if (IS_DEVELOPMENT) {
  env = {
    ...env,
    endpointConfig: {
      BASE_URI: "/backendProxy",
      BASE_NATIVE_URI: "/apicProxy",
      USERNAME: devConfig.apic.username,
      PASSWORD: devConfig.apic.password
    }
  };
}

// env is exposed via js file.  @see endpoint.js url construction
fs.writeFileSync(
  "./src/components/appEnv.js",
  "const ENV = ".concat(JSON.stringify(env), "; export {ENV};"),
  { flag: "w+" }
);

module.exports = {
  mode: "development",
  target: "web",
  devtool: "cheap-module-source-map",
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    stats: "minimal",
    overlay: true,
    historyApiFallback: true,
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules
  }
};
