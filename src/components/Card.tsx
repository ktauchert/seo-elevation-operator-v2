import React from "react";

type CardProps = {
  cardClasses?: string;
  bgColor?: string;
  header?: boolean;
  headerText?: string;
  footer?: boolean;
  footerText?: string;
  children: React.ReactNode;
};

const Card = ({
  cardClasses = "min-w-[400px] max-w-[640px]",
  bgColor = "bg-white/50 backdrop-blur-sm",
  header = true,
  headerText = "Card Header",
  footer = true,
  footerText = "Card Footer",
  children,
}: CardProps) => {
  return (
    <div
      className={`card h-auto rounded-md border shadow-md shadow-cyan-600 border-cyan-400 ${bgColor} ${cardClasses}`}
    >
      {header && (
        <div className={`card-header p-5`}>
          <div className="card-title text-xl md:text-3xl font-medium">
            {headerText}
          </div>
        </div>
      )}
      <div className="card-content p-5">{children}</div>
      {footer && <div className="card-footer p-5">{footerText}</div>}
    </div>
  );
};

export default Card;
