Feature: Create Food Item

  Scenario: Successfully create a food item with valid details
    Given the user provides valid food item details
    When the user submits the food item to the system
    Then the system should respond with status 201 Created