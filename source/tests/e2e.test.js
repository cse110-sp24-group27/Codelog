// Tests that cover basic User interactions

//First visit journal webpoage
describe('Basic user flow for Website', () => {
  beforeAll(async () => {
      await page.goto('https://cse110-sp24-group27.github.io/cse110-sp24-group27/');
  });

  // Test Example
  test('example test', () => {
    expect(1 + 2).toBe(3)
  })
});

// Journal Entries
// 1. Add journal entry
// 2. Edit journal entry
// 3. Delete journal entry
// 4. Public or Private Entry

// Tags
// 5. Add custom tags
// 6. Add multiple tags
// 7. Delete custom tags
// 8. Change tag color

// View Project journals
// 9. Filter projects

// Navigation bar
// 10. Test navigation bar functionality

// Settings Tab
// 11. Update user profile

// Additional tabs
// 12. Test additional tabs functionality

// Refresh
// 13. Refresh and test change in data

// Toggle public and private
// 17. Toggle public and private entry

// Test Multiple Tags
// 18. Test adding multiple tags to entries

// Detailed Comments for Each Test

// Journal Entries
// 1. Add journal entry
// Add a new journal entry and verify it is added correctly

// 2. Edit journal entry
// Edit an existing journal entry and verify the changes are saved

// 3. Delete journal entry
// Delete a journal entry and ensure it is removed

// 4. Public or Private Entry
// Toggle the visibility of a journal entry between public and private and verify the change

// Tags
// 5. Add custom tags
// Add a custom tag to a journal entry and verify it is saved

// 6. Add multiple tags
// Add multiple tags to a single journal entry and verify they are saved

// 7. Delete custom tags
// Delete a custom tag from a journal entry and ensure it is removed

// 8. Change tag color
// Change the color of a tag and verify the change is applied

// View Project journals
// 9. Filter projects
// Filter journal entries by project and verify the correct entries are displayed

// Navigation bar
// 10. Test navigation bar functionality
// Test the navigation bar links and ensure they navigate to the correct pages

// Settings Tab
// 11. Update user profile
// Update the user profile information and verify the changes are saved

// Additional tabs
// 12. Test additional tabs functionality
// Verify the functionality of any additional tabs in the application

// Refresh
// 13. Refresh and test change in data
// Refresh the page and ensure that all data persists correctly

// Templates
// 14. Add template
// Add a new template and verify it is saved correctly

// 15. Edit template
// Edit an existing template and verify the changes are saved

// 16. Delete template
// Delete a template and ensure it is removed

// Toggle public and private
// 17. Toggle public and private entry
// Toggle the visibility of an entry and ensure it updates correctly

// Test Multiple Tags
// 18. Test adding multiple tags to entries
// Add multiple tags to journal entries and verify they are correctly assigned.

// Templates Removed
