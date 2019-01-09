const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
/**
 * Initializations
 */
const app = express();

/**
 * Settings
 */

app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));

app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
    helpers: {
      test:(str)=>{
        console.log(str)
      }
    },
    extname: ".hbs"
  })
);

app.set("view engine", ".hbs");

/**
 * Middlewares
 */

// app.use(express.urlencoded({ extended: false }));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

/**
 * Routes
 *
 */
app.use(require("./routes/index"));

/**
 *
 * static files
 */

app.use(express.static(path.join(__dirname, "public")));

/**
 * server listen
 */
app.listen(app.get("port"), () => {
  console.log(`Server on port: ${app.get("port")}`);
});
