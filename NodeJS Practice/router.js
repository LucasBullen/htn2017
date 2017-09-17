const express = require('express');
const router = express.Router();
const request = require('request');
const cookieParser = require('cookie-parser')
// Helper functions
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var watson = require('watson-developer-cloud');
var schedule = require('node-schedule');
var visual_recognition = watson.visual_recognition({
  api_key: '9ff8d9a65b96f84e0a4fc610c12b098338997c70',
  version: 'v3',
  version_date: '2016-05-20'
});
//app.use(cookieParser());
var fs = require('fs');
var SECRET = 'sec';
var blockchainInvoke = require('../../fabric-samples/artchain/invoke');
var blockchainQuery = require('../../fabric-samples/artchain/query');
var coinApiKey = '80abb6aafe606adb604c0103a3c4acb3f30b1e453c25c13166019995c9aaa78a';
var coinApiSecret = '33474d29164527f162ae8ccb57109b162343bb60850427530110b243a68be737';
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
    res.redirect('https://www.coinbase.com/oauth/authorize?client_id=80abb6aafe606adb604c0103a3c4acb3f30b1e453c25c13166019995c9aaa78a&redirect_uri=http%3A%2F%2Fec2-52-91-43-150.compute-1.amazonaws.com%3A3000%2Fhome&response_type=code&scope%3Dwallet%3Atransactions%3Asend%26meta%5Bsend_limit_amount%5D%3D1%26meta%5Bsend_limit_currency%5D%3DUSD%26meta%5Bsend_limit_period%5D%3Dday');
});

router.get('/profile/:userId',(req,res) =>{
 var searchTag = req.params.userId;
        blockchainQuery.query("queryAllArt",function(allArtJSON){
        if(!allArtJSON){
            res.status(500).send('Could not find the art you\'re looking for!');
        } else{
                searchVideos = [];
                var searchKeys = ["author"];
                allArtJSON.forEach(function(element){
                    searchKeys.forEach(function(key){
                        if(element["Record"][key].includes(searchTag)){
                            searchVideos.push(element);
                       }
                    })

                });


                var imagePath = `./public/img/all.zip`;
                            var params = {
                            images_file: fs.createReadStream(imagePath)
                            };
                        var classifyJSON = {};
                        res.send(JSON.stringify(searchVideos, null, 2));
    }
});

});

router.get('/home/', (req,res,next)=>{
	const code = req.query.code;
	if(code) {
	console.log(code);
	request.post(
	    'https://api.coinbase.com/oauth/token',
	    { json: { code: code, grant_type: 'authorization_code',client_id: coinApiKey, client_secret:coinApiSecret, redirect_uri:'http://ec2-52-91-43-150.compute-1.amazonaws.com:3000/home' } },
	    function (error, response, body) {
	        if (!error && response.statusCode == 200) {
	            console.log(body)
		   // var jBody = JSON.parse(body);
		    var access_token =body['access_token'];

blockchainQuery.query("queryAllArt", function(allArtJSON){
                allArtJSON = allArtJSON;
                if (allArtJSON.length > 7){
                        console.log(allArtJSON.length);
                        var sliced = allArtJSON.slice(0,7);
                        res.send('<pre>'+JSON.stringify({Art:sliced,access_token:access_token}, null, 2)+'</pre>');
                }else{
                        res.send('<pre>'+JSON.stringify({Art:allArtJSON,access_token:access_token}, null, 2)+'</pre>');//_user));
                }
        });

}}	);
                // Store userID in sessio   
//        var _user = {};
 //       client.getCurrentUser(function(err, user) {
 //              _user = user;
  //      });
}else{
        blockchainQuery.query("queryAllArt", function(allArtJSON){
                allArtJSON = allArtJSON;
                if (allArtJSON.length > 7){
                        console.log(allArtJSON.length);
                        var sliced = allArtJSON.slice(0,7);
                        res.send('<pre>'+JSON.stringify({Art:sliced}, null, 2)+'</pre>');
                }else{
                        res.send('<pre>'+JSON.stringify({Art:allArtJSON}, null, 2)+'</pre>');//_user));
                }
        });
}});

