'use strict';

var express     = require( 'express' );
var restRouter = express.Router();
var ET_Client = require( '../lib/IET_Client' );
var helpers = require( '../lib/helpers' );


function testRest ( req, res ) {
	ET_Client.RestClient
		.get('/platform/v1/endpoints')
		.then(function(response) {
			response && res.status(response.res.statusCode).send( response.body );
		}.bind(this))
		.catch(function(err) {
			res.status(500).send( err ); //this is only hit if the error is thrown somewhere in a promise chain. Other errors will naturally return a 500 and the error message.
		}.bind(this));
};

restRouter.get( '/test-rest', function( req, res ) {
	helpers.sendCodeOrData(testRest, req, res);
});


// exporting the router
module.exports = restRouter;