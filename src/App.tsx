import React from 'react';
import logo from './logo.svg';
import Web3 from 'web3';

import { Transaction } from './models/transaction';
import { Account } from './models/account';
import { NewTransactionForm } from './components/NewTransactionForm'
import { TransactionList } from './components/TransactionList'
import { WalletDiv } from './components/WalletDiv';
import './App.css';

interface State {
  accounts: Account[];
  newTransaction: Transaction;
  transactions: Transaction[];
}

class App extends React.Component<{}, State> {
  state = {
    accounts: [],
    newTransaction: {
      number: 1, 
      id: "test",
      name: ""
    },
    transactions: []
  };

  render() {
    return (
      <div>
        <h2>Web3.js Test</h2>
        <WalletDiv accounts={this.state.accounts} onDelete={this.changeAccount} />
        <NewTransactionForm
          transaction={this.state.newTransaction}
          onAdd={this.addTransaction}
          onChange={this.handleTransactionChange}
        />
        <TransactionList transactions={this.state.transactions} onDelete={this.deleteTransaction} />
      </div>
    );
  }

  private addTransaction = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    this.setState(previousState => ({
      newTransaction: {
        number: previousState.newTransaction.number + 1,
        id: "",
        name: ""
      },
      transactions: [...previousState.transactions, previousState.newTransaction]
    }));
  };
  
  private handleTransactionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTransaction: {
        ...this.state.newTransaction,
        name: event.target.value
      }
    });
  };

  private deleteTransaction = (transactionToDelete: Transaction) => {
    this.setState(previousState => ({
      transactions: [
        //...previousState.transactions.filter(transaction => transaction.id !== transactionToDelete.id)
        ...previousState.transactions.filter(transaction => transaction.number !== transactionToDelete.number)
      ]
    }));
  };

  private changeAccount = (accountToChange: Account) => {
    this.setState(previousState => ({
      accounts: [
        ...previousState.accounts.filter(account => account.id !== accountToChange.id)
      ]
    }));
  };
}

export default App;