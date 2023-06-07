import { Control, useController } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillEditorProps {
  control: Control<any>;
  name: string;
  title?: string;
  required?: boolean;
  error?: string;
}

function QuillEditor({ control, name, title, required, error }: QuillEditorProps) {
  const { field } = useController({ control, name });
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="block text-sm font-semibold font-body text-icon">
          {title} {required && <strong className="text-error">*</strong>}
        </span>
        {(error || !field.value) && <p className="text-sm font-semibold pointer-events-none text-error">{error}</p>}
      </div>
      <ReactQuill
        theme="snow"
        value={field.value}
        onChange={field.onChange}
        className={`rounded-[5px] border ${error ? 'border-error' : 'border-slate-50'}`}
      />
    </div>
  );
}

export default QuillEditor;
