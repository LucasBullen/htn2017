const express = require('express');
const router = express.Router();

// Helper functions
var watson = require('watson-developer-cloud');
var visual_recognition = watson.visual_recognition({
  api_key: '9ff8d9a65b96f84e0a4fc610c12b098338997c70',
  version: 'v3',
  version_date: '2016-05-20'
});

var fs = require('fs');

// Routes

router.get('/art/classify/:imagePath', (req,res) => {
    var imagePath = req.params.imagePath;
     var params = {
            images_file: fs.createReadStream(imagePath)
        };

       visual_recognition.classify(params, function(err, res2) {
        if (err)
            console.log(err);
        else{
            res.send(JSON.stringify(res2, null, 2));
        }
    
    });
}); 

router.get('/signIn', (req,res) =>{
    //var 
    //res.send('Hello world!');
});

router.get('/art/queryArtByName/:name', (err,req,res)=>{
    if(err){
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }

    const name = req.params.name;

});

router.post('/art/list/:artId', (err,req,res) =>{
    if(err){
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }else{
        const artId = req.params.name;
    }
});
    

router.get('/art/queryAllArt', (err,req,res) =>{
    if(err){
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }else{

    }
});

router.post('/art/purchase/:artId', (err,req,res) =>{
    if(err){
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }else{
        const artId = req.params.name;
    }
});

router.post('/art/setStatus/:artId/:status', (err,req,res) =>{
    if(err){
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }else{
        const artId = req.params.name;
    }
});

router.post('/art/setPrice/:artId/:price', (err,req,res) =>{
    if(err){
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }else{
        const artId = req.params.name;
    }
});

router.get('/art/initLedger',(err,req,res) =>{

});

module.exports = router;