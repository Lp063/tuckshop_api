const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    const anObject={
        'name':'Lohit P'
    };
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(anObject));
});

app.listen(3000,()=>{
    console.log("listening on port 3000");
});