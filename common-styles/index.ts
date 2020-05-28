import styled from 'styled-components';
import { scheme } from '../lib/theme';

export const ThreadStat = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
  position: relative;
  top: 0;

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    &::before {
      opacity: 1;
      transition: opacity 0.3s ease-in-out;
    }
    &::after {
      opacity: 1;
      transition: opacity 0.3s ease-in-out;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 4px 6px 0 6px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.9) transparent transparent transparent;
    z-index: 1;
    opacity: 0;
  }

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    left: 50%;
    top: -6px;
    transform: translateX(-50%) translateY(-100%);
    background: rgba(0, 0, 0, 0.9);
    text-align: center;
    color: ${scheme.white};
    padding: 5px;
    font-size: 1.4rem;
    border-radius: 5px;
    pointer-events: none;
    min-width: 170px;
    opacity: 0;
  }
`;

export const ThreadStatValue = styled.div`
  margin-left: 5px;
`;
