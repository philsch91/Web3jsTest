import React from 'react';

interface Props {
    onSwitch: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const AccountForm: React.FunctionComponent<Props> = ({ onSwitch }) => (
    <form onSubmit={onSwitch}>  
    <button type="submit">Change</button>
    </form>
);