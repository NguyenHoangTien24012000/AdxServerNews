const connection = require('../services/connectDB');
const queryAdxContact = require('../config/modelAdxContactQuery')

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
    editAdxContact = async (req, res) => {
        let { number_phone1, number_phone2, email, link_facebook, link_skype, link_zalo, link_signin, link_signup } = req.body;
      
        if (!number_phone1 || !number_phone2 || !email || !link_facebook || !link_skype || !link_zalo || !link_signin || !link_signup) {
            return res.status(401).json({
                message: 'missing required params',
            })
        }
        const [rows] = await queryAdxContact.where('id_contact','=', 1).update(req.body)
       
        if (rows.affectedRows) {
            return res.status(200).json({
                message: 'ok'
            })
        }else{
            return res.status(401).json({
                message:'error'
            })
        }

    }
}

module.exports = new AdxContactController;