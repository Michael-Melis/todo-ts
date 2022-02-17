import styled from "styled-components";
export const StyledTask = styled.div`
  display: flex;

  padding: 1rem;
  margin: 1rem 5rem;
  justify-content: space-between;
  align-items: center;
  background-color: #252525;
  border-radius: 6px;
`;
export const StyledTaskContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${({ task }) => {
    if (task?.isCompleted === true) {
      return `
         
        border-radius: 6px;
        padding:1rem;
          background:#008000;
          text-decoration:line-through;
        `;
    } else if (task?.isCompleted === false) {
      return `
        border-radius: 6px;
        padding:1rem;
        background:#8b0000;
          `;
    }
  }}
  span {
    color: #fff;
  }
  h1 {
  }
  p {
  }
`;

export const StyledBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
