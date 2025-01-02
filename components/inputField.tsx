interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  placeholder?: string;
  isSelect?: boolean;
  options?: string[];
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  isSelect = false,
  options = [],
}) => (
  <div className="flex gap-3 items-center">
    <p className="text-[rgba(255,255,255,0.33)] text-sm w-1/2">{label}:</p>
    {isSelect ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 rounded bg-[#1E2A30] text-[rgba(255,255,255,0.33)] text-right"
      >
        <option value="">Select Gender</option>
        {options.map((option: string, index: number) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 rounded bg-[#1E2A30] text-white text-right placeholder:text-[rgba(255,255,255,0.3)]"
      />
    )}
  </div>
);

export default InputField;
