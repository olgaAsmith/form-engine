interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  type: 'button' | 'submit';
}

export default function Button({ children, onClick, type }: ButtonProps) {
  return (
    <button
      className='h-[50px] border border-green-200 bg-green-700 rounded-lg py-2 px-4 hover:bg-green-900 transition '
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
