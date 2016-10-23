Hack Duke Hardware Registration 
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
1. Access control for API (OAuth?)   
<del>2. UI   </del>
3. Test: on prod server and unit test   
4. Scanner input: scan userId, hardware barcode.   
<del>5. Verify design schema and API   </del>
6. Documentation   
7. Deploy   

License
-------

MIT
