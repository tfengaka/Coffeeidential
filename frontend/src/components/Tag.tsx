interface TagProps {
  text: string;
  type: 'success' | 'info' | 'danger';
}

const styles = {
  success: 'bg-[rgba(84,184,98,0.2)] text-primary',
  info: 'bg-[rgba(17,197,219,0.2)] text-info',
  danger: 'bg-error bg-opacity-20 text-error',
};

function Tag({ text, type }: TagProps) {
  return <div className={`inline-flex px-2 py-1 text-xs font-bold rounded-md select-none ${styles[type]}`}>{text}</div>;
}

export default Tag;
