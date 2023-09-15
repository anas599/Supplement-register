import InputProp from '../component/inputProp';
const AddForm = () => {
  return (
    <>
      <form>
        <InputProp
          label="Item Name"
          type="text"
          id="item-name"
          placeholder="Item Name"
          required={true}
        />
        <InputProp
          label="Brand"
          type="text"
          id="Brand"
          placeholder="Brand"
          required={true}
        />
        <InputProp
          label="Price"
          type="number"
          id="item-price"
          placeholder="Price"
          required={true}
        />
        <InputProp
          label="Size eg. 1kg, 1L, 1m"
          type="text"
          id="item-size"
          placeholder="Size eg. 1kg, 1L, 1m"
          required={true}
        />
        <InputProp
          label="Quantity"
          type="number"
          id="item-quantity"
          placeholder="Quantity"
          required={true}
        />
        <InputProp
          label="Flavor"
          type="text"
          id="Flavor"
          placeholder="Flavor"
          required={true}
        />
        <InputProp
          label="expiry date"
          type="date"
          id="expiry-date"
          placeholder="expiry date"
          required={true}
        />
        <InputProp
          label="picture"
          type="file"
          id="picture"
          placeholder="picture"
          required={false}
        />
      </form>
    </>
  );
};

export default AddForm;
