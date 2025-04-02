"use client";
import { useAuth } from "@/context/AuthContext";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

type Props = {};

const User = (props: Props) => {
  const { data: session, status } = useSession();
  const { userData, creditsData } = useAuth();

  return (
    <section id="user" className="pt-10">
      <h2 className="text-white text-4xl w-full text-center my-10">
        Welcome back, {userData?.displayName}
      </h2>
      <div
        id="user-container"
        className="flex flex-row items-stretch flex-wrap justify-between gap-4"
      >
        <div className="card w-full xl:w-[calc(50%-1rem)] bg-slate-600/30 p-4 rounded-md backdrop-blur-sm border-cyan-500 border">
          <div className="card-header text-white text-3xl font-bold mb-4">
            User-Data
            <div className="card-subtitle text-white text-sm my-2">
              You can change some of your account details. Some are bound to
              your Google-Account and login.
            </div>
          </div>
          <div className="card-content">
            <table className="table-auto w-full text-white">
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>{userData?.displayName}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{userData?.email}</td>
                </tr>
                <tr>
                  <td>First Name:</td>
                  <td>{userData?.firstName ? userData.firstName : "-"}</td>
                </tr>
                <tr>
                  <td>Last Name:</td>
                  <td>{userData?.lastName ? userData.lastName : "-"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="card w-full xl:w-[calc(50%-1rem)]  bg-slate-600/30 p-4 rounded-md backdrop-blur-sm border-cyan-500 border">
          <div className="card-header">
            <div className="card-title">Account Data</div>
            <div className="card-subtitle"></div>
          </div>
          <div className="card-content text-white">{creditsData?.credits}</div>
        </div>
      </div>
    </section>
  );
};

export default User;
