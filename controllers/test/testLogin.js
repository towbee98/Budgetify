const chai = require("chai");
//const chaiHttp = require("chai-http");
//const app = require("../../app");
const request = require("supertest");
const server = require("../../server");

//Assertion Style BDD
const expect = chai.expect;
const assert = chai.assert;
let details, passLength, passConfimrLength;
let conn = request(server);
describe("Authentication", () => {
  //Tests the login routes
  describe("POST /api/users/login", function () {
    beforeEach(function () {
      details = {
        username: "Adeloporo",
        password: "pass1234",
      };
    });
    it("this checks the type of data supplied by the user for authentication", function (done) {
      expect(details).to.be.an("Object", "The details must be an object type");
      expect(details.username).to.be.a("String");
      expect(details.password).to.have.lengthOf(8);
      done();
    });
    it("this should authenticate a user and allow access to resource", function (done) {
      conn
        .post("/api/users/login")
        .send(details)
        .end(function (err, res) {
          //if (err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  //Tests the signup route
  describe("POST /api/users/signUp", function () {
    beforeEach(function () {
      details = {
        firstName: "sayo",
        lastName: "odunlade",
        email: "segunmakin@example.com",
        username: "senpaidere",
        password: "mascotobi97",
        passwordConfirm: "mascotobi97",
      };
      passLength = details.password.length;
    });
    it("this checks the type of data supplied by a new user for registration", function (done) {
      expect(details.firstName).to.be.a("String");
      expect(details.lastName).to.be.a("String");
      expect(details.email).to.be.a("String");
      expect(details.username).to.be.a("String");
      assert.exists(details.username, "username is neither null nor undefined");
      assert.exists(details.email, "email is neither null nor undefined");
      assert.exists(details.password, "password is neither null nor undefined");
      assert.exists(
        details.passwordConfirm,
        "password is neither null nor undefined"
      );
      assert.isAtLeast(
        passLength,
        8,
        `Length of password must be greater or equal to 8`
      );
      assert.deepEqual(
        details.password,
        details.passwordConfirm,
        "password is equal to passwordconfirm"
      );
      done();
    });
    it("this tests the signup functionality of the appication", function (done) {
      conn
        .post("/api/users/signUp")
        .send(details)
        .expect(201)
        .end(function (err, res) {
          //expect(res.status).to.equal(200);
          if (err) return done(err);
          return done();
        });
    });
  });

  //Tests the forget password route

  //Tests the reset password
});
