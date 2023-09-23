// Sample array of objects
const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 2, name: 'Item 2' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

// Flag to track if an item has been removed during the current click
let itemRemoved = false;

// Function to remove an item by its id
function removeItemById(id) {
  if (!itemRemoved) {
    // Find the index of the item with the matching id
    const indexToRemove = items.findIndex((item) => item.id === id);

    if (indexToRemove !== -1) {
      // Remove the item from the array
      items.splice(indexToRemove, 1);
      itemRemoved = true; // Set the flag to true to prevent further removals in this click
      console.log(`Item with id ${id} removed.`);
    } else {
      console.log(`Item with id ${id} not found.`);
    }
  }
}

// Example usage:
// console.log(removeItemById(2)); // This will remove Item 2
// console.log(removeItemById(2)); // This won't remove anything because the flag is set to true
console.log(removeItemById(2)); // This won't remove anything because the flag is set to true
console.log(removeItemById(2)); // This won't remove anything because the flag is set to true
console.log(removeItemById(3)); // This will remove Item 3
console.log(items);
