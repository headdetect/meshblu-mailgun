var client = require('swagger-client');
var swaggerRaw = require('./swagger.json');
var swagger = new client({
  spec: swaggerRaw,
  success : function(){
    swagger.clientAuthorizations.add("apikey", new client.PasswordAuthorization("api", "<insert mailgun key>"));
    swagger.apis.Domains.getDomains();
  }
});
