const http = require('http');

const server = http.createServer((request, response) => {
  console.log('The response is here!');
  console.log(request);
  console.log(response);
}); // setting up a server

server.listen(3000);
