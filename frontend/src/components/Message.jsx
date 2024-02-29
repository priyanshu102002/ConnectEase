import React from "react";

const Message = () => {
    return (
        <div className={`chat chat-end`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg"
                    />
                </div>
            </div>
            <div
                className={`chat-bubble text-white  pb-2`}
            >
                Helloooo
            </div>
            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
                12:25
            </div>
        </div>
    );
};

export default Message;
