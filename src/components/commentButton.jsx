import React, { useMemo, useState } from "react";
import { postComment, getComments  } from "../firebase";
import { getCurrentTimeStamp } from "../helpers/useMoment";
import styled from "styled-components";
import "./styles.scss";
// import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
// import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";

function CommentButton({ userID, postID, currentUser }) {
  const [showCommentBox, setShowCommentBox] = useState(false);
//   const showCommentBoxs = true;
    // console.log(userID, postID, currentUser);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const getComment = (event) => {
    setComment(event.target.value);
  };

    const addComment = () => {
        // console.log(comment,postID, currentUser?.name);

      postComment(postID, comment, getCurrentTimeStamp("LLL"), currentUser?.name);
      setComment("");
    };
    useMemo(() => {
      getComments(postID, setComments);
    }, [userID, postID]);
  return (
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
              <button className="add-comment-btn dark" >
                Post
              </button>
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
  );
}

export default CommentButton;
