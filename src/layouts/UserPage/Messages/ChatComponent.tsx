import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  MessageBox,
  ChatList,
  IChatItemProps,
  Input,
} from "react-chat-elements";
import "react-chat-elements/dist/main.css"; // Import react-chat-elements styles
import UserModel from "../../../models/UserModel";
import MessageModel from "../../../models/MessageModel";
import defaultAvatar from "../../../Images/7190932.png";

interface MessageProps {
  username: string | undefined;
}

export const ChatComponent: React.FC<MessageProps> = ({ username }) => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [newMessage, setNewMessage] = useState("");

  const fetchUsers = async () => {
    if (isAuthenticated && username) {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://music-api",
            scope: "openid profile email",
          },
        });

        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        const messagesUrl = `http://localhost:8081/api/messages/private/users-with-messages?username=${username}`;
        const response = await fetch(messagesUrl, requestOptions);

        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }

        const fetchedUsers = await response.json();
        const loadedUsers: UserModel[] = [];

        for (const key in fetchedUsers) {
          loadedUsers.push({
            user_id: fetchedUsers[key].user_id,
            email: fetchedUsers[key].email,
            username: fetchedUsers[key].username,
            songs: fetchedUsers[key].songs,
          });
        }
        console.log(loadedUsers);

        setUsers(loadedUsers);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching messages:", error.message);
        } else {
          console.error("An unexpected error occurred");
        }
      }
    }
  };

  const fetchMessagesWithUser = async (otherUserName: string) => {
    if (isAuthenticated && username) {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://music-api",
            scope: "openid profile email",
          },
        });

        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        const messagesUrl = `http://localhost:8081/api/messages/private/between?username1=${username}&username2=${otherUserName}`;
        const response = await fetch(messagesUrl, requestOptions);

        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }

        const fetchedMessages = await response.json();
        const loadedMessages: MessageModel[] = [];

        for (const key in fetchedMessages) {
          loadedMessages.push({
            id: fetchedMessages[key].id,
            sender: fetchedMessages[key].sender,
            receiver: fetchedMessages[key].receiver,
            content: fetchedMessages[key].content,
            sentAt: fetchedMessages[key].sentAt,
          });
        }
        setMessages(loadedMessages);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching messages:", error.message);
        } else {
          console.error("An unexpected error occurred");
        }
      }
    }
  };

  const sendMessage = async () => {
    if (!selectedUser || !newMessage.trim()) return;

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: "https://music-api",
          scope: "openid profile email",
        },
      });

      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };

      const messagesUrl = `http://localhost:8081/api/messages/private/add?sender=${user?.nickname}&receiver=${selectedUser.username}&content=${newMessage}`;
      const response = await fetch(messagesUrl, requestOptions);

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      fetchMessagesWithUser(selectedUser.username);
      setNewMessage("");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error sending message:", error.message);
      } else {
        console.error("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [username, isAuthenticated, getAccessTokenSilently]);

  const handleChatItemClick = (item: IChatItemProps) => {
    const userId = item.id;
    const user = users.find((u) => u.user_id === userId);

    if (user) {
      setSelectedUser(user);
      fetchMessagesWithUser(user.username);
    }
  };

  const backgroundColor = "#0f0f0f";

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        backgroundColor: "#f0f0f0",
        border: "1px solid #ccc",
      }}
    >
      <div style={{ width: "30%", height: "100%", border: "1px solid #ccc" }}>
        {users.length > 0 ? (
          <ChatList
            id="chat-list"
            dataSource={users.map((user) => ({
              avatar: defaultAvatar,
              title: user.username,
              subtitle: "",
              date: new Date(),
              id: user.user_id,
            }))}
            onClick={handleChatItemClick}
            lazyLoadingImage=""
          />
        ) : (
          <div style={{ padding: "20px" }}>No users</div>
        )}
      </div>
      <div
        style={{
          width: "70%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: "1px solid #ccc",
          backgroundColor: "#f0f0f0",
        }}
      >
        <div
          style={{
            flexGrow: 1,
            overflowY: "auto",
            backgroundColor: "#ffffff",
            border: "1px solid #ccc",
          }}
        >
          {messages.length > 0 ? (
            messages.map((message) => (
              <MessageBox
                key={message.id}
                id={message.id.toString()}
                position={
                  message.sender.username === username ? "right" : "left"
                }
                type="text"
                text={message.content}
                title={message.sender.username}
                date={new Date(message.sentAt)}
                dateString={new Date(message.sentAt).toLocaleString()}
                focus={false}
                titleColor=""
                forwarded={false}
                replyButton={false}
                removeButton={false}
                status="read"
                notch={false}
                copiableDate={false}
                retracted={false}
              />
            ))
          ) : (
            <div style={{ padding: "20px" }}></div>
          )}
        </div>
        <Input
          placeholder="Type a message here..."
          defaultValue=""
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewMessage(e.target.value)
          }
          maxHeight={100}
          rightButtons={
            <button onClick={sendMessage} className="send-message-button">
              Send
            </button>
          }
        />
      </div>
    </div>
  );
};

export default ChatComponent;
