import Link from "next/link";
import React from "react";

type Props = {
  href: string;
  text: string;
  IconImage: React.ReactNode;
};

const QuickAccess = ({ href, text, IconImage }: Props) => {
  return (
    <Link
      href={href}
      className="flex items-center p-3 bg-white/5 border border-cyan-800/50 rounded-md hover:bg-white/10 transition-colors"
    >
      {IconImage}
      {text}
    </Link>
  );
};

export default QuickAccess;
