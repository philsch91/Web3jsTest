import React from 'react';
import logo from './logo.svg';
import Web3 from 'web3';

import { NewTransactionForm } from './components/NewTransactionForm'
import { TransactionList } from './components/TransactionList'
import { AccountList } from './components/AccountList'
import { WalletDiv } from './components/WalletDiv';
import { AccountForm } from './components/AccountForm';
import { LoginForm } from './components/LoginForm';

import { Transaction } from './models/transaction';
import { Account } from './models/account';

import { Web3Manager } from './Web3Manager';
import { Web3NodeManager } from './helpers/Web3NodeManager';
import { AccountDelegate } from './interfaces/AccountDelegate';

import './App.css';

interface State {
  address: String;
  account: Account
  accounts: Account[];
  transactions: Transaction[];
  newTransaction: Transaction;
}

class App extends React.Component<{}, State, AccountDelegate> {
  //web3: Web3;
  state = {
    address: "",
    account: {
      name: "test",
      address: "",
      privateKey: "",
      balance: ""
    },
    accounts: [],
    transactions: [],
    newTransaction: {
      from: "", 
      id: 0,
      name: ""
    }
  };

  constructor(props: any){
    super(props);
    //8546
    this.balanceDidChange = this.balanceDidChange.bind(this);
  }

  render() {
    //<button onClick={this.readAccounts}>Change</button>
    return (
      <div>
        <h2>Web3.js Test</h2>
        <WalletDiv account={this.state.account} />
        <LoginForm address={this.state.address}
          onChange={this.handleAddressChange}
          onClick={this.connect}
        />
        <AccountForm onSwitch={this.readAccounts} />
        <AccountList accounts={this.state.accounts} onChange={this.changeAccount} />
        <NewTransactionForm
          transaction={this.state.newTransaction}
          onAdd={this.addTransaction}
          onChange={this.handleTransactionChange}
          onChangeTo={this.handleTransactionChangeTo}
          onChangeValue={this.handleTransactionChangeValue}
        />
        <TransactionList transactions={this.state.transactions} onDelete={this.deleteTransaction} />
      </div>
    );
  }

  private handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      address: event.target.value
      /*
      address: {
        ...this.state.address,
        name: event.target.value
      } */
    });
  };

  private connect = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const web3Manager = Web3NodeManager.getInstance();
    const provider = new Web3.providers.WebsocketProvider('ws://' + this.state.address);
    web3Manager.setProvider(provider);
  }

  private addTransaction = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    var transaction = this.state.newTransaction;
    
    const web3Manager = Web3NodeManager.getInstance();
    var receipt = web3Manager.eth.sendTransaction(transaction);
    console.log(receipt);
  
    this.setState(previousState => ({
      newTransaction: {
        id: previousState.newTransaction.id + 1,
        name: "",
        from: ""
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

  private handleTransactionChangeTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTransaction: {
        ...this.state.newTransaction,
        to: event.target.value
      }
    });
  };

  private handleTransactionChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTransaction: {
        ...this.state.newTransaction,
        value: event.target.value
      }
    });
  };

  private deleteTransaction = (transactionToDelete: Transaction) => {
    this.setState(previousState => ({
      transactions: [
        //...previousState.transactions.filter(transaction => transaction.id !== transactionToDelete.id)
        ...previousState.transactions.filter(transaction => transaction.id !== transactionToDelete.id)
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

    const web3Manager = Web3NodeManager.getInstance();
    web3Manager.eth.defaultAccount = newAccount.address;
    web3Manager.accountDelegate = this;
    web3Manager.stopUpdatingAccount();
    web3Manager.startUpdatingAccount();
  };

  private readAccounts = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const web3Manager = Web3NodeManager.getInstance();
    
    //web3Manager.readAccounts((error: Error, accounts: Account[]) => {
    web3Manager.readAccountsAndBalances((error: Error, accounts: Account[]) => {
      this.setState(previousState => ({
        accounts: accounts
      }));
    }); 
  };

  public balanceDidChange(manager: Web3Manager, updatedAccount: Account) {
    console.log(updatedAccount);
    this.setState(previousState => ({
      account: updatedAccount
    }));
  }

  private getAccounts = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const web3Manager = Web3NodeManager.getInstance();
    
    web3Manager.eth.getAccounts((error: Error, accounts: string[]) => {
      var accountList:Account[] = new Array(accounts.length)
      var i = 0
      for(let key in accounts){
        const address: string = accounts[key];
        console.log(address);
        //let account: Account = {id:"0", name:"test"};
        //let account = {id:"0", name: "test"} as Account;
        let account = { name: i.toString(), address: address, privateKey: "", balance: "" } as Account;
        accountList[i] = account
        i++
      }
      
      //this.state.accounts = accountList
      this.setState(previousState => ({
        //accounts: [...previousState.accounts.filter(account => account.id !== accountToChange.id)]
        accounts: accountList
      }));
    });
  };
}

export default App;