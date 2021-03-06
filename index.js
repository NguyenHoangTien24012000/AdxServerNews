const express = require('express');
const app = express();
const initWebRoute = require('./src/routes/index.route')
const authMiddleWare = require('./src/services/authMiddleWare');
const userLoginRouter = require('./src/routes/loginIndex.route');
const adminRouter = require('./src/routes/adminEditAdx');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

//config domain
// const { createProxyMiddleware } = require('http-proxy-middleware');
// app.use('/api', createProxyMiddleware({ target: 'http://localhost:2000', changeOrigin: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control_Allow_Methods", "GET, POST, DELETE, PUT");
    next();
});

//getFile Image
app.use('/imageAdx', express.static('src/public'));

initWebRoute(app);

//Access token;
userLoginRouter(app);

app.use(authMiddleWare)

adminRouter(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})


