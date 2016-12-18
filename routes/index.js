const fs = require('fs');
const indexHTML = fs.readFileSync('./build/index.html', 'utf-8');

module.exports = function(app) {

  app.get('/', (req, res)=> {
    res.end(fs.readFileSync(indexHTML));
  });


  require('./courses')(app);
};
