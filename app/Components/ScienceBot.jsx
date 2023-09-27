import React, { useState, useEffect } from "react";

const ScienceBot = () => {
  const [chatLog, setChatLog] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("Generic");

  useEffect(() => {
    if (chatLog.length > 0 && chatLog[chatLog.length - 1].sender === "User") {
      fetch("/api/ScienceBot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: chatLog[chatLog.length - 1].message,
          avatar: selectedAvatar,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setChatLog([...chatLog, { sender: "Bot", message: data.answer }]);
        });
    }
  }, [chatLog]);

  const handleSubmit = () => {
    setChatLog([...chatLog, { sender: "User", message: userInput }]);
    setUserInput("");
  };

  return (
    <div>
      <h1>Science Bot</h1>
      <div className="p-2 overflow-y-scroll border rounded h-60">
        {chatLog.map((entry, index) => (
          <div key={index}>
            <strong>{entry.sender}: </strong>
            {entry.message}
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          placeholder="Type your question..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="flex-grow p-2 border rounded"
        />
        <button
          className="p-2 ml-2 text-white bg-blue-500 rounded"
          onClick={handleSubmit}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ScienceBot;
