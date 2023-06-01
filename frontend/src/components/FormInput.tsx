import { Control, useController } from 'react-hook-form';

interface IFormInputProps {
  control: Control<any>;
  name: string;
  type?: string;
  title?: string;
  error?: string;
  placeholder?: string;
  defaultValue?: string | number;
  required?: boolean;
  icon?: React.ReactNode;
  disable?: boolean;
  className?: string;
}

function FormInput({
  control,
  name,
  title,
  type = 'text',
  required,
  defaultValue,
  error,
  icon,
  className = '',
  ...rest
}: IFormInputProps) {
  const { field } = useController({
    control,
    name,
    defaultValue: defaultValue || '',
  });
  return (
    <div className="flex flex-col w-full mb-5 gap-y-1">
      <div className="flex items-center justify-between">
        {title && (
          <label htmlFor={name} className="text-sm font-bold text-icon">
            {title}
            {required && <strong className="text-error"> *</strong>}
          </label>
        )}
        {(error || !field.value) && <p className="text-xs font-semibold pointer-events-none text-error">{error}</p>}
      </div>
      <div className="flex items-center">
        {icon && (
          <div className="text-icon px-4 py-2 bg-gray-100 border border-r-0 border-[#d1d2d] rounded-s-md">{icon}</div>
        )}
        <input
          type={type}
          id={name}
          className={`flex-1 w-full px-4 py-[10px] border outline-none transition-all placeholder:font-medium disabled:bg-[#eeeff8] disabled:border-transparent text-sm font-semibold ${
            icon ? 'rounded-e-md' : 'rounded-md'
          } ${
            error
              ? 'border-error focus:shadow-invalid'
              : 'border-[#d1d2d] hover:border-primary60 focus:border-primary40'
          }	${className}`}
          {...rest}
          {...field}
        />
      </div>
    </div>
  );
}

export default FormInput;
