const DOMAIN = require('../services/constant');
const configNameImage = (req) => {
    let image = ''
    if (!req.file) {
        image = req.body.image
    } else {
        const a = (req.file.path.split('\\').splice(2).toString())
        image = `${DOMAIN.DOMAINIMG}/${a}`;
    }
    return image
}

module.exports = configNameImage;