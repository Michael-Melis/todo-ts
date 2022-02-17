import styled from "styled-components";

export const StyledListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    margin: 1rem;
  }
`;
export const StyledListForm = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0 auto;
`;
export const StyledLists = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 3rem 0;
`;
export const StyledLink = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
  background: #252525;
  width: 100%;
  margin: 1rem auto;
  a {
    color: #fff;
    text-decoration: none;
    font-size: 2rem;
    margin: 1rem;
    width: 100%;
    padding: 0.5rem 2rem;
    transition: all 300ms ease-in-out;
    text-align: center;
  }
  a:hover {
    color: #049172;
    transform: scale(2);
    text-shadow: 2px 6px 4px black;
  }
`;
