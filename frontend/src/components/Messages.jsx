import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import useListenMessages from "../hooks/useListenMessages";

const Messages = () => {
    const { message, loading } = useGetMessages();
    const lastMessageRef = useRef();
    useListenMessages()

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [message]);

    return (
        <div className="px-4 flex-1 overflow-auto">
            {!loading &&
                message.length > 0 &&
                message.map((msg) => (
                    <div ref={lastMessageRef} key={msg._id}>
                        <Message message={msg} />
                    </div>
                ))}

            {loading && <p className="text-center">Loading...</p>}
            {!loading && message.length === 0 && (
                <p className="text-center">
                    Send a message to start a conversation
                </p>
            )}
        </div>
    );
};

export default Messages;
