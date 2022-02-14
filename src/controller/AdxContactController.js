const connection = require('../services/connectDB');
const queryAdxContact = require('../config/modelAdxContactQuery')
const validator = require('../config/modelValidation');

class AdxContactController {
    getAllAdxContact = async (req, res) => {
        try {
            const [rows, fields] = await queryAdxContact.get()
            return res.status(200).json({
                message: 'ok',
                data: rows
            })
        } catch (error) {
            return res.status(401).json({
                message: 'error'
            })
        }
    }
    editAdxContact = async (req, res, next) => {
        // let { number_phone1, number_phone2, email, link_facebook, link_skype, link_zalo, link_signin, link_signup } = req.body;

        const validationRule = {
            "email": "required|email",
            "number_phone1": "required|string",
            "number_phone2": "required|string",
            "link_facebook": "required|string",
            "link_skype": "required|string",
            "link_zalo": "required|string",
            "link_signin": "required|string",
            "link_signup": "required|string"
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
        const [rows] = await queryAdxContact.where('id_contact', '=', 1).update(req.body)

        if (rows.affectedRows) {
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

module.exports = new AdxContactController;