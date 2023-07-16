import styled from "styled-components";
import { getLikesByUser, likePost } from "../firebase";
import { useMemo , useState } from "react";
function Like({ userID, postID }) {
    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false);
    
    function handleLike() {
        likePost(userID, postID ,liked);
    }
    useMemo(() => {
        getLikesByUser(userID, postID, setLikesCount, setLiked);
    }, [userID, postID]);
    // console.log(likesCount);
    // console.log(liked);
  return (
    <Likebutton>
      <img src="/images/like-icon.png" alt="" onClick={handleLike}/>
          <span>Like {likesCount}</span>
    </Likebutton>
  );
}

const Likebutton = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  font-size: 14px;
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
`;

export default Like;
