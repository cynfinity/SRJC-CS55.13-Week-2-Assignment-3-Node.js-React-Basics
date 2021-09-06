//load the core modules. There are 2-http and fs
const http = require("http");

//load the core node filesystem (fs) module, using js promises instead of callbacks
// a promise represents evential completion of asyncg operation and its result
const fs = require('fs').promises;

// create a function to reponds to http requests
//if fs.readFile() successful, it returns data
//use then() method to handle success-contents parameter contains HTML file data
//the requestListener listen for function. job is to find URL and send back of one of the two possible files. In this case .html or JSON
const requestListener = function (req, res) {
  //set http responce header entry
  // A test HTML-- res.setHeader("Content-Type", "text/html; charset=UTF-8");
  //return 200 OK http status code
  //a test HTML-- res.writeHead(200);
  //send back contect + close response
  //A test HTML-- res.end("<html><head><title>Hello</title></head><body>Hello</body></html>");
  console.log(req.url);

 if (req.url === "/") {
    // check request url, if root, return html file
    fs.readFile(__dirname + "/index.html")
      .then(contents => {
        // set http response header entry
        res.setHeader("Content-Type", "text/html; charset=UTF-8");
        // return 200 OK http status code
        res.writeHead(200);
        // send back file contents + close response
        res.end(contents);
      });
  } else {
     // check request url, if root, return html file
    fs.readFile(__dirname + "/data.json")
      .then(contents => {
        // set http response header entry
        res.setHeader("Content-Type", "application/json; charset=UTF-8");
        // return 200 OK http status code
        res.writeHead(200);
        // send back file contents + close response
        res.end(contents);
      });
  }

};

//create an http server instance
const server = http.createServer(requestListener);

// define the TCP port and IP address to tell our http server to listen to
// host and port number below are unique to Repl.it instances. WHen using other programs TCP and IP address differ
const host = "0.0.0.0";
const port = "8080";

// call the liste() method to start listening to http requests
server.listen(
  // three argument TCP "port" number, "host" is ip address, function
  //arrow notation to create a function, points to hold {} code
  port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
    //code below is functionally equivalent to code above, congactination operator
    //console.log("Server is running on http://" + host + ":" + port);

  }
);