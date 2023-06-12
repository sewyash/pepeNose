var contract;
var userAccount;

window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
            userAccount = web3.eth.accounts[0];
            contract = new web3.eth.Contract(ABI, ContractAddress);
            startApp();
        } catch (error) {
            console.error("User denied account access");
        }
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('Non-Ethereum browser detected. You need EVM compatible browser/wallet like Metamask!');
    }
});

function startApp() {
    // Here you should initialize your app, updating the DOM elements with contract information
    // And also setting up the necessary event listeners for your contract events
}

async function touchNose() {
    const referralAddress = document.getElementById('referralAddress').value;
    // Here you should call your contract method, passing the necessary arguments
    // The specific method and arguments will depend on your contract
}
