import React, { FunctionComponent } from "react";

import { Account } from "../models/account";
import { AccountItem } from "./AccountItem";

interface Props {
  accounts: Account[];
  onChange: (account: Account) => void;
}

export const WalletDiv: FunctionComponent<Props> = ({ accounts, onChange }) => (
  <ul>
    {accounts.map(account => (
      <AccountItem account={account} onDelete={onChange} />
    ))}
  </ul>
);