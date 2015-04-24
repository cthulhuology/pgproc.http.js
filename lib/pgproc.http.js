querystring = require('querystring')
express = require('express')
pgproc = require('pgproc')

var database = process.argv[2]
var schema = process.argv[3]
var port = process.argv[4]
var host = process.argv[5]

pgproc(database,schema)
app = express()

app.get('*', function(req,res) {
	var args = req.url.split('/').map(querystring.unescape)
	args.shift()	// ditch first empty
	var proc = args.shift()
	args.push( function(rows) { res.send(rows) })
	if (typeof global[proc] == 'function') global[proc].apply(app,args)
})

app.post('*', function(req,res) {
	var args = req.url.split('/').map(querystring.unescape)
	args.shift()	// ditch first empty
	var proc = args.shift()
	var json = ''
	req.on('data', function(chunk) {
		json += chunk
	})	
	req.on('end', function() {
		args.push( json )	
		args.push( function(rows) { res.send(rows) })
		if (typeof global[proc] == 'function') global[proc].apply(app,args)
	})
})

app.listen(port || 5555, host || '0.0.0.0')
