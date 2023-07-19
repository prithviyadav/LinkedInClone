import styled from "styled-components";
import { useState, useMemo   , useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, getAllUsers  , getConnections} from "../firebase";
import Like from "./likebutton";
import "./styles.scss";
import { postComment, getComments } from "../firebase";
import { getCurrentTimeStamp } from "../helpers/useMoment";
import "./styles.scss";

const Article = ({ post, id }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [likesCount, setLikesCount] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  
  let navigate = useNavigate();
  const getComment = (event) => {
    setComment(event.target.value);
  };

  const addComment = () => {
    postComment(
      post.postID,
      comment,
      getCurrentTimeStamp("LLL"),
      currentUser?.name
    );
    setComment("");
  };
  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);
  useEffect(() => {
    getConnections(currentUser.userID, post.userID, setIsConnected);
  }, [currentUser.userID , post.userID]);
  useMemo(() => {
    getComments(post.postID, setComments);
  }, [currentUser.userID, post.postID]);
  
  // if (post.userID == currentUser.userID) setIsConnected(true);
  
  return isConnected ? (
    <MainBox key={id}>
      <SharedActor>
        <a>
          <img
            src={
              allUsers.find((user) => user.userID === post.userID)?.imageLink
                ? allUsers.find((user) => user.userID === post.userID)
                    ?.imageLink
                : "/images/user.svg"
            }
            onClick={() =>
              navigate("/profile", {
                state: { id: post.userID, email: post.userEmail },
              })
            }
            alt="images/user.svg"
          />
          <div>
            <span
              onClick={() =>
                navigate("/profile", {
                  state: { id: post.userID, email: post.userEmail },
                })
              }
            >
              {allUsers.find((user) => user.userID === post.userID)?.name}
            </span>

            <span>
              {allUsers.find((user) => user.userID === post.userID)?.headline
                ? allUsers.find((user) => user.userID === post.userID)?.headline
                : post.userEmail}
            </span>
            <span>{post.time}</span>
          </div>
        </a>
        <button>
          <img src="/images/ellipsis.png" alt="" />
        </button>
      </SharedActor>
      <Description>{post.status}</Description>
      <SharedImg>
        <a>
          <img src="/images/shared-image.png" alt="" />
        </a>
      </SharedImg>
      <SocialCounts>
        <li>
          <button>
            <img src="/images/clap-icon.png" alt="" />
            <span>{likesCount} user Like this Post</span>
          </button>
        </li>
        <li>
          <a>{comments.length} Comments</a>
        </li>
        <li>
          <a>15 Reposts</a>
        </li>
      </SocialCounts>
      <SocialActions>
        <Like
          userID={currentUser.userID}
          postID={post.postID}
          setLikesCount={setLikesCount}
        />
        {/* <CommentButton userID={currentUser.userID} postID={post.postID} currentUser={currentUser} /> */}
        <div className="Commentbutton">
          <div className="comment-button">
            <img
              src="/images/comment-icon.png"
              alt=""
              onClick={() => setShowCommentBox(!showCommentBox)}
            />

            <span
              className={showCommentBox ? "blue" : "black"}
              onClick={() => setShowCommentBox(!showCommentBox)}
            >
              Comments
            </span>
          </div>
        </div>
        <button>
          <img src="/images/repost-icon.png" alt="" />
          <span>Repost</span>
        </button>
        <button>
          <img src="/images/send-icon.png" alt="" />

          <span>Send</span>
        </button>
      </SocialActions>
      <div className="addComment">
        {showCommentBox ? (
          <>
            <input
              onChange={getComment}
              placeholder="Add a Comment..."
              className="comment-input"
              name="comment"
              value={comment}
            />
            {comment.length > 0 ? (
              <button className="add-comment-btn blue" onClick={addComment}>
                Post
              </button>
            ) : (
              <button className="add-comment-btn dark">Post</button>
            )}

            {comments.length > 0 ? (
              comments.map((comment) => {
                return (
                  <div className="all-comments">
                    <p className="name">{comment.name}</p>
                    <p className="comment">{comment.comment}</p>

                    <p className="timestamp">{comment.timeStamp}</p>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </MainBox>
  ) : (<></>);
};

const MainBox = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;
const SharedActor = styled.div`
  // padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0px;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      cursor: pointer;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
          text-decoration: underline;
          cursor: pointer;
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 5px;
    background: transparent;
    border: none;
    outline: none;
    img {
      width: 30px;
      height: 20px;
    }
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  height: 450px;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0px;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    :hover {
      // cursor: pointer;
      color: rgba(0, 0, 0, 0.9);
      text-decoration: underline;
    }
    margin-right: 5px;
    font-size: 12px;
    color: #6f6f6f;
    button {
      display: flex;
      align-items: center;
      background-color: white;
      border: none;
      color: #6f6f6f;
      img {
        width: 50px;
        height: 30px;
      }
      // cursor: pointer;
    }
    &:nth-child(2) {
      position: absolute;
      right: 90px;
    }
    &:nth-child(3) {
      position: absolute;
      right: 10px;
    }
  }
`;
const SocialActions = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    margin-top: 2.5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    color: #6f6f6f;
    border: none;
    width: 100%;
    background-color: white;
    border-radius: 5px;

    img {
      width: 25px;
      height: 20px;
      margin-right: -5px;
      cursor: pointer;
    }
    @media (min-width: 768px) {
      span {
        margin-left: 8px;
        margin-right: -10px;
      }
    }
    // :hover {
    //   background-color: rgba(0, 0, 0, 0.08);
    // }
  }
`;

export default Article;
