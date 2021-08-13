var config      =   require('../config/config');

class foodItems{
    
    constructor({itemId,name,price,serving,images,eventId}){
        this.itemId     =   itemId;
        this.name       =   name;
        this.price      =   price;
        this.serving    =   serving;
        this.images      =   images;
        this.eventId      =   eventId;
    }

    addOne(){
        
        let imagesToStore = [];
        const item ={
            name:this.name,
            price:parseInt(this.price),
            serving:this.serving,
            currency:"inr",
            event_id:this.eventId
        };

        const itemsTableInsert =  new Promise((resolve,reject)=>{
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

        const itemsImageTable = new Promise((resolve,reject)=>{
            itemsTableInsert.then((itemTableInsert)=>{
            
                this.images.map((data)=>{
                    /* {
                        fieldname: 'image',
                        originalname: 'tropic.jpg',
                        encoding: '7bit',
                        mimetype: 'image/jpeg',
                        destination: 'C:\\Users\\Client\\Documents\\Tuckshop\\tuckshop_api\\controller/../assets/images/public/food/',
                        filename: 'image_1628712644414.jpg',
                        path: 'C:\\Users\\Client\\Documents\\Tuckshop\\tuckshop_api\\assets\\images\\public\\food\\image_1628712644414.jpg',
                        size: 1635860
                    } */
                    imagesToStore.push([itemTableInsert.insertId,data.filename]);
                });
    
                config.mysqlConnection.getConnection( function(err, connection) {
                    if(err) { 
                        reject(err); 
                    }
                    
                    connection.query('INSERT into `tbl_item_images` (`tbl_items_id`,`file_name`) VALUES ?',[imagesToStore],(error, results, fields) => {
                        resolve(results);
                    });
                });
            });
    
        });

        const finalResponse = new Promise((resolve,reject)=>{
            Promise.all([itemsTableInsert, itemsImageTable])
            .then(values => {
                resolve(values);
            })
            .catch(error =>{
                reject(error);
            });
        });
        
        return finalResponse;
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