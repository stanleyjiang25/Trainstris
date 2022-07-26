import { FaBars } from "react-icons/fa";
import styled from "styled-components";

export const Nav = styled.nav`
background: #282c34;
height: 85px;
display: flex;
justify-content: right;
padding: 0.2rem;
z-index: 12;
`;

// export const NavLink = styled(Link)`
// color: #808080;
// display: flex;
// align-items: center;
// text-decoration: none;
// padding: 0 1rem;
// height: 100%;
// cursor: pointer;
// `;

export const Bars = styled(FaBars)`
display: flex;
color: #2dc997;
`;

export const NavMenu = styled.div`
display: flex;
align-items: center;
margin-right: 24px;
/* Second Nav */
/* margin-right: 24px; */
/* Third Nav */
/* width: 100vw;
white-space: nowrap; */
@media screen and (max-width: 768px) {
	display: none;
}
`;
