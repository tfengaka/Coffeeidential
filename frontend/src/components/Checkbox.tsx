interface CheckBoxProps {
  label: string;
  name: string;
  value: boolean;
  onClick: () => void;
}

function Checkbox({ name, label, value, onClick }: CheckBoxProps) {
  return (
    <div className="relative min-h-[1.5rem]">
      <input
        type="checkbox"
        name={name}
        id={name}
        className="absolute left-0 w-5 h-5 opacity-0 -z-10"
        value={String(value)}
        checked={value}
        onChange={onClick}
      />
      <label htmlFor={name} className="flex items-center cursor-pointer select-none text-icon">
        <span
          className={`relative inline-block w-[18px] h-[18px] mr-2 border rounded-sm cursor-pointer ${
            value ? 'bg-primary40 border-transparent' : 'border-[#d1d2d] bg-transparent'
          }`}
        >
          {value && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="absolute w-4 h-4 text-white transform -translate-x-1/2 -translate-y-1/2 rounded-md top-1/2 left-1/2"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </span>
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
