import React, { FunctionComponent } from "react";

import { Account } from "../models/account";
import { AccountItem } from "./AccountItem";

interface Props {
  accounts: Account[];
  onDelete: (account: Account) => void;
}

export const WalletDiv: FunctionComponent<Props> = ({ accounts, onDelete }) => (
  <ul>
    {accounts.map(account => (
      <AccountItem account={account} onDelete={onDelete} />
    ))}
  </ul>
);