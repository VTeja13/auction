global.highbid="0";
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var connection = require('./config');
var current;
var time;
connection.query('UPDATE auction SET hbid=? WHERE id=?',[highbid,1], function (error, results, fields) {
      if (error) {throw (error);}
});

app.get('/', function(req, res) 
{
   res.sendfile(__dirname + '/index.html');
});

          
console.log("god help");
io.on('connection', function(socket){
	
  console.log('a user connected');
   socket.on('bid', function(msg){clearTimeout(time);
//first get current highest bid value from database
connection.query('SELECT * FROM auction WHERE id = ?',[1], function (error, results, fields)
{
      if (error) {throw(error);}
      else { current=results[0].hbid;}
});
//check if the value submitted is greater
if(msg>current)
{
    io.emit('bid','value: ' + msg);
connection.query('UPDATE auction SET hbid=? WHERE id=?',[msg,1], function (error, results, fields) 
{
      if (error) {throw (error);}
 });
}
time=setImmediate(myfun,10000,msg);


});

});
function myfun(msg)
{
//once again get data from the db to get the current highest bid value
connection.query('SELECT * FROM auction WHERE id = ?',[1], function (error, results, fields) 
{
      if (error) {throw(error);}
      else { current=results[0].hbid;}
});
if(msg>current)
{
console.log(msg);
io.emit('bid','won for'+ msg);
}
};    
http.listen(3000, function(){
  console.log('listening on *:3000');
});
    
