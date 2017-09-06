var app = require('express')(),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	port = process.env.PORT || 8080,
	basicAuth = require('express-basic-auth'),
	session = require('express-session'),
	cookieParser = require('cookie-parser'),
	useragent = require('express-useragent');

app.set('view engine', 'ejs'); // view engine to EJS (default is jade)

app.use(cookieParser());
app.use(session({
	secret:'fred',
	resave: true,
	saveUninitialized: false
}));

app.use(useragent.express());
app.use(morgan('combined')); // logging of requests
app.use(bodyParser.urlencoded({extended: false})); // converts request body to json

app.get('*', (req, res) => {
	if (!req.session.useragent) {
		req.session.useragent = req.useragent;
		req.session.count = 0;
	}
	req.session.count++;

	res.status(200).send('Count: ' + req.session.count);
});


app.listen(port, (err) => {
	console.log('listening on %s', port);
})