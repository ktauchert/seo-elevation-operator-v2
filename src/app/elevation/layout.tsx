import ProtectedRoute from "@/components/ProtectedRoute";
import React, { PropsWithChildren } from "react";

type Props = {};

const ElevationLayout = (props: PropsWithChildren) => {
  return (
    <div id="elevation" className="w-full h-full flex flex-col items-center">
      <ProtectedRoute>{props.children}</ProtectedRoute>
    </div>
  );
};

export default ElevationLayout;
