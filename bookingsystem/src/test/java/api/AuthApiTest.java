package api;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

public class AuthApiTest {

    @Disabled
    @Test
    public void testLoginWithValidCredentials() {
        RestAssured.baseURI = "http://localhost:8080";

        Response response = given()
                .contentType("application/json")
                .body("{ \"username\": \"dushan\", \"password\": \"123456\" }")
                .when()
                .post("/api/auth/login")
                .then()
                .statusCode(200)
                .body("token", notNullValue())
                .body("user.username", equalTo("dushan"))
                .extract().response();

        System.out.println("JWT Token: " + response.path("token"));
    }
}