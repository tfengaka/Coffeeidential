import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillEditorProps {
  value: string;
  defaultValue?: string;
  onChange: (value: string) => void;
}

function QuillEditor({ value, defaultValue, onChange }: QuillEditorProps) {
  return <ReactQuill theme="snow" value={value} onChange={onChange} defaultValue={defaultValue} />;
}

export default QuillEditor;
