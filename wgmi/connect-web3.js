const buttonId = 'connect';
var bt = document.getElementById(buttonId);

async function hasPass() {
    var provider = await new ethers.providers.Web3Provider(window.ethereum, 'mainnet');
    await provider.send('eth_requestAccounts', []);
    var signer = provider.getSigner();
    var address = await signer.getAddress();
    var abi = ['function balanceOf(address owner) view returns (uint balance)'];

    var contract = new ethers.Contract('0xd89B00736C50C867133EBc5BF731FDbA6b29b3b7', abi, signer);

    contract.balanceOf(address).then((res) => {
        if (res.eq(0)) {
            alert("This wallet doesn't have a WGMI NFT, you can't access the content");
        } else if (res.gt(0)) {
            window.location.href = `/`;
        }
    });
}

bt.onclick = hasPass;
