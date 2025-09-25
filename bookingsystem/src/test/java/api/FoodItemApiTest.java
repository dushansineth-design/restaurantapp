package api;

import io.restassured.RestAssured;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

public class FoodItemApiTest {

    @Disabled
    @Test
    public void testAccessFoodItemsWithoutToken() {
        RestAssured.baseURI = "http://localhost:8080";

        given()
                .accept("application/json")
                .when()
                .get("/api/food-items")
                .then()
                .statusCode(401) // or 403 depending on your security config
                .body("message", containsString("Unauthorized"));
    }
}