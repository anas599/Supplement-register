function removeItemById(array: any, id: any) {
  return array.filter((item: { id: any }) => item.id !== id);
}
export default removeItemById;
