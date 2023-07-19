import styled from "styled-components";
import Dialog from "./modal/modal";
import { useState, useMemo } from "react";
import { postStatus, getStatus } from "../firebase.js";
import { getCurrentTimeStamp } from "../helpers/useMoment";
import Article from "./Article.jsx";
import { getUniqueID } from "../helpers/getUniqueId";
const Main = ({currentUser}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatus, setAllStatus] = useState([]);
  
  const sendStatus = async () => {
    const obj = {
      status: status,
      time: getCurrentTimeStamp("LLL"),
      name: currentUser.name,
      userEmail: currentUser.email,
      postID: getUniqueID(),
      userID: currentUser.userID,
      imageLink: "images/user.svg"
    };
    await postStatus(obj);
    await setStatus("");
    await setModalOpen(false);
  };

  useMemo(() => {
    getStatus(setAllStatus );
  }, []);

  return (
    <Container>
      <ShareBox>
        <div>
          <img src={currentUser.imageLink ? currentUser.imageLink : "images/user.svg"} alt="" />
          <button onClick={() => setModalOpen(true)}>Start a Post</button>
          <Dialog
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            status={status}
            setStatus={setStatus}
            sendStatus={sendStatus}
          ></Dialog>
        </div>
        <div>
          <button>
            <img src="/images/photo-icon.png" alt="" />
            <span>Photo</span>
          </button>
          <button>
            <img src="/images/video-icon.png" alt="" />
            <span>Video</span>
          </button>
          <button>
            <img src="/images/event-icon.png" alt="" />
            <span>Event</span>
          </button>
          <button>
            <img src="/images/article-icon.png" alt="" />
            <span>Article</span>
          </button>
        </div>
      </ShareBox>
      <div>
        {allStatus.map((post) => {
          return (
            <div key = { post.id }>
              < Article post={post}  ></Article>
            </div>
          )
        })}
      </div>
    </Container>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 50px;
        border-radius: 50%;
        margin-right: 8px;
        height: 50px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        padding-left: 16px;
        border-radius: 35px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;

        :hover {
          background-color: rgba(0, 0, 0, 0.08);
        }
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;
      button {
        img {
          margin: 0 4px 0 -2px;
          width: 20px;
          height: 20px;
        }
        span {
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
`;

export default Main;
