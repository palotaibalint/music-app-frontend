import MainHeader from "../HomePage/components/mainpage/MainHeader";
import { Footer } from "../NavBarAndFooter/Footer";
import { User } from "./User";

interface UserPageProps {
  username: string | undefined;
}

export const UserPage: React.FC<UserPageProps> = ({ username }) => {
  return (
    <div className="col-sm-9 background-main d-flex flex-column justify-content-between">
      <MainHeader />
      <div className="flex-fill">
        <User username={username} />
      </div>
      <Footer />
    </div>
  );
};
