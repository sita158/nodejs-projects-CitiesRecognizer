var express = require("express"),
    app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.get("/vr-analyze", function (request, response) {
    //console.log("In server.js");
  var photo_url = request.query.photo_url;

  if(photo_url != ""){
      var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
      var fs = require('fs');

      var visualRecognition = new VisualRecognitionV3({
          version: '2018-03-19',
          api_key: '228d60261a5fb06b5c3a608e81781acfa942d022'
      });

      //var images_file = fs.createReadStream('./fruitbowl.jpg');
      var owners = ["me"];

      var params = {
          url: photo_url,
          owners: owners
      };

      visualRecognition.classify(params, function(err, resp) {
        if (err)
          console.log(err);
        else
        {
            var classList = "";
            console.log("Response: " + JSON.stringify(resp, null, 2));
            classifiers = resp.images[0].classifiers;
            
            classifiers.forEach(function(element) {
                if(classList != "")
                    classList += ", "
                classes = element.classes;
                console.log("Classes: " + JSON.stringify(classes));
                classList += JSON.stringify(classes);
            });
            
            response.end("Classification: " + classList);
        }
      });   
  }
  else{
        response.end("No URL provided");
  }
});

app.listen(port);
console.log("Listening on port ", port);

require("cf-deployment-tracker-client").track();
