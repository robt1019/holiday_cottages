var expect = require('chai').expect;
var request = require('superagent');

var app = require('../../app.js');
var port = 3000;
var baseUrl = 'localhost:' + port;

describe('app', function() {
    describe('/cottages', function() {
        it('should return a 200 status for GET request', function(done) {
            request.get(baseUrl + '/cottages').end(function assert(err, res) {
                expect(res).to.have.property('status', 200);
                done();
            });
        });
    });
});
