const express = require('express'),
	  app = express(),
	  request = require('request'),
	  server = require('http').Server(app),
	  port = process.env.PORT || 8081;

// Use .ejs file format
app.set('view engine', 'ejs');

// Serve Static JS and CSS files
app.use(express.static('public'));

// Home Page Route
app.get('/movie', (req, res) => {
	res.render('index');
});


// API Results from Input Form Route
app.get('movie/results', (req, res, err) => {
	const userKeyword = req.query.search;
	const url = `http://omdbapi.com/?s=${userKeyword}&apikey=thewdb`;

	request(url, function (error, response, body) {
		const movies = JSON.parse(body);
		if(!movies["Error"] && response.statusCode === 200) {
			res.render("results", {movies: movies})
		} else {
			res.redirect('error');
		}
	})				
});


// All Other Requests go to error page
app.get('*', (req, res) => {
	res.render('error')
})

// Allows server to set port at run time
server.listen(port, () => {
    console.log("App is running on port " + port);
});

// // Local Dev Server
// app.listen(3000, () => {
// 	console.log('App running on port: 3000');
// });