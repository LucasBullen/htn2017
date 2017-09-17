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

var blockchainInvoke = require('invoke');

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
    res.redirect('https://www.coinbase.com/oauth/authorize?client_id=80abb6aafe606adb604c0103a3c4acb3f30b1e453c25c13166019995c9aaa78a&redirect_uri=http%3A%2F%2Flocalhost%3A3000%0D%0A&response_type=code&scope=wallet%3Auser%3Aread');
});

router.get('/profile',(req,res) =>{
    
})

router.get('/home', (err,req,res)=>{
    if(err){
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }else{
        allArtJSON = blockchainInvoke.invoke("queryAllArt");
        if (allArtJSON.length > 7){
            var sliced = allArtJSON.sliced(0,7);
            res.send(sliced);
        }else{
            res.send(allArtJSON);
        }   
    }
});

router.get('/art/queryArtById/:artId', (err,req,res)=>{
    if(err){
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }

    const artId = req.params.artId;

    artJSON = blockchainInvoke.invoke("queryArtById",[artId]);
    if(!artJSON){
        res.status(500).send('Could not find the art you\'re looking for!');
    }else{
        res.send(artJSON);
    }

});

router.post('/art/list/:artId', (err,req,res) =>{
    if(err){
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }else{
        const artId = req.params.name;
        success = blockchainInvoke.invoke("list",[artId]);
        if(!success){
            res.status(500).send('Could not find the art you\'re looking for!');
        }else{
             res.send(true);
        }
    }
});
    

router.get('/art/queryAllArt', (err,req,res) =>{
    if(err){
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }else{
        allArtJSON = blockchainInvoke.invoke("queryAllArt");
        if(!allArtJSON){
            res.status(500).send('Could not find the art you\'re looking for!');
        } else{
             res.send(allArtJSON);
        }

    }
});

router.post('/art/auctionSetUp/:artId/:startTime/:endTime', (err,req,res) =>{
    if(err){
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }else{
        const artId = req.params.artID;
        const startTime = req.params.startTime;
        const endTime = req.params.endTime;

        success = blockchainInvoke.invoke("setUpAuction", [artID, startTime, endTime]);
        if (!success) {
            res.status(500).send('Could not begin the auction!');
        } else {
            res.send(true);
        }
    }
});

router.post('/art/setStatus/:artId/:status', (err,req,res) =>{
    if(err){
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }else{
        const artId = req.params.artId;
        const status = req.params.status;

        success = blockchainInvoke.invoke("setStatus", [artId, status]);
        if (!success) {
            res.status(500).send("Could not set status!");
        } else {
            res.send(true);
        }
    }
});

router.post('/art/setPrice/:artId/:price', (err,req,res) =>{
    if(err){
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }else{
        const artId = req.params.artId;
        const price = req.params.price;

        success = blockchainInvoke.invoke("setPrice", [artId, price]);
        if (!success) {
            res.status(500).send("Could not set price!");
        } else {
            res.send(true);
        }
    }
});

router.post('/search/:tag', (err,req,res)=>{
    if(err){
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }else{
        var searchTag = req.params.tag;
        allArtJSON = blockchainInvoke.invoke("queryAllArt");
        if(!allArtJSON){
            res.status(500).send('Could not find the art you\'re looking for!');
        } else{
                searchVideos = [];
                var searchKeys = ["name","author","description"];
                allArtJSON.forEach(function(element){
                    searchKeys.forEach(function(key){
                        if(element[key].includes(searchTag)){
                            searchVideos.push(element);
                        }else{
                            var imagePath = `./public/img/${element[id]}`;
                            var params = {
                            images_file: fs.createReadStream(imagePath)
                            };

                            visual_recognition.classify(params, function(err, res2) {
                                if (err)
                                    console.log(err);
                                else{
                                    classifyJSON = JSON.stringify(res2, null, 2);
                                }
                    
                            });

                            var classes = classifyJSON['images'][0]['classifiers'][0]['classes'];
                            classes.forEach(function(bucket){
                                if(bucket['class'].includes(searchTag)){
                                    searchVideos.push(element);
                                }
                            })
                        }
                    })   
                });
            res.send(searchVideos);
        }

    }
});

module.exports = router;