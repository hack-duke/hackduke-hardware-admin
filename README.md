Hack Duke Hardware Inventory 
==================================
Using Express & ES6 REST API Boilerplate

- ES6 support via [babel](https://babeljs.io)
- REST resources as middleware via [resource-router-middleware](https://github.com/developit/resource-router-middleware)
- CORS support via [cors](https://github.com/troygoode/node-cors)
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)

> Tip: If you are using [Mongoose](https://github.com/Automattic/mongoose), you can automatically expose your Models as REST resources using [restful-mongoose](https://git.io/restful-mongoose).

Getting Started
---------------

```sh

# Install dependencies
npm install

# Start MongoDB
mongod

# Start development live-reload server
PORT=8080 npm run dev

# Use test database
cd into project directory   
mongo < mongoScript.js   

# Start production server:
PORT=8080 npm start
```
TODO:
-----
<ul>
<li><del>Query by user id</del></li>
<li>Basic authentication in http header   </li>
<li><del>UI   </del></li>
<li>Test: on prod server and unit test   </li>
<li>Scanner input: scan userId, hardware barcode.   </li>
<li><del>Verify design schema and API   </del></li>
<li>Documentation   </li>
<li>Deploy   </li>
</ul>

License
-------

MIT
