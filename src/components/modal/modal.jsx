import React, { useState } from "react";
import { Button, Modal, Progress } from "antd";
// import { AiOutlinePicture } from "react-icons/ai";
// import ReactQuill from "react-quill";
import "./modal.scss";

const Dialog = ({
  modalOpen,
  setModalOpen,
  sendStatus,
  setStatus,
  status,
}) => {
//   const [progress, setProgress] = useState(0);
  return (
    <>
      <Modal 
        className="box"
        title="Create a post"
        centered
        open={modalOpen}
        onOk={() => {
          setStatus("");
          setModalOpen(false);
        //   setPostImage("");
        //   setCurrentPost({});
        }}
        onCancel={() => {
          setStatus("");
          setModalOpen(false);
        //   setPostImage("");
        //   setCurrentPost({});
        }}
        footer={[
          <Button
            onClick={sendStatus}
            key="submit"
            type="primary"
            disabled={status.length > 0 ? false : true}
          >
            Post
          </Button>
        ]}
      >
        <input 
            className="modal-input"
            placeholder="What to do you want to talk about?" 
            onChange={(event)=>setStatus(event.target.value)}
            value={status}
        />

        
      </Modal>
    </>
  );
};

export default Dialog;