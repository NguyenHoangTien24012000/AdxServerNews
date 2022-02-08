const connection = require('../services/connectDB')
const DOMAIN = require('../services/constant')
const queryAdx = require('../config/modelAdxQuery')
const queryAdxDemo = require('../config/modelAdxDemoQuery')
class AdxTypeController {
    getAdxType = async (req, res) => {
        let { id_adx } = req.params;

        const [rows] = await queryAdx.select('*').where('id_adx').getOne(id_adx)

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
        const [rows, fields] = await queryAdx.select('*').getAll();
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
        let { id_adx, name_adx, name_demo, size, posti, detail, type_screen } = req.body;
        let image = 'default';
        if (!req.file) {
            image = req.body.image
        } else {
            const a = (req.file.path.split('\\').splice(2).toString())
            image = `${DOMAIN.DOMAINIMG}/${a}`;
        }

        if (!id_adx || !name_adx || !size || !posti || !detail || !name_adx || !name_demo || !type_screen) {
            return res.status(401).json({
                message: 'missing required params',
            })
        }

        const [rows, fields] = await queryAdx.where('id_adx').update(req.body, id_adx, image)

        if (rows.affectedRows === 1) {
            return res.status(200).json({
                message: 'ok'
            })
        }else{
            return res.status(401).json({
                message:'error'
            })
        }
    }
    getGroupAdxType = async (req, res) => {
        let { groupType } = req.params;

        const [rows, fields] = await queryAdx.where('type_adx').select('*').getOne(groupType)

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

        const [rows, fields] = await queryAdx.select('type_adx, COUNT(*)').getGroup('type_adx').getAllCondition()
      
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
        let { name_adx, name_demo, size, posti, detail, type_screen, type_adx } = req.body;
        // console.log(req.body)
        let image = 'default';
        // if()
        if (!req.file) {
            image = req.body.image
        } else {
            const a = (req.file.path.split('\\').splice(2).toString())
            image = `${DOMAIN.DOMAINIMG}/${a}`;
        }

        if (!name_adx || !size || !posti || !detail || !name_demo || !type_screen || !type_adx || !image) {
            return res.status(401).json({
                message: 'missing required params',
            })
        }

        const [rows, fields] = await queryAdx.insertObj(req.body, image)

        let id_type_adx = rows.insertId

        for (let i = 0; i < 3; i++) {
            await queryAdxDemo.insertDemo('id_type_adx', id_type_adx)
        }

        return res.status(200).json({
            message: 'ok'
        })
    }

    deleteAdxType = async (req, res) => {
        let { id_adx } = req.params;
        const [rows, fields] = await queryAdx.where('id_adx').delete(id_adx)
      
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