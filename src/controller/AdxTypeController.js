const queryAdx = require('../config/modelAdxQuery')
const queryAdxDemo = require('../config/modelAdxDemoQuery')
const configNameImage = require('../config/configNameImage')
const validator = require('../config/modelValidation')
class AdxTypeController {
    getAdxType = async (req, res) => {
        let { id_adx } = req.params;

        const [rows] = await queryAdx.where('id_adx', '=', id_adx).get()

        if (rows.length === 0) {
            return res.status(401).json({
                message: 'data does not exist'
            })
        }
        return res.status(200).json({
            message: 'ok',
            data: rows
        })
    }
    getAllAdxType = async (req, res) => {
        const [rows, fields] = await queryAdx.get();
        if (rows.length === 0) {
            return res.status(401).json({
                message: 'data does not exist'
            })
        }
        return res.status(200).json({
            message: 'ok',
            data: rows
        })
    }
    updateAdxType = async (req, res) => {
        let { id_adx } = req.body;

        let image = configNameImage(req);

        let obj = { ...req.body, image }
        const validationRule = {
            "id_adx" : "required|string",
            "name_adx": "required|string",
            "name_demo": "required|string",
            "size": "required|string",
            "posti": "required|string",
            "detail": "required|string",
            "type_screen" : "required|string",
            "image" : "required|string"
        }
        let errorValidate = false
        let dataError = ''
        validator(obj, validationRule, {}, (err, status) => {
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
        
        const [rows, fields] = await queryAdx.where('id_adx', '=', id_adx).update(obj)

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
    getGroupAdxType = async (req, res) => {
        let { groupType } = req.params;
        // console.log(groupType)
        const [rows, fields] = await queryAdx.where('type_adx', '=', groupType).get()

        if (rows.length === 0) {
            return res.status(401).json({
                message: 'data does not exist'
            })
        }
        return res.status(200).json({
            message: 'ok',
            data: rows
        })
    }
    getAllGroupAdxType = async (req, res) => {


        const [rows, fields] = await queryAdx.select('type_adx, COUNT(*)').group('type_adx').get()

        if (rows.length === 0) {
            return res.status(401).json({
                message: 'data does not exist'
            })
        }
        const data = rows.map((item) => {
            const number = item['COUNT(*)'];
            return { type_adx: item.type_adx, number: number };
        })
        return res.status(200).json({
            message: 'ok',
            data: data
        })
    }

    addAdxType = async (req, res) => {
 
        let image = configNameImage(req);

        let obj = { ...req.body, image }
        const validationRule = {
            "name_adx": "required|string",
            "name_demo": "required|string",
            "size": "required|string",
            "posti": "required|string",
            "detail": "required|string",
            "type_screen" : "required|string",
            "image" : "required|string"
        }
        let errorValidate = false
        let dataError = ''
        validator(obj, validationRule, {}, (err, status) => {
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
        
        const [rows, fields] = await queryAdx.insert(obj)

        let id_type_adx = rows.insertId

        for (let i = 0; i < 3; i++) {
            await queryAdxDemo.insert({id_type_adx : id_type_adx})
        }

        return res.status(200).json({
            message: 'ok'
        })
    }

    deleteAdxType = async (req, res) => {
        let { id_adx } = req.params;

        const [rows, fields] = await queryAdx.where('id_adx', '=', id_adx).delete()

        if (rows.affectedRows === 0) {
            return res.status(401).json({
                message: 'delete failed'
            })
        }
        return res.status(200).json({
            message: 'ok'
        })
    }

}

module.exports = new AdxTypeController;