package service;

import com.restaurant.bookingsystem.entity.Category;
import com.restaurant.bookingsystem.entity.FoodItem;
import com.restaurant.bookingsystem.repository.FoodItemRepository;
import com.restaurant.bookingsystem.service.FoodItemService;
//import org.junit.experimental.categories.Category;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import com.restaurant.bookingsystem.*;

import java.math.BigDecimal;

import static com.restaurant.bookingsystem.entity.Category.MAIN_COURSE;

@ExtendWith(MockitoExtension.class)
public class FoodItemServiceTest {

    @Mock
    private FoodItemRepository foodItemRepository;

    @InjectMocks
    private FoodItemService foodItemService;

    @Disabled
    @Test
    public void testAddFoodItem() {
        FoodItem item = new FoodItem();
        item.setName("Selenium Pizza");
        item.setPrice(BigDecimal.valueOf(15.99));
        item.setDescription("Automated test pizza");
        item.setCategory(MAIN_COURSE);
        item.setImageUrl("test-image.jpg");
        item.setIsAvailable(true);

        Mockito.when(foodItemRepository.save(Mockito.any(FoodItem.class))).thenReturn(item);

        FoodItem saved = foodItemService.save(item);

        Assertions.assertNotNull(saved);
        Assertions.assertEquals("Selenium Pizza", saved.getName());
        Assertions.assertEquals(BigDecimal.valueOf(15.99), saved.getPrice());
    }
}