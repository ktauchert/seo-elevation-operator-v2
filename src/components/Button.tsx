import React from "react";

type Props = {
  onClick: () => void;
  buttonText: string;
  buttonType: "button" | "submit" | "reset";
  children?: React.ReactNode;
};

const Button = (props: Props) => {
  return (
    <button
      className="py-2 px-4 rounded-lg shadow-md bg-slate-200 hover:bg-slate-100 hover:text-orange-500 hover:shadow-none"
      onClick={() => props.onClick()}
      type={props.buttonType}
    >
      <span>{props.children ?? props.buttonText}</span>
    </button>
  );
};

export default Button;
