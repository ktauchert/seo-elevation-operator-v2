import React, { PropsWithChildren } from "react";

type Props = {};

const ElevationLayout = (props: PropsWithChildren) => {
  return (
    <div id="elevation" className="w-full h-full flex flex-col items-center">
      {props.children}
    </div>
  );
};

export default ElevationLayout;
