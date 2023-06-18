let web3;
let userAccount;
let presaleContract;
let walletButton;

const presaleAddress = "0xb48D0d5c8284e5166d9B357C3E769782DC6766De";
const presaleABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "addAddressToWhitelist",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokensPerEth",
				"type": "uint256"
			}
		],
		"name": "adjustTokensPerEth",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "buyInEth",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRemainingTokens",
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
		"name": "maxTokensPerWallet",
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
		"name": "minimumBuy",
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
		"name": "noseDeployer",
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
		"name": "presaleOpen",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "removeAddressFromWhitelist",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "returnAllTokensToDeployer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "togglePresale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "toggleWhitelist",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokensPerEth",
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
		"name": "whitelistOpen",
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
		"name": "withdrawEth",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

async function init() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            let accounts = await web3.eth.getAccounts();
            selectedAccount = accounts[0];
            console.log(selectedAccount);
            presaleContract = new web3.eth.Contract(presaleABI, presaleAddress);
            updateStats();
            updateWalletStatus(true);
        } catch (err) {
            console.error("Error:", err.message);
        }
    } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
        let accounts = await web3.eth.getAccounts();
        selectedAccount = accounts[0];
        presaleContract = new web3.eth.Contract(presaleABI, presaleAddress);
        updateStats();
    } else {
        alert("Please install Metamask or another web3 provider!");
    }
}

document.getElementById("buyPresaleButton").addEventListener("click", async () => {
	try {
		const amountToBuy = document.getElementById("amount").value;
        const amountInWei = await calculateAmountInWei(amountToBuy);
		await presaleContract.methods.buyInEth().send({ from: selectedAccount, value: amountInWei });
		updateStats();
	} catch (error) {
		console.log("Error sending transaction:", error);
	}
});

document.getElementById("walletButton").addEventListener("click", async () => {
	if (window.ethereum) {
		web3 = new Web3(window.ethereum);
		try {
            await window.ethereum.enable();
			let accounts = await web3.eth.getAccounts();
			selectedAccount = accounts[0];
            console.log(selectedAccount);
			presaleContract = new web3.eth.Contract(presaleABI, presaleAddress);
            updateStats();
		} catch (err) {
			console.error("Error:", err.message);
		}
	} else if (window.web3) {
		web3 = new Web3(window.web3.currentProvider);
        let accounts = await web3.eth.getAccounts();
        selectedAccount = accounts[0];
        presaleContract = new web3.eth.Contract(presaleABI, presaleAddress);
        updateStats();
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

async function updateStats() {
    const remainingTokens = await presaleContract.methods.getRemainingTokens().call();
    const formattedTokens = parseFloat(remainingTokens / 1e18).toFixed(2);
    document.getElementById("remainingTokensValue").textContent = formattedTokens;
}

async function calculateAmountInWei(amountInNose) {
    const tokensPerEth = await presaleContract.methods.tokensPerEth().call();
    const amountInWei = web3.utils.toWei(amountInNose.toString(), "ether");
    const amountInEth = web3.utils.fromWei(amountInWei, "wei") / tokensPerEth;
    return web3.utils.toWei(amountInEth.toString(), "ether");
}

function updateRemainingTokens(contract) {
    contract.methods.getRemainingTokens().call((error, result) => {
        if (!error) {
            document.getElementById('remainingTokensValue').textContent = result;
        } else {
            console.error(error);
        }
    });
}

init();
