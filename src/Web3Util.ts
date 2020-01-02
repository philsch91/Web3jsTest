import Web3 from 'web3';

export class Web3Util extends Web3 {
    public static loadWeb3(){
        /*
        if(window.web3 !== undefined){
            return new Web3(window.web3.currentProvider);
        }
        */
    }

    public readAccounts(callback: (error: Error, accounts: Account[]) => void ) {
        this.eth.getAccounts((error: Error, accounts: string[]) => {
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
            
            callback(error, accountList);
        });
    }
}