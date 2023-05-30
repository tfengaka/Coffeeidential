interface ITextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  name?: string;
  error?: string;
  required?: boolean;
  disable?: boolean;
  className?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextField({
  name,
  title,
  error,
  required,
  className = '',
  defaultValue,
  disable,
  onChange,
  value,
  ...rest
}: ITextFieldProps) {
  return (
    <div className="flex flex-col w-full mb-5 gap-y-1">
      {title && (
        <label htmlFor={name} className="text-sm font-semibold text-icon">
          {title}
          {required && <strong className="text-error"> *</strong>}
        </label>
      )}

      {disable ? (
        <div
          className={`text-sm flex-1 w-full px-4 py-[10px] font-semibold rounded-md bg-[#eeeff8] min-h-[40px] text-icon2 ${className}`}
        >
          <p>{value}</p>
        </div>
      ) : (
        <input
          id={name}
          className={`text-sm flex-1 w-full px-4 py-[10px] font-semibold border outline-none rounded-md transition-all focus:border-primary20 disabled:bg-[#eeeff8] disabled:border-transparent placeholder:font-medium ${
            error
              ? 'border-error focus:shadow-invalid'
              : 'border-[#d1d2d] hover:border-primary60 focus:border-primary40'
          }	${className}`}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          {...rest}
        />
      )}
    </div>
  );
}

export default TextField;
