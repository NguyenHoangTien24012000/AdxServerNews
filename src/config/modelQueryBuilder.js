
const connection = require('../services/connectDB')

class QueryBuilder {
    constructor() {
        this.table = this.name ? this.name : this.constructor.name;
        this.condition = '';
        this.key = '';
        this.strPDO = ''
        this.strWhere = ''
    }

    select(fields) {
        this.fields = fields;
        return this
    }

    getAll() {
        this.query = `SELECT ${this.fields} FROM ${this.table} `
        console.log(this.query)
        return connection.execute(this.query);
    }

    getAllCondition(){
        this.query = `SELECT ${this.fields} FROM ${this.table} ${this.condition}`
        console.log(this.query)
        return connection.execute(this.query);
    }

    getOne(value) {
        this.query = `SELECT ${this.fields} FROM ${this.table} ${this.condition}`
        console.log(this.query)
        return connection.execute(this.query, [value])
    }

    getGroup(group) {
        this.condition = `GROUP BY ${group}`
        return this
    }

    stringPDO(arrKey) {
        let length = arrKey.length
        let space = ','
        for (let i = 0; i < length; i++) {
            if (i == length - 1) {
                space = ''
            }
            this.strPDO += `${arrKey[i]} = ? ${space}`
        }
        return this.strPDO;
    }

    whereCondition(obj, operator){
        let arrKey = []
        let arrValue = []
        for (const key in obj) {
            arrKey.push(key)
            arrValue.push(obj[key])
        }
        let space = operator ? operator : ','
        let length = arrKey.length
        for (let i = 0; i < length; i++) {
            if (i == length - 1) {
                space = ''
            }
            this.strWhere += `${arrKey[i]} = ? ${space}`
        }
    }

    where() {
        this.condition = `WHERE ${this.strWhere}`
        return this;
    }

    update(obj, value, image) {
        let arrKey = []
        let arrValue = []
        for (const key in obj) {
            arrKey.push(key)
            arrValue.push(obj[key])
        }
        if (image) {
            arrKey = [...arrKey, 'image']
            this.query = `UPDATE ${this.table} SET ${this.stringPDO(arrKey)} ${this.condition}`
            return connection.execute(this.query, [...arrValue, image, value])
        }
        this.query = `UPDATE ${this.table} SET ${this.stringPDO(arrKey)} ${this.condition}`
        console.log(this.query)
        return connection.execute(this.query, [...arrValue, value])
    }

    insertObj(obj, image) {
        let arrKey = []
        let arrValue = []
        for (const key in obj) {
            arrKey.push(key)
            arrValue.push(obj[key])
        }
        arrKey = [...arrKey, 'image']
        // arrValue = [...arrValue, image]
        let stringInsert = ''
        let space = ','
        let length = arrKey.length;
        for (let i = 0; i < length; i++) {
            if (i === length - 1) {
                space = ''
            }
            stringInsert += `? ${space}`
        }
        this.query = `INSERT INTO ${this.table} (${arrKey}) VALUES (${stringInsert})`
        console.log(this.query)
        return connection.execute(this.query, [...arrValue, image])
    }

    insertDemo(key, value) {
        this.query = `INSERT INTO ${this.table} (${key}) VALUES (?)`
        return connection.execute(this.query, [value])
    }

    delete(id) {
        this.query = `DELETE FROM ${this.table} ${this.condition}`
        return connection.execute(this.query, [id])
    }
}

module.exports = QueryBuilder;