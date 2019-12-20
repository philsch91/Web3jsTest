import React from 'react';
import { Transaction } from '../models/transaction';

interface Props {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onAdd: (event: React.FormEvent<HTMLFormElement>) => void;
    transaction: Transaction;
}
  
export const NewTransactionForm: React.FunctionComponent<Props> = ({
    onChange,
    onAdd,
    transaction
}) => (
    <form onSubmit={onAdd}>
      <input onChange={onChange} value={transaction.name} />
      <button type="submit">Create a transaction</button>
    </form>
);