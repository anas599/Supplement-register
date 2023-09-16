interface TextInputProps {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  required: boolean;
  value?: string;
  onChange?: any;
}

const InputProp: React.FC<TextInputProps> = ({
  label,
  type,
  id,
  placeholder,
  required,
  value,
  onChange,
}) => {
  return (
    <div className="m-6 mx-10">
      <label
        htmlFor={id}
        className="block mb-1 text-sm font-medium text-gray-200"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default InputProp;
