const express = require('express');

const app = express();
// listen to port 3000
const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
  console.log(`App listening at port ${PORT}`)
});
