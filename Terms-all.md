# All definition of terms used

[1.] Nodemon --> For the purpose of restarting the server after constantly updating.
[2.] Database :
    [-] Database is in another continent
    [-] Always wrap by Try/Catch or Promises

[3.] Dotenv : 
    [-] Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. 
    [-] As early as possible in your application, import and configure dotenv:

[4.] Approaches to connect DB:
    [-] As it entry point is index.js we will write the function to connect in index.js
    [-] Function is written in another folder & then exported in index.js


# EXPRESS

const express = require('express'); 
	const app = express(); 

	let users = [ 
	{ id: 1, name: 'John Doe', email: 'john@example.com' }, 
	{ id: 2, name: 'Jane Smith', email: 'jane@example.com' } 
	]; 

	// Get all users 
	app.get('/users', (req, res) => { 
	res.json(users); 
	}); 

	const port = process.env.PORT || 3000; 
	app.listen(port, () => { 
	console.log(`Server is running on port ${port}`); 
	}); 





EXPLAINATION: 

Import Express:                 We import the Express.js framework to create our server and define routes.

Create Express App:             We create an instance of the Express application by calling express(), 
                                which returns an Express application object stored in the app variable.

Define Dummy User Data:         We define a dummy array called users containing some sample user data.
                                This data will be returned when the /users endpoint is accessed.

Define Route to Get All Users:  We use the app.get() method to define a route for handling GET requests to the /users endpoint. 
                                When a GET request is made to this endpoint, the callback function (req, res) is executed. 
                                In this function, we simply send the users array as a JSON response using res.json(users).
                                
Start the Server:               We specify a port for the server to listen on (defaulting to 3000 if no PORT environment variable is set) and
                                call the app.listen() method to start the server. We also log a message to the console indicating that the server is running and on which port.