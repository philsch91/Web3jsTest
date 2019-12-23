import React from 'react';
import logo from './logo.svg';
import Web3 from 'web3';

import { Transaction } from './models/transaction';
import { Account } from './models/account';
import { NewTransactionForm } from './components/NewTransactionForm'
import { TransactionList } from './components/TransactionList'
import { AccountList } from './components/AccountList'
import { WalletDiv } from './components/WalletDiv';
import { AccountForm } from './components/AccountForm';
import './App.css';

interface State {
  account: Account
  accounts: Account[];
  newTransaction: Transaction;
  transactions: Transaction[];
}

class App extends React.Component<{}, State> {
  web3: Web3;
  state = {
    account: {
      id: "test",
      name: "testname",
      privateKey: ""
    },
    accounts: [],
    newTransaction: {
      number: 1, 
      id: "test",
      name: ""
    },
    transactions: []
  };

  constructor(props: any){
    super(props);
    //8546
    this.web3 = new Web3('ws://localhost:7545');
  }

  render() {
    //<button onClick={this.readAccounts}>Change</button>
    return (
      <div>
        <h2>Web3.js Test</h2>
        <WalletDiv account={this.state.account} />
        <AccountForm onSwitch={this.readAccounts} />
        <AccountList accounts={this.state.accounts} onChange={this.changeAccount} />
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

  private handleAccountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      account: {
        ...this.state.account,
        name: event.target.value
      }
    });
  };

  private changeAccount = (newAccount: Account) => {
    this.setState(previousState => ({
      account: newAccount
    }));
  };

  private readAccounts = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.web3.eth.getAccounts((error: Error, accounts: string[]) => {
      var accountList:Account[] = new Array(accounts.length)
      var i = 0
      for(let name in accounts){
        console.log(name);
        //let account: Account = {id:"0", name:"test"};
        //let account = {id:"0", name: "test"} as Account;
        let account = {id:i.toString(), name: name} as Account;
        accountList[i] = account
        i++
      }
      
      //this.state.accounts = accountList
      this.setState(previousState => ({
        /*
        accounts: [
          ...previousState.accounts.filter(account => account.id !== accountToChange.id)
        ] */
        accounts: accountList
      }));
    });
    
  };
}

export default App;