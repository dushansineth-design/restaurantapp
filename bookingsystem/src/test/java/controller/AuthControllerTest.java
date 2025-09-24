package controller;

import com.restaurant.bookingsystem.controller.AuthController;
import com.restaurant.bookingsystem.dto.LoginRequest;
import com.restaurant.bookingsystem.dto.LoginResponse;
import com.restaurant.bookingsystem.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class AuthControllerTest {
    

    @Mock
    private UserService userService;

    @InjectMocks
    private AuthController authController;


    @Test
    public void testLoginSuccess() {
        LoginRequest request = new LoginRequest();
        request.setUsername("dushan");
        request.setPassword("123456");

        LoginResponse mockResponse = new LoginResponse();
        mockResponse.setToken("mock-jwt-token");
        mockResponse.setUser("dushan");

        ResponseEntity<LoginResponse> mockEntity = ResponseEntity.ok(mockResponse);

        Mockito.when(userService.loginUser(Mockito.any(LoginRequest.class)))
                .thenReturn( mockEntity);

        ResponseEntity<LoginResponse> response = authController.login(request);

        assertEquals(200, response.getStatusCodeValue());

        // safely cast because we know it's LoginResponse
        assertTrue(response.getBody() instanceof LoginResponse);
        LoginResponse body = (LoginResponse) response.getBody();

        assertNotNull(body);
        assertEquals("mock-jwt-token", body.getToken());
        assertEquals("dushan", body.getUser());
    }



}