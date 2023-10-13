type ItemProps = {
  id: string;
  name: string;
  count: number;
  increaseCount: (id: string) => void;
  handleRemove: (id: string) => void;
};

const Item = ({ id, name, count, increaseCount, handleRemove }: ItemProps) => {
  return (
    <div>
      <span>{name}</span>
      <button onClick={() => increaseCount(id)}>+</button>
      <span>{count}</span>
      <button onClick={() => handleRemove(id)}>Remove</button>
    </div>
  );
};
export default Item;
