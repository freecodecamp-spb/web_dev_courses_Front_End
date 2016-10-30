
module.exports = function(app, passport) {
  require('./courses')(app, passport);
  require('./users')(app, passport);
};
