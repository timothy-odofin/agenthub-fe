import React from "react";
import clsx from "clsx";

const AppMessage = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <div
      className={clsx(
        "flex px-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={clsx(
          "max-w-xs sm:max-w-md px-4 py-2 rounded-lg break-words",
          isUser
            ? "bg-blue-100 text-black rounded-br-none"
            : "bg-gray-50 text-black rounded-bl-none"
        )}
      >
        <p>{message.content}</p>
        <span className="text-xs text-gray-500 block text-right mt-1">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

export default AppMessage;
