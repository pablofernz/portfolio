import { useState } from "react";
import style from "./chatbox.module.css";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
const Chatbox = () => {
  const [chatboxOpen, setChatboxOpen] = useState(false);
  return ReactDOM.createPortal(
    <div className={style.component}>
      <motion.div
        animate={{
          height: chatboxOpen ? "450px" : "50px",
          width: chatboxOpen ? "350px" : "140px",
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 150,
        }}
        className={style.chatboxComponent}
      >
        <header className={style.header}>
          <button
            onClick={() => {
              setChatboxOpen(!chatboxOpen);
            }}
          >
            {!chatboxOpen && (
              <motion.svg
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 150,
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20px"
                height="20px"
              >
                <path
                  fillRule="evenodd"
                  d="M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z"
                  clipRule="evenodd"
                />
              </motion.svg>
            )}

            <AnimatePresence mode="popLayout">
              <motion.p
                
                key={chatboxOpen ? "open" : "closed"}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 150,
                }}
              >
                {chatboxOpen ? "Chat" : "Let's Chat!"}
              </motion.p>
            </AnimatePresence>
          </button>
        </header>
      </motion.div>
    </div>,
    document.getElementById("chatbox")
  );
};

export default Chatbox;