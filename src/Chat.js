import Header from "./components/Header";
import Message from "./components/Message";
import "./App.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useEffect, useState } from "react";

const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchAllEvents = async () => {
    const response = await fetch(
      "https://lego.abakus.no/api/v1/events/?date_after=2021-11-17"
    );
    const events = await response.json();
    return events;
  };

  useEffect(() => {
    const newMessageList = [];
    fetchAllEvents().then((data) => {
      for (let i = 0; i < 10; i++) {
        const event = data.results[i];
        const messageObj = {
          from: event.title,
          timestamp: event.startTime,
          text: event.description,
          me: false,
        };
        newMessageList.push(messageObj);
      }
      setMessages(newMessageList);
    });
  }, []);

  const renderMessages = () =>
    messages.map((msg, key) => (
      <Message
        key={key}
        from={msg.from}
        timestamp={msg.timestamp}
        text={msg.text}
        me={msg.me}
      />
    ));

  const addNewMessage = () => {
    const newMessageObj = {
      from: "Peder",
      timestamp: new Date(),
      text: newMessage,
      me: true,
    };
    setMessages(messages.concat([newMessageObj]));
    setNewMessage("");
  };

  return (
    <>
      <Header text="Chatroom" />
      {renderMessages()}
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <TextField
          label="Melding"
          variant="outlined"
          style={{ width: "100%" }}
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <Button
          variant="contained"
          onClick={addNewMessage}
          disabled={newMessage.length < 1 || newMessage.length * 2 >= 100}
          color="primary"
        >
          Send
        </Button>
      </div>
      <LinearProgress
        variant="determinate"
        value={Math.min(newMessage.length * 2, 100)}
        style={{ marginBottom: "10px" }}
      />
    </>
  );
};

export default Chat;
