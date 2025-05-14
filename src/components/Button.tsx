import { type HtmlHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isActive: boolean;
  [props: string]: any;
}

function Button({ children, isActive, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`px-2 py-1 border-2 shadow-2xl bg-blue-400 ${
        isActive ? "text-white bg-blue-400" : "bg-white text-blue-400"
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
