"use client";
import React, { useEffect, useState } from "react";
import { useSEOContext } from "@/context/SEOContext";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import DataTable from "@/components/DataTable";

const SummaryPage = () => {
  const [list, setList] = useState<any[]>([]);
  const { data: session } = useSession();

  if (!session) {
    redirect("/login");
  }

  const { getElevations } = useSEOContext()!;

  useEffect(() => {
    const fetchElevations = async () => {
      const elevations = await getElevations();
      if (elevations) {
        setList(
          elevations.map((elevation: any) => ({
            ...elevation,
            updatedAt: new Date(
              elevation.updatedAt._seconds * 1000 +
                elevation.updatedAt._nanoseconds / 1e6
            ).toLocaleString(), // Format Firestore Timestamp
          }))
        );
      }
    };
    fetchElevations();
  }, [getElevations]);

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl w-full font-bold mb-4">Elevations Summary</h1>
      {list.length > 0 ? (
        <DataTable data={list} />
      ) : (
        <p className="text-gray-500">No elevations found.</p>
      )}
    </div>
  );
};

export default SummaryPage;
