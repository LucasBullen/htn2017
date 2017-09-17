const express = require('express');
const router = require('./router');
const cookieParser = require('cookie-parser')
//app.use('/api', expressJwt({secret: SECRET}));
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
//app.use(cookieParser())
const app = express();
//const port = 808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080;
const port = 3000;
app.use(express.static('public'));
app.use(router);
app.use(cookieParser());
app.use('/api', expressJwt({secret: "sec"}));
app.listen(port,() =>{
    console.log(`Server running on http://localhost:${port}`);
});
