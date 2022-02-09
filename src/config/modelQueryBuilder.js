
const connection = require('../services/connectDB')


class QueryBuilder{

    constructor(){
        this.condition='';
        this.fields='*';
        this.args=[];
        this.argswhere=[];
        this.table=this.table?this.table:this.constructor.name;
    }
    reset(){
        this.condition='';
        this.fields='*';
        this.args=[];
        this.argswhere=[];
    }
    select(fields){
        this.fields=fields;
        return this;
    }
    get(){
        //ASC, DESC
        let sql=` SELECT ${this.fields} FROM ${this.table} ${this.condition}`;
     
        let data = this.argswhere
        if(this.argswhere.length === 0 ){
            this.reset();
            return connection.execute(sql)
        }
        // console.log(sql, data)
        this.reset()
        return connection.execute(sql, [...data])
    }

    group(key){
        this.condition += `GROUP BY ${key}`
        return this
    }

    where(key,operator,value){
        this.condition+=this.condition==''?` WHERE ${key} ${operator} ? `: ` AND ${key} ${operator} ? `;
        this.argswhere.push(value);
        return this;
    }
    whereor(key,operator,value){
        this.condition+=` OR ${key} ${operator} ? `;
        this.argswhere.push(value);
        return this;
    }
    
    wherenot(key, operator, value){
        this.condition += `NOT ${key} ${operator} ?`
        this.argswhere.push(value)
        return this
    }

    update(obj){
        
        let strkey='';
        for(let key in obj){
            strkey+= ` ${key} = ?,`
            this.args.push(obj[key]);
        }
        strkey=(strkey.slice(0,strkey.length-1));
        let sql = `UPDATE ${this.table} SET ${strkey} ${this.condition}`;
        let data = this.args
        let dataWhere = this.argswhere
        this.reset();
        // console.log(sql, data, dataWhere)
        return connection.execute(sql, [...data,...dataWhere])
    }
    insert(obj){
        let strKey = ''
        let strQuestion = ''
        for(let key in obj){
            strKey += ` ${key},`
            strQuestion += ' ?,' 
            this.args.push(obj[key])
        }
        strKey = (strKey.slice(0, strKey.length-1))
        strQuestion = (strQuestion.slice(0, strQuestion.length-1))
        let sql = `INSERT INTO ${this.table} (${strKey}) VALUES (${strQuestion})`
        let data = this.args 
        this.reset()
        // console.log(sql, data)
        return connection.execute(sql,[data])

    }   
    delete(){
        let sql = `DELETE FROM ${this.table} ${this.condition}`;
        // console.log(sql)
        // return sql;
        let dataWhere = this.argswhere
        this.reset()
        // console.log(sql, dataWhere)
       return connection.execute(sql,dataWhere)
    }
}

module.exports = QueryBuilder;