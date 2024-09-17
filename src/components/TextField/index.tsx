import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { withMask } from 'use-mask-input';

export const Input = styled.input`
  padding: 0 8px;
  vertical-align: middle;
  border-radius: 2px;
  width: 100%;
  min-height: 36px;
  background-color: #ffffff;
  border: 1px solid rgba(36, 28, 21, 0.3);
  transition: all 0.2s ease-in-out 0s;
  font-size: 16px;
  line-height: 18px;
  font-weight: normal;
  border-radius: 8px;

  :focus {
    outline: none;
    border: 1px solid #007c89;
    box-shadow: inset 0 0 0 1px #007c89;
  }
`;

export const ErrorLabel = styled.span`
  font-size: 12;
  color: red;
`;

type Props = {
  name: string;
  label?: string;
  error?: string;
  mask?: string;
} & InputHTMLAttributes<any>;

const TextField = (props: Props) => {
  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>

      <Input
        {...props}
        id={props.name}
        ref={props.mask ? withMask(props.mask) : undefined}
        aria-label={props.label ?? props.name}
        aria-describedby={`${props.name}-error`}
      />

      <ErrorLabel id={`${props.name}-error`} role="alert">
        {props.error}
      </ErrorLabel>
    </div>
  );
};

export default TextField;
