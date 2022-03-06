require("dotenv").config();
const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const uuid = require("uuid").v4;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const flash = require("connect-flash");
const env = require("./env");

const { fileRoute } = require("./routes/file");
const { cartRoute } = require("./routes/cart");
const { productRoute } = require("./routes/product");
const { orderRoute } = require("./routes/order");
const { coreRoute } = require("./routes/core");
const { settingRoute } = require("./routes/setting");

const port = env.port;
const dev = env.nodeEnv !== "production";
console.log("*********************************");
console.log("dev:", dev);
console.log("port:", port);
console.log("env:", env.nodeEnv);
console.log("isProduction:", env.nodeEnv === "production");
console.log("database:", env.databaseUrl);
console.log("serverUrl:", env.serverUrl);
console.log("*********************************");

const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

mongoose
  .connect(env.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected mongo success");
  })
  .catch((error) => {
    console.log("connected mongo failed", error);
  });

nextApp.prepare().then(() => {
  const app = express();

  app.use(cors({ credentials: true, origin: true }));
  app.use(bodyParser.json({}));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(
    session({
      secret: "ADMIN_SECRET",
      resave: false,
      saveUninitialized: false,
      cookie: {
        path: "/",
        httpOnly: true,
        secure: false,
        maxAge: 360000000,
      },
    })
  );
  app.use(flash());

  app.use(function (req, res, next) {
    const token = req.cookies.token;
    if (token === undefined) {
      res.cookie("token", uuid(), { maxAge: 9000000, httpOnly: true });
    }
    next();
  });

  app.use(fileRoute);
  app.use(cartRoute);
  app.use(productRoute);
  app.use(orderRoute);
  app.use(coreRoute);
  app.use(settingRoute);
  require("./routes/auth")({ app });
  require("./routes/product/index")({ app, di: { mongoose } });

  app.use((error, req, res, next) => {
    if (error) {
      return res.status(400).send(error);
    }

    next();
  });

  app.all("*", (req, res) => {
    return handle(req, res);
  });

  app.listen(port, () => {
    console.log(`Ready on ${env.serverUrl}:${port}`);
  });
});
