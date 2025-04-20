import React from "react";

type Props = {
  onClick: () => void;
  buttonText: string;
  buttonType: "button" | "submit" | "reset";
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

const Button = (props: Props) => {
  return (
    <button
      className={`py-2 px-4 rounded-lg shadow-md bg-slate-200 hover:bg-slate-100 text-cyan-700 hover:text-orange-500 hover:shadow-none disabled:opacity-50 ${props.className}`}
      onClick={() => props.onClick()}
      type={props.buttonType}
      disabled={props.disabled}
    >
      <span>{props.children ?? props.buttonText}</span>
    </button>
  );
};

export default Button;
