interface FormRowProps {
  children: React.ReactNode;
  className?: string;
}

function FormRow({ children, className = '' }: FormRowProps) {
  return <div className={`flex w-full gap-x-4 ${className}`}>{children}</div>;
}

export default FormRow;
