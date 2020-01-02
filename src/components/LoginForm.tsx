import React from 'react';

interface Props {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: (event: React.FormEvent<HTMLFormElement>) => void;
    address: string;
}
  
export const LoginForm: React.FunctionComponent<Props> = ({
    onChange,
    onClick,
    address}) => (
    <form onSubmit={onClick}>
      <input onChange={onChange} value={address} />
      <button type="submit">Connect</button>
    </form>
);