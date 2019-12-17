const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const SassLintPlugin = require("sass-lint-webpack");
const TSLintPlugin = require("tslint-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (rootPath) => {
  const devMode = process.env.WEBPACK_DEV_SERVER === "true";

  const aliases = {
    "react-redux": path.join(rootPath, "node_modules/react-redux"),
    "yup": path.join(rootPath, "node_modules/yup"),
    "formik": path.join(rootPath, "node_modules/formik"),
    "@app": path.join(rootPath, "src")
  };

  const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      "template": path.join(rootPath, "src/index.html"),
      "filename": path.join(rootPath, "dist/index.html")
    }),
    new SassLintPlugin({
      configFile: ".sass-lint.yml",
      ignoreFiles: [path.join(rootPath, "./node_modules/**/*.s?(a|c)ss")]
    }),
    new TSLintPlugin({
      "files": [path.join(rootPath, "./src/**/*.ts"), path.join(rootPath, "./src/**/*.tsx")],
      "config": "./tslint.json"
    }),
    new CopyWebpackPlugin([
      {
        "from": path.join(rootPath, "node_modules/axa-utils/src/assets"),
        "to": path.join(rootPath, "dist")
      },
      {
        "from": path.join(rootPath, "src/assets"),
        "to": path.join(rootPath, "dist")
      },
      {
        "from": path.join(rootPath, "node_modules/react/umd"),
        "to": path.join(rootPath, "dist")
      },
      {
        "from": path.join(rootPath, "node_modules/react-dom/umd/react-dom.development.js"),
        "to": path.join(rootPath, "dist")
      },
      {
        "from": path.join(rootPath, "node_modules/react-dom/umd/react-dom.production.min.js"),
        "to": path.join(rootPath, "dist")
      }
    ])
  ];


  const devStyleLoaders = devMode ? [
    {
      "loader": "style-loader"
    }
  ] : [
    {
      "loader": MiniCssExtractPlugin.loader,
      "options": {
        "hmr": process.env.NODE_ENV === "development",
      },
    }
  ];

  const styleLoaders = devStyleLoaders.concat([
    {
      "loader": "css-loader",
      "options": {
        "sourceMap": true,
        "modules": false
      }
    },
    {
      "loader": "postcss-loader",
      "options": {
        "sourceMap": true,
        "config": {
          "path": "./postcss.config.js"
        }
      }
    },
    {
      "loader": "sass-loader",
      "options": { "sourceMap": true }
    }
  ]);

  if (devMode) {
    aliases["react-dom"] = "@hot-loader/react-dom"
  } else {
    plugins.push(new MiniCssExtractPlugin({
      "filename": path.join(rootPath, "dist/[name].css"),
      "chunkFilename": path.join(rootPath, "dist/[id].css"),
      "ignoreOrder": false
    }));
  }

  return {
    "context": path.join(rootPath, "src"),
    "entry": {
      "main": ["./index.tsx"]
    },
    "devtool": "eval",
    "devServer": {
      "contentBase": path.join(rootPath, "dist"),
      "hot": true,
      "stats": {
        "children": false,
        "maxModules": 0
      },
      setup(app) {
        app.post('*', (req, res) => {
            res.redirect(req.originalUrl);
        });
      }
    },
    "resolve": {
      "modules": [
        path.join(rootPath, "src"),
        "node_modules"
      ],
      "extensions": [".js", ".jsx", ".ts", ".tsx", ".json", ".scss"],
      "alias": aliases,
    },
    "module": {
      "rules": [
        {
          "test": /\.ts(x?)$/,
          "exclude": /node_modules/,
          "use": [
              {
                "loader": "ts-loader"
              }
          ]
        },
        {
          "test": /\.(js|jsx)$/,
          "exclude": /node_modules/,
          "loaders": ["react-hot-loader/webpack", "babel-loader"]
        },
        {
          "test": /\.scss$/,
          "use": styleLoaders
        },
        {
          "test": /\.html$/,
          "use": [
            {
              "loader": "html-loader"
            }
          ]
        },
        {
          "enforce": "pre",
          "test": /\.js$/,
          "loader": "source-map-loader"
        }
      ]
    },
    "optimization": {
      "minimizer": [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    "plugins": plugins,
    "output": {
      "filename": "[name].bundle.js",
      "path": path.join(rootPath, "dist"),
    },
    "externals": {
      "react": "React",
      "react-dom": "ReactDOM"
    }
  };
};
