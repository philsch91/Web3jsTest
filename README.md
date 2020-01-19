# Web3jsTest

### Setup

1. npm install -g typescript
2. npx create-react-app web3jstest --typescript
3. cd web3jstest
4. npm install web3
5. npm install --save react-router-dom
6. npm install --save @types/react-router-dom


### Truffle Setup
1. npm install -g truffle
2. npm install --save @types/jest
3. truffle init
4. configure networks in truffle-config.js
5. configure solc compiler in truffle-config.js
6. implement contracts with Solidity and place them in ./contracts
7. add contracts in 2_deploy_contracts.js
8. truffle test [Truffle testing documentation](http://truffleframework.com/docs/getting_started/testing)
9. truffle compile
10. truffle migrate [Truffle migrations documentation](http://truffleframework.com/docs/getting_started/migrations)

### Solc-js Setup
1. npm install -g solc [GitHub Solc-js](https://github.com/ethereum/solc-js)
2. check Solidity compiler version with `solc-js --version`
3. Compile bytecode and Application Binary Interface (ABI) with `solcjs --bin --abi Deal.sol`
4. Combine both in a single file with the adapted `combine-contract.js`
5. Copy the written file into to source code directory
