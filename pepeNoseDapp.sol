//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
//imports token contract 
interface PEPENOSE {
    function burn(uint256 amount) external;
}
//extend IERC20 to include decimals
interface IExtendedERC20 is IERC20 {
    function decimals() external view returns (uint8);
}

//pepeNose Game contract
contract pepeNoseDapp {
    IExtendedERC20 public pepeNoseToken;
    address public owner;
    address[] public touchers;
    address public defaultReferee; //Variable for a default referal link when someone plays for the first time
    uint256 public winningTouchers;
    uint256 public explosionDelay;
    uint256 public touchPrice;
    uint256 public touchIndex;
    uint256 public explosionTime;
    uint256 public totalPot;
    uint256 public cooldown;
    uint256 public lastTouchTime;
    uint256 public totalTouches;
    uint256 public totalPlayers;
    uint256 public lastPriceUpdateTime;

    mapping(address=>uint256) private playerTouchCount;
    mapping(address=>uint256) private playerSecToTimeout;
    mapping(uint256=>address) private playerIndexes;
    mapping(address=>uint256) private playerReferedByCount;
    mapping(address=>uint256) private playerReferedMoneyGain;
    
    constructor(address _pepeNoseToken, uint256 _touchPrice, address _defaultReferee, uint256 _cooldown, uint256 _explosionDelay, uint256 _winningTouchers) {
        require(_defaultReferee != address(0), "Invalid default referee address");

        owner = msg.sender;
        pepeNoseToken = IExtendedERC20(_pepeNoseToken);
        defaultReferee = _defaultReferee;
        touchPrice = _touchPrice;
        cooldown = _cooldown; //cooldown period for price increment (in seconds)
        explosionDelay = _explosionDelay;
        winningTouchers = _winningTouchers;
        
        touchers = new address[](winningTouchers);
        //setting explosionTime to a past time
        explosionTime = block.timestamp - 1;

        lastPriceUpdateTime = block.timestamp;
    }
     
    function GetTotalPlayers() external view returns(uint256) {
        return totalPlayers;
    }
    function GetTotalTouches() external view returns(uint256) {
        return totalTouches;
    }
    function GetTotalPot() external view returns(uint256) {
        return totalPot;
    }
    function GetExplosionTime() external view returns(uint256) {
        return explosionTime;
    }
    function GetTouchPrice() external view returns(uint256) {
        return touchPrice;
    }
    function GetPlayerAt(uint256 idx) external view returns (address) {
        require(idx < totalPlayers, "Player Index out of range");
        return playerIndexes[idx];
    }

    function GetPlayerDataAt(address player) external view returns(
        uint256 _playerTouchCount,
        uint256 _playerSecToTimeout, 
        uint256 _referCount, 
        uint256 _referalRevenue) {
        _playerTouchCount = playerTouchCount[player];
        _playerSecToTimeout = playerSecToTimeout[player];
        _referCount = playerReferedByCount[player];
        _referalRevenue = playerReferedMoneyGain[player];     
        }

    function GetWinnerAt(uint256 idx) external view returns (address _addr) {
        require(idx < winningTouchers, "Index out of range");
        
        if(idx < touchIndex)
            _addr = touchers[touchIndex-(idx+1)];
        else
            _addr = touchers[(touchIndex + winningTouchers) - (idx+1)];
    }
    
    function GetWinners() external view returns (address[] memory _addr) {
        _addr = new address[](winningTouchers);
        for(uint256 idx = 0; idx < winningTouchers; ++idx) {
            if(idx < touchIndex)
                _addr[idx] = touchers[touchIndex-(idx+1)];
            else
                _addr[idx] = touchers[(touchIndex + winningTouchers) - (idx+1)];
        }
        return _addr;
    }

    function updatePrice() private {
        if(block.timestamp - lastPriceUpdateTime < cooldown) {
            return;
        }
        touchPrice += 69 * (10 ** pepeNoseToken.decimals());
        lastPriceUpdateTime = block.timestamp;
    }

    function ownerUpdatePrice() external {
        require(msg.sender == owner, "Only the Owner can manually increment the price");
        touchPrice += 69 * (10 ** pepeNoseToken.decimals());
    }

    event CooldownUpdated(uint256 newCooldown);

    function setCooldown(uint256 newCooldown) external {
        require(msg.sender == owner, "Only the Owner can set the cooldown period");
        cooldown = newCooldown;
    }
    
    //function to overwrite default referee and to change the default referee address if needed...
    function setDefaultReferee(address newDefaultReferee) external {
        require(msg.sender == owner, "Only the Owner can set the default referee");
        require(newDefaultReferee != address(0), "Invalid referee address");
        defaultReferee = newDefaultReferee;
    }

    function noseTouchReferee(address referee) external {
        require(referee != address(0), "Referee cannot be an invalid address");
        require(explosionTime >= block.timestamp, "Game has ended.");
        require(referee != msg.sender, "Cannot refer yourself!");
        require(pepeNoseToken.transferFrom(msg.sender, address(this), touchPrice) , "Transfer Failed");
        
        if(playerTouchCount[msg.sender] == 0) {
            playerIndexes[totalPlayers] = msg.sender;
            totalPlayers += 1;
        }
        
        totalTouches += 1;
        lastTouchTime = block.timestamp;
        playerTouchCount[msg.sender] += 1;

        if(playerSecToTimeout[msg.sender] == 0 || playerSecToTimeout[msg.sender] > (explosionTime - block.timestamp))
            playerSecToTimeout[msg.sender] = explosionTime - block.timestamp;
        
        explosionTime = block.timestamp + explosionDelay;
        
        address refAddr = referee;
            
        totalPot = totalPot + ((touchPrice * 69) / 100); // 69% to pot

        uint256 fee = touchPrice / 10; // 10% to referral
        pepeNoseToken.transfer(refAddr, fee); // Referral paid out in $NOSE tokens

        // Burn 21%
        uint256 burnAmount = ((touchPrice * 21) / 100);
        PEPENOSE(address(pepeNoseToken)).burn(burnAmount);

        playerReferedByCount[refAddr] += 1;
        playerReferedMoneyGain[refAddr] += fee;
        
        touchers[touchIndex] = msg.sender;
        touchIndex += 1;
       
        if(block.timestamp - lastPriceUpdateTime >= cooldown) {
            updatePrice();
        }
    }
    
    function noseTouch() external {
        address referee = defaultReferee;
        require(explosionTime >= block.timestamp, "Game has ended.");
        require(pepeNoseToken.transferFrom(msg.sender, address(this), touchPrice) , "Transfer Failed");

        if(playerTouchCount[msg.sender] == 0) {
            playerIndexes[totalPlayers] = msg.sender;
            totalPlayers += 1;
        }

        totalTouches += 1;
        lastTouchTime = block.timestamp;
        playerTouchCount[msg.sender] += 1;
        if(playerSecToTimeout[msg.sender] == 0 || playerSecToTimeout[msg.sender] > (explosionTime - block.timestamp))
            playerSecToTimeout[msg.sender] = explosionTime - block.timestamp;
        
        explosionTime = block.timestamp + explosionDelay;

        address refAddr = referee;

        totalPot = totalPot + ((touchPrice * 69) / 100); // 69% to pot

        uint256 fee = touchPrice / 10; // 10% to referral
        pepeNoseToken.transfer(refAddr, fee); // Referral paid out in $NOSE tokens

        // Burn 21%
        uint256 burnAmount = ((touchPrice * 21) / 100);
        PEPENOSE(address(pepeNoseToken)).burn(burnAmount);

        playerReferedByCount[refAddr] += 1;
        playerReferedMoneyGain[refAddr] += fee;

        touchers[touchIndex] = msg.sender;
        touchIndex += 1;

        if(block.timestamp - lastPriceUpdateTime >= cooldown) {
            updatePrice();
        }
    }

    function ownerEndGame() external {
        require(msg.sender == owner, "Only the owner can end the game");
        require(explosionTime <= block.timestamp, "Game hasn't ended yet");

        uint256 winnerShare = totalPot / winningTouchers;
        for(uint256 idx = 0; idx < winningTouchers; ++idx) {
            if(touchers[idx] != address(0))
            pepeNoseToken.transfer(touchers[idx], winnerShare);
        }
        totalPot = 0;
        touchIndex = 0;
        lastTouchTime = 0;
        explosionTime = block.timestamp + 360000;
    }

    function ownerStartGame() external {
        require(msg.sender == owner, "Only the owner can start the game");
        require(explosionTime <= block.timestamp, "Game hasn't ended yet");

        explosionTime = block.timestamp + explosionDelay;
        totalPot = 0;
        touchIndex =0;
    }
    
}