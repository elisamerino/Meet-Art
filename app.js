require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const ensureLoggedIn = require('connect-ensure-login');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

mongoose.Promise = Promise;
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log('Connected to Mongo!');
	})
	.catch((err) => {
		console.error('Error connecting to mongo', err);
	});

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
	require('node-sass-middleware')({
		src: path.join(__dirname, 'public'),
		dest: path.join(__dirname, 'public'),
		sourceMap: true
	})
);

// Middleware Setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

hbs.registerHelper('ifUndefined', (value, options) => {
	if (arguments.length < 2) throw new Error('Handlebars Helper ifUndefined needs 1 parameter');
	if (typeof value !== undefined) {
		return options.inverse(this);
	} else {
		return options.fn(this);
	}
});

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// Enable authentication using session + passport
app.use(
	session({
		secret: 'irongenerator',
		resave: true,
		saveUninitialized: true,
		store: new MongoStore({ mongooseConnection: mongoose.connection })
	})
);
app.use(flash());

app.use(fileUpload(), (req, res, next) => {
	console.log('req.files', req.files);
	next();
});

require('./passport')(app);

const index = require('./routes/index');
app.use('/', index);

const dashboard = require('./routes/dashboard');
app.use('/', dashboard);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const user = require('./routes/user');
app.use('/user', user);

const events = require('./routes/events');
app.use('/event', events);

const company = require('./routes/company');
app.use('/company', company);

module.exports = app;
