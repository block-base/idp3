"use client";

export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-4 rounded disabled:opacity-50 ${props.className}`}
    >
      {props.children}
    </button>
  );
};
