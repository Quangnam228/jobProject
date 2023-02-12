import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetUser } from '../redux/useReduxAdmin';

function Navbar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userAdmin.currentUser?.user);
  const admin = user?.isAdmin;

  // const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('persist:root');
    navigate('/home');
    dispatch(resetUser());
  };
  const handleRender = () => {
    if (user) {
      return (
        <>
          <div className="navbarUser">
            <img
              src={user.img ? user.img : 'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'}
              alt="avatar"
              className="imgNavbar"
            />
            <span className="navbarUserName">{user.lastname}</span>
            <ul className="navbarUserMenu">
              <li className="navbarUserMenuItem">
                <a href="/account">Profile</a>
              </li>
              <li className="navbarUserMenuItem">
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Link to="/auth/login" className="itemfooter">
            <MenuItem>Login</MenuItem>
          </Link>
        </>
      );
    }
  };

  return (
    <Container>
      <Wrapper>
        <Left>{/* <Language>EN</Language> */}</Left>
        <Center>
          <Link to="/home">
            <Logo>.NN</Logo>
          </Link>
        </Center>
        <Right>{handleRender()}</Right>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  height: 60px;
  background-color: #eee;
  ${mobile({ height: '50px' })}
`;
const Wrapper = styled.div`
  padding: 5px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: '10px 0px' })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: '24px' })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  ${mobile({ flex: 2, justifyContent: 'center' })}
`;
const MenuItem = styled.div`
  font-size: 18px;
  cursor: pointer;
  margin-left: 25px;
  text-decoration: none;
  ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`;

export default Navbar;
