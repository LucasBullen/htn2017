var watson = require('watson-developer-cloud');
var visual_recognition = watson.visual_recognition({
  api_key: '9ff8d9a65b96f84e0a4fc610c12b098338997c70',
  version: 'v3',
  version_date: '2016-05-20'
});

var fs = require('fs');

var classify = function (imagePath){
        var params = {
            images_file: fs.createReadStream(imagePath)
        };

        visual_recognition.classify(params, function(err, res) {
        if (err)
            console.log(err);
        else{
            console.log(JSON.stringify(res, null, 2));
            return (JSON.stringify(res, null, 2));
        }
            
    });
}

module.exports.classify = classify;
