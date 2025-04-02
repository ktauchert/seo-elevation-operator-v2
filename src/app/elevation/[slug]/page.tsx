import React from "react";

const ViewElevation = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-4 border rounded-md shadow-md bg-white">
        <h2 className="text-xl font-bold">Elevation Details</h2>
        <p>{slug}</p>
      </div>
    </div>
  );
};

export default ViewElevation;
