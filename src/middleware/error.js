//for catching promise rejections in api request response
module.exports = function (err, req, res, next) {
  //console.log(err);
  //err object that we catch somewere in pour aplication
  res.status(500).send(`Something failed on server: ${err.message}`);
};
