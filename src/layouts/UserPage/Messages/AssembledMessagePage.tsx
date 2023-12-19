import { useLocation } from "react-router-dom";
import { SideBar } from "../../Sidebar/SideBar";
import { MessagePage } from "./MessagePage";
import { useAuth0 } from "@auth0/auth0-react";

export const AssembledMessagePage = ({}) => {
  const { user } = useAuth0();
  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar />
        <MessagePage username={user?.nickname} />
      </div>
    </div>
  );
};
