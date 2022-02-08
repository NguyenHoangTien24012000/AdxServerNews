const { make } = require('../services/JWT')
const queryUser = require('../config/modelUserQuery')
class UserAdminController {
    checkLogin = async (req, res) => {
        // console.log('headers', req)
        // let {data} = req.body;
        // console.log("data", req.body);
        let data = req.body;
        let {user, password_login} = data;
        // console.log(email, password_login)
      
        if (!user || !password_login) {
            return res.status(401).json({
                message: 'missing required params',
            })
        }
        const [rows, fields] = await queryUser.
         connection.execute('SELECT * FROM user_admin WHERE email = ? AND password_login = ?', [user, password_login]);
        if (rows.length === 0) {
            return res.status(401).json({
                message: 'Login failed'
            })
        }

        if(rows.length > 0){
            const _token = await make(data);
            return res.status(200).send({
                token: _token,
                message: 'ok'
            })
        }
    }
}

module.exports = new UserAdminController;
