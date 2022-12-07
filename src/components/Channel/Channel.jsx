import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendMsgHandler } from "../../features/msgSlice/msg-slice";
import { onSnapshot, query, orderBy } from "firebase/firestore";
import { msgsColRef } from "../../firebase";
import "./Channel.css";
import { formatDate } from "../../utils";

export const Channel = () => {
  const {
    userData: { userId, username },
  } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(sendMsgHandler({ text, username, userId }));
    setText("");
  };

  useEffect(() => {
    const q = query(msgsColRef, orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msg = snapshot.docs.map((msg) => {
        return { ...msg.data(), id: msg.id };
      });
      setMsgs(msg);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="channel mx-auto">
      <div className="messages">
        {msgs.map((msg) => {
          const { id, text, username, createdAt } = msg;
          const myMsg = userId === msg.userId;
          return (
            <div key={id} className={`msg m-2 ${myMsg && "my-msg"}`}>
              <div className="username fw-500">{myMsg ? "You" : username}</div>
              <div className="msg-details">
                <div className="text fw-300">{text}</div>
                {createdAt?.seconds ? (
                  <div className="msg-date">
                    {formatDate(new Date(createdAt.seconds * 1000))}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
      <form onSubmit={submitHandler} className="msg-form mb-3">
        <input
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="type what's in your mind"
          type="text"
        />
        <button className="ml-2 btn send-msg-btn">Send</button>
      </form>
    </div>
  );
};
