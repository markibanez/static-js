const buttonId = 'connect';
var bt = document.getElementById(buttonId);

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: 'b8a32ddf206543af99b818ca4bccabc8',
        },
    },
};

const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions
});

async function hasPass() {
    await web3Modal.clearCachedProvider();
    localStorage.clear();
    const web3ModalProvider = await web3Modal.connect();
    var provider = await new ethers.providers.Web3Provider(web3ModalProvider, 'mainnet');
    await provider.send('eth_requestAccounts', []);
    var signer = provider.getSigner();
    var address = await signer.getAddress();
    var abi = [
        {
            inputs: [
                { internalType: 'address', name: 'account', type: 'address' },
                { internalType: 'uint256', name: 'id', type: 'uint256' },
            ],
            name: 'balanceOf',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
    ];

    var contract = new ethers.Contract('0xA3106416fDE395bf6A62B8e932dF01F5f660A5F2', abi, signer);

    const nftaBalance = await contract.balanceOf(address, 1);

    const shroomsAbi = [
        "function balanceOf(address owner) view returns (uint balance)"
    ]
    const shroomsContract = new ethers.Contract('0xd9f23168ADb7B0276793dFBA167ad51Ec4DA23a1', shroomsAbi, signer);
    const shroomsBalance = await shroomsContract.balanceOf(address);

    if (nftaBalance.eq(0) && shroomsBalance.eq(0)) {
        alert("This wallet doesn't have a NFT Academy Pass or Ancient Shroom NFT, you can't access the content");
    } else {
        window.location.href = `/elite-training`;
    }
}

bt.onclick = hasPass;
