var app = require('express')(),
	morgan = require('morgan'),
	port = process.env.PORT || 8080,
	session = require('express-session'),
	cookieParser = require('cookie-parser'),
	useragent = require('express-useragent');

app.use(cookieParser());
app.use(session({
	secret:'fred',
	resave: true,
	saveUninitialized: false
}));

app.use(useragent.express());
app.use(morgan('combined')); // logging of requests

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