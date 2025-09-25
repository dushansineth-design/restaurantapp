package ui;

import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.time.Duration;

public class SignupUITest {

    private WebDriver driver;
    private WebDriverWait wait;
    private static final String BASE_URL = "http://localhost:5173";

    @BeforeEach
    public void setup() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless=new");
        options.addArguments("--window-size=1920,1080");

        driver = new org.openqa.selenium.chrome.ChromeDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @Disabled
    @Test
    public void testSignupWithValidData() {
        driver.get(BASE_URL + "/signup");

        // Fill out the form
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("username"))).sendKeys("seleniumUser");
        driver.findElement(By.id("email")).sendKeys("seleniumUser" + System.currentTimeMillis() + "@example.com");
        driver.findElement(By.id("password")).sendKeys("securePass123");
        driver.findElement(By.id("contact")).sendKeys("0771234567");
        driver.findElement(By.id("address")).sendKeys("123 Selenium Street, Colombo");

        // Submit the form
        driver.findElement(By.cssSelector("button[type='submit']")).click();

        // Wait for redirect to dashboard
        wait.until(ExpectedConditions.urlContains("/dashboard"));
        Assertions.assertTrue(driver.getCurrentUrl().contains("/dashboard"));
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}