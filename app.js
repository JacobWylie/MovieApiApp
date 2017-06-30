const express = require('express'),
	  app = express(),
	  request = require('request'),
	  server = require('http').Server(app),
	  port = process.env.PORT || 8000;

// Use .ejs file format
app.set('view engine', 'ejs');

// Serve Static JS and CSS files
app.use(express.static('public'));

// Home Page Route
app.get('/', (req, res) => {
	res.render('index');
});


// API Results from Input Form Route
app.get('/results', (req, res) => {
	let userKeyword = req.query.search;
	let url = `http://omdbapi.com/?s=${userKeyword}&apikey=thewdb`;

	request(url, function (error, response, body) {
		if(!error && response.statusCode === 200) {
			let movies = JSON.parse(body); 
			res.render("results", {movies: movies})
		} else {
			// Error Page
			res.redirect('error')
		}
	});
})


// All Other Requests go to error page
app.get('*', (req, res) => {
	res.render('error')
})

// Allows Heroku to set port at run time
server.listen(port, function() {
    console.log("App is running on port " + port);
});

// // Local Dev Server
// app.listen(3000, () => {
// 	console.log('App running on port: 3000');
// });