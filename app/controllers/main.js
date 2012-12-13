exports.index = function(req, res) {
   console.log(req.url);
    var filePath = require('path').normalize(__dirname + "/../public/main.html");
    res.sendfile(filePath);
};