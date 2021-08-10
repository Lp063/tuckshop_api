var config      =   require('../config/config');

class foodItems{
    
    constructor({itemId,name,price,serving,image}){
        this.itemId     =   itemId;
        this.name       =   name;
        this.price      =   price;
        this.serving    =   serving;
        this.image      =   image;
    }

    addOne(){
        const item ={
            name:this.name,
            price:parseInt(this.price),
            serving:this.serving,
            currency:"inr",
            img_src:this.image
        };
        return new Promise((resolve,reject)=>{
            config.mysqlConnection.getConnection( function(err, connection) {
                if(err) { 
                    return reject(err); 
                }
                
                connection.query('INSERT into `tbl_items` SET ?',item,(error, results, fields) => {
                    connection.release();
                    if(error) { 
                        return reject(error);
                    }else{
                        return resolve(results);
                    }
                });
            });
        });
    }

    get(){
        return new Promise((resolve,reject)=>{
            config.mysqlConnection.getConnection((err, connection) => {
                if(err) { 
                    return reject(err); 
                }
                connection.query('SELECT * FROM `tbl_items`',(error, results, fields) => {
                    connection.release();
                    if(error) { 
                        return reject(error);
                    }else{
                        return resolve(results);
                    }
                });
            });
        });
    }

    getOne(){
        let itemId = this.itemId;

        return new Promise((resolve,reject)=>{
            config.mysqlConnection.getConnection((err, connection) => {
                if(err) { 
                    return reject(err); 
                }
                connection.query('SELECT * FROM `tbl_items` where id = ?',[itemId],(error, results, fields) => {
                    connection.release();
                    if(error) { 
                        return reject(error);
                    }else{
                        return resolve(results);
                    }
                });
            });
        });
    }

    updateOne(){
        let {itemId,name,price,serving,image} = this;
        return new Promise((resolve,reject)=>{
            config.mysqlConnection.getConnection( (err, connection) => {
                if(err) { 
                    return reject(err); 
                }
                connection.query('UPDATE `tbl_items` SET name = ?, price = ?, serving = ? where id = ?',
                    [name, price, serving, itemId],
                    (error, results, fields)=>{
                    connection.release();
                    if(error) { 
                        return reject(error);
                    }else{
                        return resolve(results);
                    }
                });
            });
        });
    }

    deleteOne(input){
        return new Promise((resolve,reject)=>{
            config.mysqlConnection.getConnection( (err, connection) => {
                if(err) { 
                    return reject(err); 
                }
                connection.query('DELETE FROM `tbl_items` where id = ?',[this.itemId],(error, results, fields)=>{
                    connection.release();
                    if(error) { 
                        return reject(error);
                    }else{
                        return resolve(results);
                    }
                });
            });
        });
    }
}

module.exports = foodItems;