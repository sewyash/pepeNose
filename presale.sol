//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Presale is ReentrancyGuard {

    ERC20 token;

    uint256 public constant maxTokensPerWallet = 6900 ether;
    uint256 public tokensPerEth = 6900 ether; //price of the presale tokens
    uint256 public constant minimumBuy = 0.01 ether;

    bool public presaleOpen = false;
    bool public whitelistOpen = true;

    mapping(address => uint256) userBalances;
    mapping(address => bool) whitelistAddresses;


    address owner;
    address public constant noseDeployer = 0x521374130E9d4132c1b1E61453ba92F11647D493;

    constructor(address _token){
        token = ERC20(_token);
        owner = payable(msg.sender);

        // Whitelisted Addresses:
        whitelistAddresses[0xfc5592AC8cDe4e8b859777d7997D9F4877f4d857] = true;
        whitelistAddresses[0x7096056067E395Ecc1e877cE573339c6191A2B1b] = true;
        whitelistAddresses[0x15E8109a71e9e4a1B256bbB397E04aF0d866BEa9] = true;
        whitelistAddresses[0x5C3D57aFe1b5c7b3a92c6bfD045fA5A2Df2b4711] = true;
        whitelistAddresses[0x8cA0e16ca885835668d2dE340B70E8bEfe0Dd792] = true;
        whitelistAddresses[0x966feF13b4E1aBB5DD9025946b064E1238Dc3fD7] = true;
        whitelistAddresses[0xeEfD0e899Eb897553E54570879e8730f78Fc3158] = true;
        whitelistAddresses[0x800852fb2974059716E9fb3D5e98D8A1E0042331] = true;
        whitelistAddresses[0x28c9cD9027f3E9aE276621AbBf9ACBc09c50a0a6] = true;
        whitelistAddresses[0xf597c9db2D05478CE73Aa919A5977eDd98B75A80] = true;
        whitelistAddresses[0xD77A8Cde26AfB5b711F0E25C23a48562d5259bF3] = true;
        whitelistAddresses[0x90A5d61387C4Df28da7030b114ccc50F18d66758] = true;
        whitelistAddresses[0x35D677B1a167C8999C9aFDA54eF393fE3e116A5e] = true;
        whitelistAddresses[0x85789daB691cFb2f95118642d459E3301aC88ABA] = true;
        whitelistAddresses[0x9F883Bc43f93Ae2F2C40C7c426614BCbA43BafA8] = true;
        whitelistAddresses[0x56fCca6Db2780B1AccA2CDd875882E9D16e8c401] = true;
        whitelistAddresses[0x5607f96D4f0088833a10377F7f43eb19bc24B171] = true;
        whitelistAddresses[0xc8F0fFFf7514f8a90263856635A7A4c063a8c166] = true;
        whitelistAddresses[0x06AeAf8C225D558DC1644f9Ce889e45e59b732D2] = true;
        whitelistAddresses[0xe7d0B3251a93cf3FC2325b199A7C11Cb63E32d1C] = true;
        whitelistAddresses[0xBf274F6A7DCE577a32dFf93D4CCcdDf522abE382] = true;
        whitelistAddresses[0x3A9c626CbE9057F208782A16dE682eBEcd12aE6B] = true;
        whitelistAddresses[0xdBfbeAd511E27319325AcE480Ff428531B55d8E9] = true;
        whitelistAddresses[0xcb5D262D8eFd65A2b9c4A7245545788AC66FC556] = true;
        whitelistAddresses[0x5f4BE9B2AFB94ED9EaC75fEF6254cEe34e690D6d] = true;
        whitelistAddresses[0x4d38278C0b46c6f243d3437fF9332C7658f55299] = true;
        whitelistAddresses[0x45f40836a57bE189d3966085A21ca24e6B56561F] = true;
        whitelistAddresses[0x7152275089DDbc2704D31C5A7B70ffb0eFf949a7] = true;
        whitelistAddresses[0x0320eda318Fd33aBF8D7Aa1d6ea6eD3897616bd8] = true;
        whitelistAddresses[0x598abd49A879c2C825B335E3DBFD3BA57057d242] = true;
        whitelistAddresses[0xE3D0D40299ABb36e54c211f2eb25067bDBDa0C0F] = true;
        whitelistAddresses[0x325C454E28e81fDe01aBc3f28998aDae0da4BF1c] = true;
        whitelistAddresses[0xE9468c92A7d23bbdEb28fEF7EaA1CE331c366f1d] = true;
        whitelistAddresses[0xE2885aa5413C5A54AC8bbbbcC7Ea58E22e42dCD7] = true;
        whitelistAddresses[0xA3d3f5e19b55266FC2E2c14EF4488f450917E9F9] = true;
        whitelistAddresses[0x2e80096b6D76343cC10587577f6873519e14188D] = true;
        whitelistAddresses[0x49aa74898D2dd160515F4461Ca71659e926f930d] = true;

    }

    function buyInEth() public payable nonReentrant {

        if (whitelistOpen) {
            require(whitelistAddresses[msg.sender], "Only Whitelisted Addresses can participate right now! Please wait for public sale to commence.");
        } else {
            require(presaleOpen, "Presale is not open yet!");
        }

        require(msg.value >= minimumBuy, "You must buy at least 0.01 ETH worth of $NOSE tokens!");

        uint256 amountOfTokens = (msg.value * tokensPerEth) / 1e18;

        require(userBalances[msg.sender] + amountOfTokens <= maxTokensPerWallet, "That will exceed the max allocation per wallet!");
        require(token.balanceOf(address(this)) >= amountOfTokens, "Not enough tokens left!");

        userBalances[msg.sender] += amountOfTokens;
        token.transfer(msg.sender, amountOfTokens);
        
    }

    function togglePresale() external onlyOwner {
        presaleOpen = !presaleOpen;
    }

    function toggleWhitelist() external onlyOwner {
        whitelistOpen = !whitelistOpen;
    }

    function addAddressToWhitelist(address _address) external onlyOwner {
        whitelistAddresses[_address] = true;
    }

    function removeAddressFromWhitelist(address _address) external onlyOwner {
        whitelistAddresses[_address] = false;
    }

    function withdrawEth() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    function adjustTokensPerEth(uint256 _tokensPerEth) external onlyOwner { // Renamed to adjustTokensPerEth
        tokensPerEth = _tokensPerEth;
    }

    function getRemainingTokens() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function returnAllTokensToDeployer() external onlyOwner {
        uint256 remainingTokens = token.balanceOf(address(this));
        require(remainingTokens > 0, "No tokens left to transfer");
        token.transfer(noseDeployer, remainingTokens);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner.");
        _;
    }
}