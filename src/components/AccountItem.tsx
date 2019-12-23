import React, { FunctionComponent } from "react";
import { Account } from "../models/account";

interface Props {
  account: Account;
  onChange: (account: Account) => void;
}

export const AccountItem: FunctionComponent<Props> = ({ account, onChange }) => {
  const onClick = () => {
    onChange(account);
  };

  return (
    <li>
      {account.id} {account.name} {account.privateKey} <button onClick={onClick}>Change</button>
    </li>
  );
};