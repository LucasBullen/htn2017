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

var blockchainInvoke = require('../../fabric-samples/artchain/invoke');
var blockchainQuery = require('../../fabric-samples/artchain/query');

var Client = require('coinbase').Client;
var client = new Client({'apiKey': '80abb6aafe606adb604c0103a3c4acb3f30b1e453c25c13166019995c9aaa78a', 
                         'apiSecret': '33474d29164527f162ae8ccb57109b162343bb60850427530110b243a68be737'});

// Routes
router.get('/', (req,res) => {
console.log('asdf');
});
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
router.get('/home', (req,res,next)=>{
    //if(err){
        //console.error(err);
        //res.status(500).send('Something broke!');
    //}else{
		console.log('Hello');
		// Store userID in session
		var _user = {};
		client.getCurrentUser(function(err, user) {
			_user = user;	
		});
	console.log('HEY');
        blockchainQuery.query("queryAllArt", function(allArtJSON){
		console.log('WOO');
        	allArtJSON = JSON.parse(allArtJSON);
		if (allArtJSON.length > 7){
			console.log(allArtJSON.length);
           		var sliced = allArtJSON.slice(0,7);
            		res.send(sliced);
        	}else{
		//	console.log(res2);
            		res.send(allArtJSON);//_user));
        	}
	});
	/*console.log('WOO');
        if (allArtJSON.length > 7){
            var sliced = allArtJSON.sliced(0,7);
            res.send(sliced);
        }else{
            res.send(allArtJSON.append(_user));
        } */  
    //}
});

router.get('/art/queryArtById/:artId', (err,req,res)=>{
    if(err){
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }

    const artId = req.params.artId;

    artJSON = blockchainQuery.query("queryArtById",[artId]);
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
        blockchainInvoke.invoke("list",[artId],function(success){
        if(!success){
            res.status(500).send('Could not find the art you\'re looking for!');
        }else{
             res.send(true);
        }
}
    }
});
    

router.get('/art/queryAllArt', (err,req,res) =>{
    if(err){
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }else{
        blockchainQuery.query("queryAllArt",function(allArtJSON){
        if(!allArtJSON){
            res.status(500).send('Could not find the art you\'re looking for!');
        } else{
             res.send(allArtJSON);
        }
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

        blockchainInvoke.invoke("setUpAuction", [artID, startTime, endTime],function(success){
        if (!success) {
            res.status(500).send('Could not begin the auction!');
        } else {
            res.send(true);
        }
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

        blockchainInvoke.invoke("setStatus", [artId, status],function(success){
        if (!success) {
            res.status(500).send("Could not set status!");
        } else {
            res.send(true);
        }
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

        blockchainInvoke.invoke("setPrice", [artId, price],function(success){
        if (!success) {
            res.status(500).send("Could not set price!");
        } else {
            res.send(true);
        }
}
    }
});

router.post('/search/:tag', (err,req,res)=>{
    if(err){
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }else{
        var searchTag = req.params.tag;
        blockchainInvoke.invoke("queryAllArt",function(allArtJSON){
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
    }
});

module.exports = router;
