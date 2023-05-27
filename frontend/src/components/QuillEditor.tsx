import { Control, useController } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillEditorProps {
  control?: Control<any>;
  name: string;
}

function QuillEditor({ control, name }: QuillEditorProps) {
  const { field } = useController({ control, name });
  return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />;
}

export default QuillEditor;
