import { Control, useController } from 'react-hook-form';
import { Unit } from '~/types';

interface FormSelectProps {
  control: Control<any>;
  title: string;
  name: string;
  required?: boolean;
  options?: Unit[];
}
function FormSelect({ control, name, title, required, options = [] }: FormSelectProps) {
  const { field } = useController({
    control,
    name,
  });
  return (
    <div className="flex flex-col w-full mb-5 font-semibold gap-y-1 ">
      <label className="text-sm font-body text-icon">
        {title}
        {required && <strong className="text-error"> *</strong>}
      </label>
      <select
        className="text-sm flex-1 w-full px-4 py-[10px] font-body border outline-none rounded-md transition-all focus:border-primary40 text-icon cursor-pointer hover:border-primary60"
        {...field}
      >
        {field.value && (
          <option defaultValue={field.value} className="font-semibold" hidden>
            {field.value}
          </option>
        )}
        {options.map((item, index) => (
          <option value={item.value} key={index} className="font-semibold">
            {item.value}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FormSelect;
