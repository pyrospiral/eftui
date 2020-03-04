const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// MODE
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const IS_DEVELOPMENT = !IS_PRODUCTION;
process.env.BABEL_ENV = "development";

// LOADERS
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

// SET CONFIG TO ENV FOR APP TO USE
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
    BASE_URI: "/appcenter/Cisco/" + appJson.appid + "/api", // for backend query
    BASE_NATIVE_URI: "/api" // for apic query
  }
};
if (IS_DEVELOPMENT) {
  env = {
    ...env,
    endpointConfig: {
      BASE_URI: "/appcenter/Cisco/" + appJson.appid + "/api", // for backend query
      BASE_NATIVE_URI: "/api", // for apic query
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

// RESOLVE
const resolve = {
  extensions: [".js", ".jsx"],
  modules: [path.resolve(__dirname), "node_modules", "bower_components"],
  symlinks: false // This is required from webpack to exclude linked modules together with node_modules (e.g. eslint won't analyse these modules)
};

// DEV SERVER
const proxyConfig = {
  changeOrigin: true,
  secure: false,
  logLevel: "debug"
};

const devServer = {
  port: 8080,
  hot: true,
  historyApiFallback: true,
  proxy: {
    [env.endpointConfig.BASE_URI]: Object.assign({}, proxyConfig, {
      target:
        devConfig.backend.prot + devConfig.backend.ip + devConfig.backend.port
    }),
    [env.endpointConfig.BASE_NATIVE_URI]: Object.assign({}, proxyConfig, {
      target: devConfig.apic.prot + devConfig.apic.ip
    })
  }
};

module.exports = {
  mode: process.env.NODE_ENV,
  target: "web",
  devtool: "cheap-module-source-map",
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "index.js"
  },
  devServer,
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
  resolve,
  module: {
    rules
  }
};
