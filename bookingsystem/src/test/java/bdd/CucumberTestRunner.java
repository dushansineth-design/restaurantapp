package com.restaurant.bookingsystem.bdd;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.jupiter.api.Disabled;
import org.junit.runner.RunWith;
@Disabled
@RunWith(Cucumber.class)
@CucumberOptions(
        features = "src/test/resources/features",
        glue = "com.restaurant.bookingsystem.bdd"
)
public class CucumberTestRunner {
}