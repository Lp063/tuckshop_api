var config      =   require('../config/config');

class foodItems{
    
    constructor({itemId,name,price,serving,images,eventId}){
        this.itemId  = itemId;
        this.name    = name;
        this.price   = price;
        this.serving = serving;
        this.images  = images;
        this.eventId = eventId;
    }

    nameNotExist(items){

        // const item ={
        //     name:this.name,
        //     price:parseInt(this.price),
        //     serving:this.serving,
        //     currency:"inr",
        //     event_id:this.eventId
        // };
        items = items.map((e)=>{
            return e.name;
        });
        const itemsExist =  new Promise((resolve,reject)=>{
            config.mysqlConnection.getConnection( function(err, connection) {
                if(err) { 
                    return reject(err); 
                }
                
                connection.query('SELECT * FROM `tbl_items` where name in (?)',items,(error, results, fields) => {
                    connection.release();
                    if(results) { 
                        return reject(results);
                    }else{
                        return resolve(error);
                    }
                });
            });
        });
        
        return itemsExist;
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

        //this.nameNotExist([item]).catch(found=>{}).then(found => {});return;

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
            Promise.all([itemExist,itemsTableInsert, itemsImageTable])
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
                //let query = 'SELECT * FROM `tbl_items`';
                let query = 'SELECT ti.*, tim.id as image_id,tim.file_name as image_name FROM `tbl_items` as ti left join `tbl_item_images` as tim on ti.id = tim.tbl_items_id';
                connection.query(query,(error, results, fields) => {
                    connection.release();
                    if(error) { 
                        return reject(error);
                    }else{

                        /* let groupByIdLvl1 = {};
                        results.map((object,index)=>{ 
                            if(typeof groupByIdLvl1[object.id] === "undefined"){
                            groupByIdLvl1[object.id] = [object];
                        }else{
                            groupByIdLvl1[object.id].push(object);
                        }
                        });

                        console.log(groupByIdLvl1); */
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
                connection.query('SELECT ti.*, tim.id as image_id,tim.file_name as image_name FROM `tbl_items` as ti left join `tbl_item_images` as tim on ti.id = tim.tbl_items_id where ti.id = ?',[itemId],(error, results, fields) => {
                    connection.release();
                    if(error) { 
                        return reject(error);
                    }else{
                        let data = [{
                            id:results[0].id,
                            event_id: results[0].event_id,
                            name: results[0].name,
                            price: results[0].price,
                            created_on: results[0].created_on,
                            serving: results[0].serving,
                            currency: results[0].currency,
                            itemImages:(results[0].image_id !== null)?results.map ((imgData)=>{
                                return  {image_id:imgData.image_id,image_name:"/images/food/"+imgData.image_name};
                            }):[]
                        }];

                        return resolve(data);
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