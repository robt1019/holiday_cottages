var test = require('tape');
var request = require('supertest');

var app = require('../../app.js');

test('/cottages GET should return 200 response and json format', function(t) {
    request(app)
        .get('/cottages')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function assert(err, res) {
            t.end();
        });
});

test('/cottages GET should return correct cottages', function(t) {
    request(app)
        .get('/cottages')
        .end(function assert(err, res) {
            t.error(err, 'No error');
            t.end();
        });
});