router.get('/homeOLD', (req,res,next)=>{
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
        	allArtJSON = allArtJSON;
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

router.get('/art/:artId', (req,res)=>{
    	const artId = req.params.artId;
 	blockchainQuery.query("queryAllArt",function(allArtJSON){
                if(!allArtJSON){
                    res.status(500).send('Could not find the art you\'re looking for!');
                } else{
                        allArtJSON.forEach(function(element){
                                if(element["Key"].includes(artId)){
					res.send('<pre>'+JSON.stringify(element, null, 2)+'</pre>');
				}else{
					res.status(500).send('Could not find the art you\'re looking for!');
				}
			});
		}
	});
});

router.post('/art/list/:artId', (req,res) =>{
        const artId = req.params.artId;
        blockchainInvoke.invoke("list",[artId],function(success){
        if(!success){
            res.status(500).send('Could not find the art you\'re looking for!');
        }else{
             res.send(true);
        }
});
    //}
});

router.post('/art/bid/:artId/:userId/:token/:bcnAmount', (req,res) =>{
   // if(err){
   //     console.error(err.stack);
   //     res.status(500).send('Something broke!');
   // }else{
    const artId = req.params.artId;
	const userId = req.params.userId;
	const token = req.params.token;
	const bcnAmount = req.params.bcnAmount;

	blockchainQuery.query("queryAllArt",function(allArtJSON){
	        if(!allArtJSON){
	            res.status(500).send('Could not find the art you\'re looking for!');
	        } else{
	                var searchKeys = ["userId"];
	                allArtJSON.forEach(function(element){
        				if(element["Key"].includes(artId)){
                            //console.log(element);
        					const lastUserId = element["Record"]["highest_bidder_id"];
        					const lastBid = element["Record"]["bcn_value"];
        					const owner = element["Record"]["owner_id"];

                            var toOwner = parseFloat(bcnAmount);
                            if(lastBid){
                                toOwner -=parseFloat(lastBid);
                            }
                            console.log(owner);
                            console.log(lastBid);
                            console.log(toOwner);
                            console.log(bcnAmount);
                            console.log(token);
                            request.post('https://api.coinbase.com/v2/accounts/BTC/transactions',
                                { json: { type: "send", to: "1337YoDVaBUz6BnNi3V9MYp3CnwLf8zwhV", amount: 0.000001, currency:"BTC"/*toOwner*/ },
                                 headers: {
                                    'Authorization': "Bearer "+token
                                 } },
                                function (error, response, body) {
                                    if (!error && response.statusCode == 200) {
                                        console.log(body);
                                    }else{
                                        console.log(body);
                                    }
                            });

                            request.post('https://api.coinbase.com/v2/accounts/BTC/transactions',
                                { json: { type: "transfer", to: lastUserId, amount: parseFloat(lastBid) },
                                 headers: {
                                    'Authorization': "Bearer "+token
                                 }  },
                                function (error, response, body) {
                                    if (!error && response.statusCode == 200) {
                                        console.log(body);
                                    }else{
                                        console.log("2b:"+response.statusCode);
                                    }
                            });
                            return;
                        }
                    });
    		}
    });
    blockchainInvoke.invoke("bid",[artId, userId, bcnAmount],function(success){
    if(!success){
        res.status(500).send('Could not find the art you\'re looking for!');
    }else{
         res.send(true);
    }
    });
});

router.get('/public/image/:image', (req,res,next) =>{
    const image = req.params.image;
var img = fs.readFileSync('../art/'+image);
     res.writeHead(200, {'Content-Type': 'image/jpg' });
     res.end(img, 'binary');
             res.send();
});

router.get('/art/queryAllArt', (req,res,next) =>{
  //  if(err){
   //     console.error(err.stack);
   //     res.status(500).send('Something broke!');
   // }else{
        blockchainQuery.query("queryAllArt",function(allArtJSON){
        if(!allArtJSON){
            res.status(500).send('Could not find the art you\'re looking for!');
        } else{
             res.send(allArtJSON);
        }
        });
    //}
});

router.post('/art/auctionSetUp/:artID/:startTime/:endTime/:startingBid', (req,res) =>{
   // if(err){
    //    console.error(err.stack);
    //    res.status(500).send('Something broke!');
  //  }else{
        const artId = req.params.artID;
        const startTime = req.params.startTime;
        const endTime = req.params.endTime;
        const startingBid = req.params.startingBid;
	var d = new Date(endTime);
	var time = d.getSeconds()+' '+d.getMinutes()+' '+d.getHours()+' '+d.getDate()+' '+(1+d.getMonth())+ ' *';
	var j = schedule.scheduleJob(time, function(){
		//console.log('The answer to life, the universe, and everything!');
        blockchainInvoke.invoke("endAuction", [artId],function(success){
        });
    });
        blockchainInvoke.invoke("setUpAuction", [artId, startTime+'', endTime+'', startingBid+''],function(success){
    if (!success) {
            res.status(500).send('Could not end the auction!');
        } else {
            res.send(true);
        }
});
    //}
});

router.post('/art/setStatus/:artId/:status', (req,res) =>{
   // if(err){
    //    console.error(err.stack);
    //    res.status(500).send('Something broke!');
   // }else{
        const artId = req.params.artId;
        const status = req.params.status;

        blockchainInvoke.invoke("setStatus", [artId, status],function(success){
        if (!success) {
            res.status(500).send("Could not set status!");
        } else {
            res.send(true);
        }
});
    //}
});

router.post('/art/setPrice/:artId/:price', (req,res) =>{
   // if(err){
    //    console.error(err.stack);
    //    res.status(500).send('Something broke!');
    //}else{
        const artId = req.params.artId;
        const price = req.params.price;

        blockchainInvoke.invoke("setPrice", [artId, price],function(success){
        if (!success) {
            res.status(500).send("Could not set price!");
        } else {
            res.send(true);
        }
});
//    }
});

router.get('/search/:tag', (req,res,next)=>{
        var searchTag = req.params.tag;
        blockchainQuery.query("queryAllArt",function(allArtJSON){
        if(!allArtJSON){
            res.status(500).send('Could not find the art you\'re looking for!');
        } else{
                searchVideos = [];
                var gelement= allArtJSON[0];
                var searchKeys = ["name","author","description"];
                allArtJSON.forEach(function(element){

                    searchKeys.forEach(function(key){
                        if(element["Record"][key].includes(searchTag)){
                            searchVideos.push(element);
 	               }
		    })



        });

                var imagePath = `./public/img/all.zip`;
                            var params = {
                            images_file: fs.createReadStream(imagePath)
                            };
                        var classifyJSON = {};
            visual_recognition.classify(params, function(err, res2) {
                                if (err)
                                    console.log(err);
                                else{
                                    classifyJSON = res2;//JSON.stringify(res2, null, 2);
                                //console.log(JSON.stringify(res2, null, 2));
                            var classes = classifyJSON['images'][0]['classifiers'][0]['classes'];
                            try{
                classes.forEach(function(bucket){
                                //console.log(bucket['class'],"and",searchTag);
                if(bucket['class'].includes(searchTag)){
                                    searchVideos.push(gelement);
                                    throw BreakException;
                                }
                            })
                        }catch (e){
                            //tee
                        }
                         res.send("<pre>"+JSON.stringify(searchVideos, null, 2)+"</pre>");
                                    return;
                                }

        });
    }
});
});
module.exports = router;
