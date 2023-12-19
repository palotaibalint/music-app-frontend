import React from "react";
import { SideBar } from "../Sidebar/SideBar";
import { UserPage } from "./UserPage";
import { useAuth0 } from "@auth0/auth0-react";

export const AssembledUserPage = () => {
  const { user } = useAuth0();

  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar />
        <UserPage username={user?.nickname} />
      </div>
    </div>
  );
};
