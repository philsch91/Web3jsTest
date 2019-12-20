import React, { FunctionComponent } from "react";

import { Account } from "../models/account";

interface Props {
  account: Account;
  onDelete: (account: Account) => void;
}

export const AccountItem: FunctionComponent<Props> = ({ account, onDelete }) => {
  const onClick = () => {
    onDelete(account);
  };

  return (
    <li>
      {account.name} <button onClick={onClick}>Change</button>
    </li>
  );
};