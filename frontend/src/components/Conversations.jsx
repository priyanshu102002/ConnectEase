import React from "react";
import Conversation from "./Conversation";
import useGetConversation from "../hooks/useGetConversation";

const Conversations = () => {
    const { loading, conversations } = useGetConversation();

    return (
        <div className="p-2 flex flex-col overflow-auto">
            {loading ? (
                <span className="loading loading-spinner"></span>
            ) : (
                conversations.map((conversation, index) => (
                    <Conversation
                        key={conversation._id}
                        conversation={conversation}
                        lastIdx={index === conversations.length - 1}
                    />
                ))
            )}
        </div>
    );
};

export default Conversations;
