const queryAdxDemo = require('../config/modelAdxDemoQuery');
const configNameImage = require('../config/configNameImage')
const validator = require('../config/modelValidation')
class AdxItemController {
    getItemGroup = async (req, res) => {
        let { idGroup } = req.params;
        // console.log(req.params)
        try {

            const [rows, fields] = await queryAdxDemo.where('id_type_adx', '=', idGroup).get()
            // res.send(rows);
            return res.status(200).json({
                message: 'ok',
                data: rows
            })
        } catch (error) {
            return res.status(401).json({
                message: error
            })
        }
    }
    getItemDetail = async (req, res) => {
        let { idItem } = req.params;
        try {

            const [rows, fields] = await queryAdxDemo.where('id_item', '=', idItem).get()

            return res.status(200).json({
                message: 'ok',
                data: rows
            })
        } catch (error) {
            return res.status(401).json({
                message: error
            })
        }
    }
    updateItemDetail = async (req, res) => {
        let { link_button1, link_button2, name_demo, id_demo } = req.body;
        let image = configNameImage(req);
        let obj = {...req.body,image}
        const validationRule = {
            "link_button1": "required|string",
            "link_button2": "required|string",
            "name_demo": "required|string",
            "id_demo" : "required|string",
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

        const [rows, fields] = await queryAdxDemo.where('id_demo', '=', id_demo).update(obj)


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

module.exports = new AdxItemController;