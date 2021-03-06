const { make } = require('../services/JWT')
const queryUser = require('../config/modelUserQuery')
const bcrypt = require('bcrypt')
const validator = require('../config/modelValidation')
class UserAdminController {
    checkLogin = async (req, res) => {

        let data = req.body;
        let { email, password_login } = data;

        const validationRule = {
            "email": "required|email",
            "password_login": "required|string",
        }
        let errorValidate = false
        let dataError
        validator(req.body, validationRule, {}, (err, status) => {
            errorValidate = status
            dataError = err

        });
        if (!errorValidate) {
            return res.status(404).json({
                success: false,
                message: 'Validation failed',
                data: dataError
            })
        }

        const [rows, fields] = await queryUser.where('email', '=', email).get()

        if (rows.length === 0) {
            return res.status(401).json({
                message: 'Email invalid!!'
            })
        }
        // let hashedPass = await bcrypt.hash(password_login, 10)
        if (rows.length > 0) {
            let hashedPass = rows[0].password_login;
            let isEqual = await bcrypt.compare(password_login, hashedPass)
            if (isEqual) {
                const _token = await make(data);
                return res.status(200).send({
                    token: _token,
                    message: 'ok'
                })
            } else {
                return res.status(401).send({
                    message: 'Password invalid!!'
                })
            }
        }
    }
    changeUser = async (req, res) => {
        let data = req.body;
        let { email, password_login } = data;

        const validationRule = {
            "email": "required|email",
            "password_login": "required|string",
        }
        let errorValidate = false
        let dataError
        validator(req.body, validationRule, {}, (err, status) => {
            errorValidate = status
            dataError = err

        });
        if (!errorValidate) {
            return res.status(404).json({
                success: false,
                message: 'Validation failed',
                data: dataError
            })
        }

        let hashedPass = await bcrypt.hash(password_login, 10)
        password_login = hashedPass

        const [rows, fields] = await queryUser.where('id_user', '=', 1).update({ email, password_login })
        if (rows.affectedRows === 1) {
            return res.status(200).json({
                message: 'ok'
            })
        } else {
            return res.status(401).json({
                message: 'error'
            })
        }
    }
}

module.exports = new UserAdminController;
