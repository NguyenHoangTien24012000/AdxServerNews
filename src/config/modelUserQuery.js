
const QueryBuilder = require('./modelQueryBuilder');
class user_admin extends QueryBuilder{
    constructor(){
        super()
    }
}
const queryUser = new user_admin
module.exports = queryUser;
