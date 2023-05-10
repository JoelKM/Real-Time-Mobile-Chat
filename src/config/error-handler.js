const respond = require('../common/response-format');

const handleError = (err, req, res) => {
  console.error(err)
  
  if (!err.isOperational) {
    console.error('Shutting down the application...');
    process.exit(1);
  }
  return respond(res, false, err.statusCode, {error: err.message});
};
  
module.exports = handleError;