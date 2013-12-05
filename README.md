pgproc.http.js
==============

A simple node app to expose Postgres stored procedures via HTTP


Getting Started
---------------

        npm install pgproc.http
        pgproc postgres://localhost:5432/mydatabase public 5556
        
This will expose the stored procedures in the public schema of mydatabase on the localhost machine as

        http://localhost:5556/procname/arg1/arg2/.../argN
        
The results of the stored procedures should return json, but most return types will produce a useful output.


Bugs & Comments
---------------

If you'd like to comment or fix things feel free to drop me a line.

Dave
