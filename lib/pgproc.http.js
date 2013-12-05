#!/usr/bin/env node

express = require('express')
pgproc = require('pgproc')

var database = process.argv[2]
var schema = process.argv[3]
var port = process.argv[4]

pgproc(database,schema)
app = express()

app.get('*', function(req,res) {
	var args = req.url.split('/')
	args.shift()	// ditch first empty
	var proc = args.shift()
	args.push( function(rows) { res.send(rows) })
	global[proc].apply(app,args)
})

app.listen(port || 5555)