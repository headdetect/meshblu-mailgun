var client = require('swagger-client');
var swagger = require('./swagger.json');
var _ = require('lodash');

var swagger = new client({
  spec: swagger,
  success : function(){
    swagger.clientAuthorizations.add("apikey", new client.PasswordAuthorization("api", "key-11365fda6b34172b1185ec480414680"));

     console.log('Swagger Api Functions', swagger.apis.Domains.operations);
     console.log('Swagger Object Definition', swagger);
    // swagger.Domains.getDomains({}, function (domains) {
    //   domains.obj.items.forEach(function(item){
    //     console.log(item.name + ' (' + item.type + ')');
    //   });
    // });


  }
});
