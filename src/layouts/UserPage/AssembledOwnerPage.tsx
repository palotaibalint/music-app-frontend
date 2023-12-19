import React from "react";
import { SideBar } from "../Sidebar/SideBar";
import { UserPage } from "./UserPage";
import { useLocation, useParams } from "react-router-dom";

export const AssembledOwnerPage = () => {
  const { username } = useParams();
  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar />
        <UserPage username={username} />
      </div>
    </div>
  );
};
