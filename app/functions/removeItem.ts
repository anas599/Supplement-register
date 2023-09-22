function removeItemById(array, id) {
  return array.filter((item) => item.id !== id);
}
export default removeItemById;
