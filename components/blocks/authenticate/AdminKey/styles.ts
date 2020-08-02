import styled, { keyframes } from 'styled-components';
import { scheme } from '../../../../lib/theme';

const errorFieldAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Wrapper = styled.div`
  width: 400px;
  background-color: ${scheme.white};
  padding: 20px;
  border-radius: 5px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
`;

export const FormTitle = styled.div`
  text-transform: uppercase;
  font-size: 1.3rem;
  font-weight: 600;
  color: ${scheme.gray[8]};
`;

export const FormSubtitle = styled.p`
  color: ${scheme.gray[6]};
  margin: 0;
  margin-bottom: 20px;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.span`
  color: ${scheme.gray[7]};
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  border: none;
  outline: 0;
  box-shadow: none;
  background-color: ${scheme.gray[2]};
  padding: 10px;
  border-radius: 5px;
  font-size: 1.4rem;
`;

export const ErrorField = styled.div`
  padding: 10px;
  border-radius: 5px;
  background-color: ${scheme.red[2]};
  color: ${scheme.gray[8]};
  animation: ${errorFieldAnimation} 0.5s linear;
`;

export const Button = styled.button`
  border: none;
  outline: none;
  box-shadow: none;
  cursor: pointer;
  background-color: ${scheme.gray[8]};
  padding: 10px 20px;
  color: ${scheme.white};
  font-size: 1.4rem;
  border-radius: 5px;

  &:active {
    background-color: ${scheme.gray[7]};
  }
`;
