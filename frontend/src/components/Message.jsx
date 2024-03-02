import { useAuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();

    const date = new Date(message.createdAt);

    const fromMe = message.senderId === authUser.data._id;
    const chatClassName = fromMe ? "chat-start" : "chat-end";
    const chatBubbleClassName = fromMe ? "bg-blue-500" : "";
    const profilePic = fromMe
        ? authUser?.data?.profilePicture
        : selectedConversation?.profilePicture;

    return (
        <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={profilePic}
                    />
                </div>
            </div>
            <div
                className={`chat-bubble text-white  pb-2 ${chatBubbleClassName}`}
            >
                {message.message}
            </div>
            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
                {date.getHours()}:{date.getMinutes()}
            </div>
        </div>
    );
};

export default Message;
