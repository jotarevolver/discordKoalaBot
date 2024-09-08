var http = require('node:http')

http.createServer(function (req, res){
  res.write("toy joya");
  res.end();
}).listen(10000)
