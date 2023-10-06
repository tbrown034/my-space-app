import React, { useState, useEffect } from "react";

const ScienceBot = ({ setActiveComponent }) => {
  const [chatLog, setChatLog] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const avatars = ["Carl Sagan", "Neil deGrasse Tyson", "Jane Goodall"];
  // List of avatars

  useEffect(() => {
    const fetchData = async () => {
      if (chatLog.length > 0 && chatLog[chatLog.length - 1].sender === "User") {
        try {
          const response = await fetch("/api/ScienceBot", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              question: chatLog[chatLog.length - 1].message,
              avatar: selectedAvatar,
            }),
          });
          const data = await response.json();
          setChatLog([...chatLog, { sender: "Bot", message: data.answer }]);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchData();
  }, [chatLog]);

  const handleSubmit = () => {
    setChatLog([...chatLog, { sender: "User", message: userInput }]);
    setUserInput("");
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center gap-2 text-2xl text-blue-700 ">
          <span className="">Have a Question?</span>
          <span className="text-4xl font-bold">Ask a (AI) Scientist!</span>
        </div>

        {/* Avatar selection */}
        <div className="flex flex-row mb-4">
          {avatars.map((avatar, index) => (
            <button
              key={index}
              className={`m-2 p-2 rounded ${
                selectedAvatar === avatar
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setSelectedAvatar(avatar)}
            >
              {avatar}
            </button>
          ))}
        </div>

        <div className="flex mt-4">
          <input
            type="text"
            placeholder="Type your question..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="flex-grow p-2 text-white border rounded-2xl bg-slate-400"
          />
          <button
            className="p-2 ml-2 text-white bg-blue-500 rounded"
            onClick={handleSubmit}
          >
            Send
          </button>
        </div>

        {/* Chat area */}
        <div className="p-2 overflow-y-scroll text-white border bg-slate-700 rounded-2xl h-60">
          {chatLog.map((entry, index) => (
            <div key={index}>
              <strong>
                {entry.sender === "Bot" ? selectedAvatar || "Bot" : "User"}:{" "}
              </strong>
              {entry.message}
            </div>
          ))}
        </div>
        <button
          className="w-32 p-4 border-2 border-blue-600 rounded-2xl hover:bg-blue-500 active:bg-blue-800 hover:text-slate-200"
          onClick={() => setActiveComponent(null)} // setting activeComponent to null to close ScienceBot
        >
          Close
        </button>
      </div>
    </>
  );
};

export default ScienceBot;
