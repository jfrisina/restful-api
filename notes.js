// SETUP ----------------------------------
// pull in express
const express = require("express");

// set to variable to be able to use it
const app = express();

// pull in all other files needed
const users = require("./routes/users");
const posts = require("./posts/posts");
const error = require("./utilities/error");

// set port number
const port = 3000;

// BODY PARSING MIDDLEWARE ----------------------------------
// tell express to pull in middleware that goes through the body of the request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// tell express to:
app.use((req, res, next) => {
	// create a new date time stamp and set to variable
	const time = new Date();
	// print the following: 
	console.log(`Server received a ${req.method} request to ${req.url} at ${time.toLocaleTimeString()}.`
	);
	// if there's anything in the body, then say this and show the message
	if (Object.keys(req.body).length > 0) {
		console.log("The body says:");
		console.log(`${JSON.stringify(req.body)}`);
	}
	// move onto the next middleware
	next();
});

// API MIDDLEWARE ----------------------------------
// set API keys
apiKeys = ["perscholas", "ps-example", "hJAsknw-L198sAJD-l3kasx"];

// If the key isn't verified, then we don't call next(), and it just cuts off. That's why the /api/ prefix is attached to our routing URL
app.use("/api", function (req, res, next) {
	var key = req.query["api-key"];
	
	// check if api key exists
	if (!key) next(error(400, "API Key Required"));

	// check if api key is valid
	if (apiKeys.indexOf(key) === -1) next(error(401, "Invalid API Key"));

	// We will treat it as a valid key. Store key in req.key for route access
	req.key = key;
	next();
});




