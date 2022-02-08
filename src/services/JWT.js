const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN, TOKEN_TIME_LIFE } = require('./constant')
let make = (user) => {
    return new Promise(function (resolve, reject) {
        jwt.sign({ data: user }, ACCESS_TOKEN,
            {
                algorithm: "HS256",
                expiresIn: TOKEN_TIME_LIFE
            },
            function (err, _token) {
                if (err) {
                    return reject(err);
                }
                return resolve(_token);
            }
        );
    })
}

let check = (token) =>{
    return new Promise((resolve, reject) =>{
        jwt.verify(token, ACCESS_TOKEN, function (err, data){
            if(err){
                return reject(err);
            }
            return resolve(data);
        })
    })
}

module.exports = {
    make,
    check
};