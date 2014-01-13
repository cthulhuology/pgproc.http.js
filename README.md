pgproc.http
===========

Automagic Postgres HTTP API for stored procedures

Getting Started
---------------

To run the http interface simply invoke pgproc with the arguments as follows:

	pgproc postgresql://localhost:5432/mydatabase public 5555
        
This will make all of the stored procedures in the public schema in mydatabase available via HTTP on port 5555.


How the API Works
-----------------

Say you have a stored procedure:
		
	public.create_widget( _class text, _properties json ) returns bool

And you turn on pgproc on the port, you can curl data to it via:

	curl -X POST http://localhost:5555/create_widget/button -d '{ "width": 300, "height" : 100, "onclick" : "sayHi()" }'

This will invoke the stored procedure as:

	create_widget('button','{ "width": 300, "height" : 100, "onclick" : "sayHi()" }')

And will return the HTTP response of 

	{ "create_widget" : true }

Assuming your stored procedure returns true on success.  You could also call this stored procedure using a GET query:

	curl http://localhost:5555/create_widget/button/%7b%20%22width%22:%20300%2c%20%22height%22%20:%20100%2c%20%22onclick%22%20:%20%22sayHi%28%29%22%20%7d

But posting stringified json is generally less desirable, but possibly necessary if you design a crappy api.

The rules are:

	* first path parameter is the stored procedure name
	* POST methods place their body as text or json in the last argument to the stored procedure
	* A JSON representation of the return type { "function_name" : return_value } will be returned

Comments Bugs & Contributions
-----------------------------

Feel free to send me you hate mail at <dave@dloh.org>

