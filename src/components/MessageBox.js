import React from 'react'
import CloseMenuIcon from './menu/CloseMenuIcon'

const MessageBox = ({message, closeMessage}) => {
    const makeMessage = () => {
        if(message.type === "success"){
            return "success-message-container"
        }
        if(message.type === "error"){
            return "error-message-container"
        }
    }
  return (
    <>
        <div className={`message-box ${makeMessage()}`}>
            <div className="message-body">
                {message.body}
            </div>

            <div className="message-close" onClick={() => closeMessage()}>
                <CloseMenuIcon cName={message.type === 'success' ? "success-message-close-icon" : "error-message-close-icon"}/>
            </div>
        </div>
    </>
  )
}

export default MessageBox