import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";
import { useEffect, Fragment, useState } from "react";
import ProfilePopup from "./ProfilePopup/index";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../firebase";
import "./indexx.scss";
const Header = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  let navigate = useNavigate();

  const openUser = (user) => {
    {
      if (document.location.pathname == "/profile") {
        window.location.reload() ||
          navigate("/profile", {
            state: {
              id: user?.userID,
              email: user?.email,
            },
          });
      } else {
        navigate("/profile", {
          state: {
            id: user?.userID,
            email: user?.email,
          },
        });
      }
    }
  };

  const handleSearch = () => {
    if (searchInput !== "") {
      let searched = users.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setFilteredUsers(searched);
    } else {
      setFilteredUsers(users);
    }
  };

  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(debounced);
  }, [searchInput]);

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);
  return (
    <Fragment>
      <Container>
        <Content>
          <Logo>
            <a href="/home">
              <img src="/images/home-logo.svg" alt="" />
            </a>
          </Logo>
          <Search>
            <div>
              <input
                type="text"
                placeholder="Search"
                onChange={(event) => setSearchInput(event.target.value)}
              />
            </div>
            <SearchIcon>
              <img src="/images/search-icon.svg" alt="" />
            </SearchIcon>
          </Search>
          <Nav>
            <NavListWrap>
              <NavList className="active">
                <a href="/home">
                  <img src="/images/nav-home.svg" alt="" />
                  <span>Home</span>
                </a>
              </NavList>

              <NavList>
                <a href="/network">
                  <img src="/images/nav-network.svg" alt="" />
                  <span>My Network</span>
                </a>
              </NavList>

              <NavList>
                <a href="/jobs">
                  <img src="/images/nav-jobs.svg" alt="" />
                  <span>Jobs</span>
                </a>
              </NavList>

              <NavList>
                <a href="/chat">
                  <img src="/images/nav-messaging.svg" alt="" />
                  <span>Messaging</span>
                </a>
              </NavList>

              <NavList>
                <a>
                  <img src="/images/nav-notifications.svg" alt="" />
                  <span>Notifications</span>
                </a>
              </NavList>

              <User>
                <a>
                  <img
                    src={
                      currentUser.imageLink
                        ? currentUser.imageLink
                        : "/images/user.svg"
                    }
                    alt="image"
                  />
                  <span>
                    Me
                    <img src="/images/down-icon.svg" alt="" />
                  </span>
                </a>
                <SignOut>
                  <ProfilePopup currentUser={currentUser} />
                </SignOut>
              </User>

              <Work>
                <a>
                  <img src="/images/nav-work.svg" alt="" />
                  <span>
                    Work
                    <img src="/images/down-icon.svg" alt="" />
                  </span>
                </a>
              </Work>
            </NavListWrap>
          </Nav>
        </Content>
      </Container>
      {searchInput.length === 0 ? (
        <></>
      ) : (
        <div className="search-results">
          {filteredUsers.length === 0 ? (
            <div className="search-inner">No Results Found..</div>
          ) : (
            filteredUsers.map((user) => (
              <div className="search-inner" onClick={() => openUser(user)}>
                <img
                  src={user.imageLink ? user.imageLink : "images/user.svg"}
                />
                <p className="name">{user.name}</p>
              </div>
            ))
          )}
        </div>
      )}
      <Outlet />
    </Fragment>
  );
};

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  left: 0;
  padding: 0 24px;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
`;

const Logo = styled.span`
  margin-right: 8px;
  font-size: 0px;
`;

const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
    }
  }
`;

const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.nav`
  margin-left: auto;
  display: block;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;
  }
`;

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
    }
  }
`;

const NavList = styled.li`
  display: flex;
  align-items: center;
  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 80px;
    position: relative;
    text-decoration: none;
    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
    }
    @media (max-width: 768px) {
      min-width: 70px;
    }
  }
  &:hover,
  &:active {
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`;

const SignOut = styled.div`
  position: absolute;
  top: 46px;
  transition-duration: 167ms;
  display: none;
  cursor: pointer;
  @media (max-width: 768px) {
    top: -25px;
  }
`;

const User = styled(NavList)`
  a > svg {
    width: 24px;
    border-radius: 50%;
  }
  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    // margin-left: 5px;
  }
  span {
    display: flex;
    align-items: center;
  }
  &:hover {
    ${SignOut} {
      align-items: center;
      display: flex;
      justify-content: center;
    }
  }
`;

const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
`;

export default Header;
