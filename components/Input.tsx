import { useState } from "react";

interface InputItemProps {
  placeholder: string;
  sx?: string;
  register: Function;
  getValues: Function;
  error?: any;
  isPassword?: boolean;
  disabled?: boolean;
}

const Input: React.FC<InputItemProps> = ({
  disabled,
  isPassword,
  getValues,
  error,
  register,
  placeholder,
  sx,
}) => {
  const [value, setValue] = useState<boolean>(getValues()[placeholder]);
  return (
    <div className="relative">
      <input
        disabled={disabled}
        {...register(placeholder)}
        id={placeholder}
        type={isPassword ? "password" : "text"}
        placeholder=" "
        onBlur={() =>
          getValues()[placeholder] ? setValue(true) : setValue(false)
        }
        className={`
          block
          cursor-text
          bg-gray-800
          text-white 
          px-6 pt-6 pb-1
          w-full
          text-md
          rounded-md 
          focus:outline-none 
          focus:ring-2
          peer
          focus:bg-gray-700
          disabled:opacity-40
          disabled:cursor-not-allowed
          ${sx}`}
      />
      <label
        htmlFor={placeholder}
        className={`
            absolute
            transition-all
            duration-200
            peer-focus:top-0
            peer-focus:text-sm peer-focus:px-2
            peer-focus:py-1
            peer-focus:text-gray-500
            peer-placeholder-shown:scale-100
            capitalize  
            ${
              !value
                ? "top-0 left-0 px-6 py-3.5 text-gray-400 text-md"
                : "top-0 text-gray-500 scale-100 px-2 py-1 text-sm"
            }
              ${error && value && "text-red-600"}
              `}
      >
        {error && value
          ? error
          : placeholder.replace(/([a-z])([A-Z])/g, "$1 $2")}
      </label>
    </div>
  );
};

export default Input;
