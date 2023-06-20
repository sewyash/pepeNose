let web3;
let selec;
let contract;
let tokenContract;
let walletButton;

const tokenAddress = "0x521374130E9d4132c1b1E61453ba92F11647D493";
const tokenABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burnFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
const contractAddress ="0xF8F6cbF2cB8A1e6765225996be46A26275745edf";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_pepeNoseToken",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_touchPrice",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_defaultReferee",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_cooldown",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_explosionDelay",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_winningTouchers",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newCooldown",
				"type": "uint256"
			}
		],
		"name": "CooldownUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newExplosionDelay",
				"type": "uint256"
			}
		],
		"name": "ExplosionDelayUpdated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "GetExplosionTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "idx",
				"type": "uint256"
			}
		],
		"name": "GetPlayerAt",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "player",
				"type": "address"
			}
		],
		"name": "GetPlayerDataAt",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_playerTouchCount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_playerSecToTimeout",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_referCount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_referalRevenue",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "GetTotalPlayers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "GetTotalPot",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "GetTotalTouches",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "GetTouchPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "idx",
				"type": "uint256"
			}
		],
		"name": "GetWinnerAt",
		"outputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "GetWinners",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_addr",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "cooldown",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "defaultReferee",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "explosionDelay",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "explosionTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "gameIsActive",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastPriceUpdateTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastTouchTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "noseTouch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "referee",
				"type": "address"
			}
		],
		"name": "noseTouchReferee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ownerEndGame",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ownerStartGame",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ownerUpdatePrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pepeNoseToken",
		"outputs": [
			{
				"internalType": "contract IExtendedERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newCooldown",
				"type": "uint256"
			}
		],
		"name": "setCooldown",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newDefaultReferee",
				"type": "address"
			}
		],
		"name": "setDefaultReferee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newExplosionDelay",
				"type": "uint256"
			}
		],
		"name": "setExplosionDelay",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalPlayers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalPot",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalTouches",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "touchIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "touchPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "touchers",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "winningTouchers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

async function updateStats() {
	if (contract) {
		const touchPrice = await contract.methods.touchPrice().call();
        const explosionTime = await contract.methods.explosionTime().call();
        const totalPot = await contract.methods.totalPot().call();
        const totalTouches = await contract.methods.totalTouches().call();
        const totalPlayers = await contract.methods.totalPlayers().call();

		const currentTime = Math.floor(new Date().getTime() / 1000); // get current time in UNIX timestamp
        const remainingTime = explosionTime - currentTime;
		const hours = Math.floor(remainingTime / 3600);
		let timeAfterHours = remainingTime % 3600;
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
		const formattedRemainingTime = remainingTime > 0 ? `Lord Pepe sadly, is a fickle minded ruler, he feels the attention is too much, yet, he constantly feels the need to be looked upto by his followers, 
		he might close the gates to his sanctuary if you don't caress his NOSE.
		In roughly: ${minutes} minutes` : 
		'Lord Pepe was finally satisfied and has granted his favorite Twenty followers the whole Pot! Please wait for his Royal Guard to carry out the order...';

		document.getElementById('touchPrice').innerHTML = "Initial Price was 69 $NOSE <br>"
		+ "Lord Pepe II - The Clown continues to increase it by 69 $NOSE every hour <br>"
		+ "Current Price = " + web3.utils.fromWei(touchPrice, 'ether') + " $NOSE";

        document.getElementById('explosionTime').innerText = formattedRemainingTime;
        document.getElementById('totalPot').innerText = "Total shekels accumulated in the Pot = " + web3.utils.fromWei(totalPot, 'ether') + " $NOSE";
        document.getElementById('totalTouches').innerText = "Total Touches = " + totalTouches;
        document.getElementById('totalPlayers').innerText = "Wanderers = " + totalPlayers;
	}
}

async function init() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            selectedAccount = accounts[0];
            console.log(selectedAccount);
            contract = new web3.eth.Contract(contractABI, contractAddress);
			tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);

			updateStats();

			updateWalletStatus(true);

			let network = await web3.eth.net.getId();
			if(network !== 42161 && ethereum) {
				alert("Please switch to Arbitrum One Mainnet to proceed.");
			}

        } catch (err) {
            console.error("Error:", err.message);
        }
    } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
    } else {
        alert("Please install MetaMask or another web3 provider!");
    }
}

document.getElementById("approveButton").addEventListener("click", async() => {
	if (!tokenContract) {
		console.log("Token Contract is undefined.");
	} else {
		console.log("Token Contract at handleApprove: ", tokenContract);
	}

	var loadingGif = document.getElementById('loading-container');
	loadingGif.style.display = "block";

	try {
		const amount = web3.utils.toWei('1000000', 'ether');
		await tokenContract.methods.approve(contractAddress, amount).send({ from: selectedAccount });
		showAlert("Approval Successful!");
	} catch (error) {
		console.log("Error sending transaction: ", error);
	} finally {
		loadingGif.style.display = "none";
	}
});

document.getElementById("nose").addEventListener("click", async () => { 
    if (!contract) {
        console.log("Contract is undefined.");
    } else {
        console.log("Contract at handleNoseTouch: ", contract);
    }

    const referee = document.getElementById('referee').value;
    var loadingGif = document.getElementById('loading-container');
    loadingGif.style.display = "block";

    try {
        if (!referee) {
            await contract.methods.noseTouch().send({ from: selectedAccount }); // Await the contract call
            showAlert("Congrats Brave Wanderer, you have Touched Lord Pepe II - The Clown's Nose!");
        } else {
            if (web3.utils.isAddress(referee)) {
                await contract.methods.noseTouchReferee(referee).send({ from: selectedAccount }); // Await the contract call
                showAlert("Congrats Brave Wanderer, you have Touched Lord Pepe II - The Clown's Nose!");
            } else {
                console.log("Alas you must have made a mistake, (txn failed)");
            }
        }
    } catch (error) {
        console.log("Error sending transaction:", error);
    } finally {
        loadingGif.style.display = "none";
    }
});

document.getElementById("walletButton").addEventListener("click", async () => { // Mark this function as async
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            let accounts = await ethereum.request({ method: 'eth_requestAccounts' }); // Declare accounts variable
            selectedAccount = accounts[0];
            console.log(selectedAccount);
            contract = new web3.eth.Contract(contractABI, contractAddress); // Change abi to contractABI
        } catch (err) {
            console.error("Error:", err.message);
        }
    } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
    } else {
        alert("Please install MetaMask or another web3 provider!");
    }
});

function updateWalletStatus(status) {
	const walletText = document.getElementById('walletText');
	const walletAddress = document.getElementById('walletAddress');
	if (status) {
	  walletText.textContent = "Wallet Connected:";
	  const truncatedAddress = selectedAccount.substring(0, 5) + "..." + selectedAccount.substring(selectedAccount.length - 4);
	  walletAddress.innerHTML = "<br>[" + truncatedAddress + "]";
	} else {
	  walletText.textContent = "Connect Wallet";
	  walletAddress.textContent = "";
	}
  }

function showAlert(message) {
    alert(message);
}

init();
