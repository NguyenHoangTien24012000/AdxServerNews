const queryAdx = require('../config/modelAdxQuery')
const queryAdxDemo = require('../config/modelAdxDemoQuery')
const configNameImage = require('../config/configNameImage')
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
        let { id_adx, name_adx, name_demo, size, posti, detail, type_screen } = req.body;
        let image = configNameImage(req);

        if (!id_adx || !name_adx || !size || !posti || !detail || !name_adx || !name_demo || !type_screen) {
            return res.status(401).json({
                message: 'missing required params',
            })
        }
        let obj = {...req.body, image}
        const [rows, fields] = await queryAdx.where('id_adx', '=', id_adx).update(obj)

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
        let obj = {...req.body, image}
        
        
        const [rows, fields] = await queryAdx.insert(obj)

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
       
        const [rows, fields] = await  queryAdx.where('id_adx', '=', id_adx).delete()
      
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