import styled from "styled-components";

export const StyledListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem auto;
  h1 {
    margin: 2rem;
  }
`;
export const StyledListForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
`;
export const StyledLists = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  width: 80%;

  margin: 1rem auto;
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

    text-align: center;
    padding: 0.5rem 2rem;

    transition: all 300ms ease-in-out;
  }
  a:hover {
    color: #049172;
    transform: scale(2);
  }
`;
