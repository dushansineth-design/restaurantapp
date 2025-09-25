package ui;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class LoginUITest {

    private WebDriver driver;

    @BeforeEach
    public void setup() {
        ChromeOptions options = new ChromeOptions();
        //options.addArguments("--headless=new");
        options.addArguments("--window-size=1920,1080");

        driver = new org.openqa.selenium.chrome.ChromeDriver(options); // no WebDriverManager
        driver.get("http://localhost:5173/login");
    }

    @Disabled
    @Test
    public void testLoginWithValidCredentials() {
        driver.findElement(By.id("username")).sendKeys("dushan");
        driver.findElement(By.id("password")).sendKeys("123456");
        driver.findElement(By.cssSelector("button[type='submit']")).click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
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