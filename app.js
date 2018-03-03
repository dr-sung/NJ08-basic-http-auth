const express = require('express');
const basicAuth = require('basic-auth');
const app = express();

const auth_middle = function(req, res, next) {
    let user = basicAuth(req);
    if (!user || !user.name || !user.pass) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        res.sendStatus(401);
        return;
    }

    // hardcoded in this demo: username: test,  password: ppp
    if (user.name == 'test' && user.pass == 'ppp') {
        next();
    } else {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        res.sendStatus(401);
        return;
    }
}

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Super Cool Web!</h1>");
});

app.get('/user', auth_middle, (req, res) => {
    res.send("<h1>You've enter the most secure page to non-hackers.</h1>");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`The server started at port ${PORT}.`);
});