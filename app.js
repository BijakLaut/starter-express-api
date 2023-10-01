var bodyParser = require("body-parser");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
var cors = require("cors");

var dashboardRouter = require("./app/dashboard/router.js");
var categoryRouter = require("./app/category/router.js");
var nominalRouter = require("./app/nominal/router.js");
var voucherRouter = require("./app/voucher/router.js");
var bankRouter = require("./app/bank/router.js");
var paymentRouter = require("./app/payment/router.js");
var usersRouter = require("./app/users/router.js");
var transactionRouter = require("./app/transaction/router.js");
var playerRouter = require("./app/player/router.js");
var authRouter = require("./app/auth/router.js");

var app = express();
const URL = "/api/v1";
// CORS
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
   session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      cookie: {},
   })
);
app.use(flash());
app.use(methodOverride("_method"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
   "/adminlte/",
   express.static(path.join(__dirname, "/node_modules/admin-lte/"))
);
app.use(bodyParser.urlencoded({ extended: false }));

// Method override with form input
app.use(
   methodOverride(function (req, res) {
      if (req.body && typeof req.body === "object" && "_method" in req.body) {
         // look in urlencoded POST bodies and delete it
         var method = req.body._method;
         delete req.body._method;
         return method;
      }
   })
);

app.use("/", usersRouter);
app.use("/dashboard", dashboardRouter);
app.use("/category", categoryRouter);
app.use("/nominal", nominalRouter);
app.use("/voucher", voucherRouter);
app.use("/bank", bankRouter);
app.use("/payment", paymentRouter);
app.use("/transaction", transactionRouter);

// API
app.use(`${URL}/players`, playerRouter);
app.use(`${URL}/auth`, authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
   next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
   // set locals, only providing error in development
   res.locals.message = err.message;
   res.locals.error = req.app.get("env") === "development" ? err : {};

   // render the error page
   res.status(err.status || 500);
   res.render("error");
});

module.exports = app;
