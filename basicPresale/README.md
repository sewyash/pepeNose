
# Presale Smart Contract
This repository contains a Presale Smart Contract for EVM network written in Solidity programming language ^0.8.0.

## Contract Discription
This contract represents a token presale mechanism where users can buy a specified amount of $NOSE according to the established price, price calculated in 1 ETH = how many tokens? .

### Key details:

- The contract uses ERC20 tokens.

- The maximum number of tokens per wallet is defaulted to 30000 tokens.

- The price of each tokens is calculated as how many tokens should equal to 1 Eth. Default value says 4000 $NOSE = 1 Eth => price per $NOSE = 0.00025 Eth.

- price can be changeded by calling the adjustTokensPerEth function.

- The minimum buy value is defaulted to 0.01 ether.

- The contract contains a flag 'isOpen' which indicates whether the sale is open or not, oh which's state can be changed via 'toggleOpen' function.

- The contract keeps track of each user's token balance.

- The contract can be controlled by its owner (deployer of the contract). Only the owner can withdraw Ether, toggle the sale open/closed, and adjust the price per token.

### The main functions of the contract are:

buy: Allows a user to buy tokens. This function checks whether the sale is open, if the value sent is greater than or equal to the minimum buy, if the amount of tokens a user will have after the operation doesn't exceed the maximum allowed, and if there are enough tokens left for the operation. It also updates the user's token balance and transfers the tokens.

withdrawEth: Allows the contract owner to withdraw the accumulated Ether.

toggleOpen: Allows the contract owner to open or close the sale.

adjustTokensPerEth: Allows the contract owner to adjust the price as 1 ETH = how many tokens? .

onlyOwner: Makes it so only the owner can modify mentioned functions like toggleOpen, adjustTokensPerETH and withdrawETH.

### Usage
To use this contract, you will need to have a Solidity compiler version 0.8.0 or later.

To interact with this contract, deploy it to the Ethereum network of your choice (either a local test network, a testnet, or the mainnet). Be sure to provide the ERC20 token's address as an argument to the constructor function upon deployment.

### Dependencies
The contract uses OpenZeppelin's (https://docs.openzeppelin.com/) ERC20 and ReentrancyGuard contracts for secure and standard compliant token operations and to prevent reentrancy attacks, respectively. 

### Note
This contract doesn't handle more complex features like tiered pricing or a whitelist of participants. Be sure to audit your contracts thoroughly before deploying them and test them on testnet.

### Sources
This contract is inspired from @yomi2dev 's https://github.com/yomi2dev/basicPresale . 

### Licence
MIT License.
