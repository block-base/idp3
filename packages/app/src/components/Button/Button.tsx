export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${props.className}`}
    >
      {props.children}
    </button>
  );
};
