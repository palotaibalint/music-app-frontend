import MainHeader from "../../HomePage/components/mainpage/MainHeader";
import { Footer } from "../../NavBarAndFooter/Footer";
import ChatComponent from "./ChatComponent";

interface MessagePageProps {
  username: string | undefined;
}

export const MessagePage: React.FC<MessagePageProps> = ({ username }) => {
  return (
    <div className="col-sm-9 background-main d-flex flex-column justify-content-between">
      <MainHeader />
      <div className="flex-fill">
        <ChatComponent username={username} />
      </div>
      <Footer />
    </div>
  );
};
