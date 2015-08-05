var client = require('swagger-client');
var swagger = require('./swagger.json');

var swagger = new client({
  spec: swagger,
  success : function(){
    swagger.clientAuthorizations.add("apikey", new client.PasswordAuthorization("api", "key-5040ae13dde2c7d5a73f8081304f5262"));

    swagger.Domains.getDomains({}, function (domains) {
      domains.obj.items.forEach(function(item){
        console.log(item.name + ' (' + item.type + ')');
      });
    });
  }
});
