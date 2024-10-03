import * as ex1 from '../ex1.mjs'
//import assert from 'assert'

import * as chai from 'chai'
var assert = chai.assert;
var expect = chai.expect;


// describe('Test Ex1 module', function () {
//   describe('#add function tests', function () {
    it('add should sum two numbers', function () {
        let ret = ex1.add(2,3)
        assert.equal(ret, 5);
        expect(ret).to.equal(5)
    });
    it('add should return the other if one argument is undefined', function () {
        let ret = ex1.add(2)
        assert.equal(ret, 2);
    });
//   });
// });