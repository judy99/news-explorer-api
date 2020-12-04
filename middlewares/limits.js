const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
   windowMs: 15 * 60 * 1000, // 15 minutes
  // windowMs: 60 * 1000, // 1 min
  max: 100, // limit each IP to 100 requests per windowMs
  // message: 'Max number of requests reached.',
  headers: true,
});

module.exports = {
   limiter
};

