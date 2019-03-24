require('dotenv').config();
const createError    = require('http-errors'),
      express        = require('express'),
      bodyParser     = require('body-parser'),
      path           = require('path'),
      cookieParser   = require('cookie-parser'),
      appRoot        = require('app-root-path'),
      morgan         = require('morgan'),
      winston        = require('./config/Winston'),
      session        = require('express-session'),
      cors           = require('cors'),
      sassMiddleware = require('node-sass-middleware'),
      isProduction   = process.env.NODE_ENV === 'production',
      db             = require('./config/Mongoose'),
      mongoose       = db.mongoose,
      Schema         = db.Schema,
      bcrypt         = require('bcrypt'),
      mailer         = require('./config/Mailer'),
      twilio         = require('./config/Twilio'),
      models = require('./bootstrap/boot-mongoose')
;


// routes
// let indexRouter = require('./routes/index');
let UserRouter = require('./routes/Users');
let AdminRouter = require('./routes/Admin');

let app = express();


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// logger
app.use(morgan('combined', {stream: winston.stream}));

// CORS
app.use(cors());

// Session
app.use(session({
    secret           : process.env.SESSION_SECRET,
    cookie           : {maxAge: 60000},
    resave           : false,
    saveUninitialized: false
}));

app.use(express.json());
// body parser
app.use(express.urlencoded({extended: false}));
// cookie parser
app.use(cookieParser());
// body parser
app.use(bodyParser.urlencoded({extended: true}));
// parse application/json
app.use(bodyParser.json);
// sass compiler
app.use(sassMiddleware({
    src           : path.join(__dirname, 'public'),
    dest          : path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap     : true
}));
app.use(express.static(path.join(__dirname, 'public')));
// backup body parser

// def routes
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/admin', AdminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error   = req.app.get('env') === 'development' ? err : {};
    
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
