import { Control, useController } from 'react-hook-form';
import { Unit } from '~/types';

interface FormSelectProps {
  control: Control<any>;
  title: string;
  name: string;
  required?: boolean;
  options?: Unit[];
  error?: string;
  disabled?: boolean;
}
function FormSelect({ control, name, title, required, options = [], error, disabled }: FormSelectProps) {
  const { field } = useController({
    control,
    name,
  });
  return (
    <div className="flex flex-col w-full mb-5 font-semibold gap-y-1 ">
      <div className="flex items-center justify-between">
        {title && (
          <label htmlFor={name} className="text-sm font-bold text-icon">
            {title}
            {required && <strong className="text-error"> *</strong>}
          </label>
        )}
        {error && !field.value && <p className="text-sm font-semibold pointer-events-none text-error">{error}</p>}
      </div>
      <select
        className={`text-sm flex-1 w-full px-4 py-[10px] font-body border outline-none rounded-md transition-all text-icon cursor-pointer ${
          error ? 'border-error focus:shadow-invalid' : 'border-[#d1d2d] hover:border-primary60 focus:border-primary40'
        } disabled:bg-[#eeeff8] disabled:border-none disabled:cursor-auto `}
        disabled={disabled}
        {...field}
      >
        <option hidden></option>
        {options.map((item, index) => (
          <option value={item._id} key={index} className="font-semibold">
            {item.value}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FormSelect;
