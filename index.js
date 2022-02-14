const express = require('express');
const app = express();
const PORT = 5000;
const initWebRoute = require('./src/routes/index.route')
const authMiddleWare = require('./src/services/authMiddleWare');
const userLoginRouter = require('./src/routes/loginIndex.route');
const adminRouter = require('./src/routes/adminEditAdx');


//config server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control_Allow_Methods", "GET, POST, DELETE, PUT");
    next();
});

//uploadFile
app.use('/imageAdx',express.static('src/public'));

//Access token;
userLoginRouter(app);

initWebRoute(app);

app.use(authMiddleWare)

adminRouter(app);

//handle 404 not found
// app.use((req, res) => {
//     return res.status(404).send('<h2>Page Not Found</h2>')
// })

app.listen(process.env.PORT || PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})

