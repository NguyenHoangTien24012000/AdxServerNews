const connection = require('../services/connectDB');
const DOMAIN = require('../services/constant');
const queryAdxDemo = require('../config/modelAdxDemoQuery');
class AdxItemController {
    getItemGroup = async (req, res) => {
        let { idGroup } = req.params;
        // console.log(req.params)
        try {
            const [rows, fields] = await queryAdxDemo.select('*').where('id_type_adx').getOne(idGroup)
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
            const [rows, fields] = await queryAdxDemo.select('*').where('id_item').getOne(idItem)

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
        let image;
        if (!req.file) {
            image = req.body.image
        } else {
            const a = (req.file.path.split('\\').splice(2).toString())
            image = `${DOMAIN.DOMAINIMG}/${a}`;
        }

        if (!link_button1 || !link_button2 || !name_demo || !id_demo) {
            return res.status(401).json({
                message: 'missing required params',
            })
        }

        const [rows, fields] = await queryAdxDemo.where('id_demo').update(req.body, id_demo, image)
        
      
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

}

module.exports = new AdxItemController;