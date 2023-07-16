import React, { useState, useMemo , useEffect } from "react";
import { getSingleStatus, getSingleUser } from "../../firebase";
import Artcile  from "../Article";
import { HiOutlinePencil } from "react-icons/hi";
import { useLocation } from "react-router-dom";
// // import FileUploadModal from "../FileUploadModal";
// // import { uploadImage as uploadImageAPI } from "../../../api/ImageUpload";
import "./ProfilePage.scss";

export default function ProfilePage({ onEdit, currentUser }) {
  let location = useLocation();
  const [allStatuses, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  // const getImage = (event) => {
  //   setCurrentImage(event.target.files[0]);
  // };
  // console.log(currentProfile+"currentProfile");
  // console.log(currentUser);
  // const uploadImage = () => {
  //   uploadImageAPI(
  //     currentImage,
  //     currentUser.id,
  //     setModalOpen,
  //     setProgress,
  //     setCurrentImage
  //   );
  // };
  // console.log(location?.state?.id + "location?.state?.id");
  // console.log(allStatuses+"allStatuses")
  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);
  // console.log(currentProfile);
  // console.log(currentUser);
  // console.log(allStatuses);
  return (
    <>
      {/* <FileUploadModal
        getImage={getImage}
        uploadImage={uploadImage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentImage={currentImage}
        progress={progress}
      /> */}
      <div className="profile-card">
        {currentUser.userID === location?.state?.id ? (
          <div className="edit-btn">
            <HiOutlinePencil className="edit-icon" onClick={onEdit} />
          </div>
        ) : (
          <></>
        )}
        
        <div className="profile-info">
          <div>
            {/* <img
              className="profile-image"
              onClick={() => setModalOpen(true)}
              src={
                Object.values(currentProfile).length === 0
                  ? currentUser.imageLink
                  : currentProfile?.imageLink
              }
              alt="profile-image"
            /> */}
            <h3 className="userName">
              {Object.values(currentProfile).length === 0
                ? currentUser.name
                : currentProfile?.name}
            </h3>
            <p className="heading">
              {Object.values(currentProfile).length === 0
                ? currentUser.headline
                : currentProfile?.headline}
            </p>
            {(currentUser.city || currentUser.country) &&
            (currentProfile?.city || currentProfile?.country) ? (
              <p className="location">
                {Object.values(currentProfile).length === 0
                  ? `${currentUser.city}, ${currentUser.country} `
                  : `${currentProfile?.city}, ${currentUser.country}`}
              </p>
            ) : (
              <></>
            )}
            {currentUser.website || currentProfile?.website ? (
              <a
                className="website"
                target="_blank"
                href={
                  Object.values(currentProfile).length === 0
                    ? `${currentUser.website}`
                    : currentProfile?.website
                }
              >
                {Object.values(currentProfile).length === 0
                  ? `${currentUser.website}`
                  : currentProfile?.website}
              </a>
            ) : (
              <></>
            )}
          </div>

          <div className="right-info">
            <p className="college">
              {Object.values(currentProfile).length === 0
                ? currentUser.college
                : currentProfile?.college}
            </p>
            <p className="company">
              {Object.values(currentProfile).length === 0
                ? currentUser.company
                : currentProfile?.company}
            </p>
          </div>
        </div>
        <p className="about-me">
          {Object.values(currentProfile).length === 0
            ? currentUser.aboutMe
            : currentProfile?.aboutMe}
        </p>

        {currentUser.skills || currentProfile?.skills ? (
          <p className="skills">
            <span className="skill-label">Skills</span>:&nbsp;
            {Object.values(currentProfile).length === 0
              ? currentUser.skills
              : currentProfile?.skills}
          </p>
        ) : (
          <></>
        )}
      </div>
        

      <div className="post-status-main">
        {allStatuses?.map((posts) => {
          return (
            // console.log(posts+"posts")
            <div className="posts-container" key={posts.id}>
              <Artcile post={posts} />
            </div>
          );
        })}
      </div>
    </>
  );
}

// import "./ProfilePage.scss";

// export default function ProfilePage({ onEdit, currentUser }) {
//   return (
//     <>
//       <div className="profile-card">
//         <div className="edit-btn">
//           <HiOutlinePencil className="edit-icon" onClick={onEdit} />
//         </div>
//         <div className="profile-info">
//           <h3 className="username"> {currentUser.username}</h3>
//           <p className="heading">{currentUser.headline}</p>
//         </div>
//       </div>
//     </>
//   );
// }
