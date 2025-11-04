import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  messages: Messages[];
};

export type Messages = {
  content: string;
  role: "user" | "bot";
};

const ChatMessages = ({ messages }: Props) => {
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onCopyMessage = (e: React.ClipboardEvent) => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      e.preventDefault();
      e.clipboardData.setData("text/plain", selection);
    }
  };
  return (
    <div className='flex flex-col gap-3'>
      {messages.map((message, index) => (<div key={index}
        onCopy={onCopyMessage}
        ref={index === messages.length - 1 ? lastMessageRef : null}
        className={`py-1 px-3 rounded-xl ${message.role === "user" ? "bg-blue-500 text-white self-end" : "gray-100 text-black self-start"}`}> <span><ReactMarkdown>{message.content}</ReactMarkdown></span></div>))}
    </div>
  )
};

export default ChatMessages;
