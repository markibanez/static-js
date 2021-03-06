const buttonId = 'connect';
var bt = document.getElementById(buttonId);

async function hasPass() {
    var provider = await new ethers.providers.Web3Provider(window.ethereum, 'mainnet');
    await provider.send('eth_requestAccounts', []);
    var signer = provider.getSigner();
    var address = await signer.getAddress();
    var abi = [{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

    var contract = new ethers.Contract('0xA3106416fDE395bf6A62B8e932dF01F5f660A5F2', abi, signer);

    contract.balanceOf(address, "1").then((res) => {
        if (res.eq(0)) {
            alert("This wallet doesn't have a NFT Academy Pass, you can't access the content");
        } else {
            window.location.href = `/course-trainings`;
        }
    });
}

bt.onclick = hasPass;