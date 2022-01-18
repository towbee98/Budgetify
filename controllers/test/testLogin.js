const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../app");

//Assertion Style TDD
const expect = chai.expect;
chai.use(chaiHttp);

describe("Authentication", () => {
  //Tests the login routes
  describe("POST /api/users/login", () => {
    it("this should authenticate an existing user and allow access to resource", (done) => {
      const details = {
        username: "adeloporo",
        password: "pass1234",
      };
      chai
        .request(app)
        .post("http://localhost:4400/api/users/login")
        .send(details)
        .end((err, response) => {
          expect(err).to.be.null;
          expect(response).to.have.status(200);
          done();
        });
    });
  });

  //Tests the signup route

  //Tests the forget password route

  //Tests the reset password
});
