const connectUrl = '/connect-web3'

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

checkNFTs = async () => {
    try {
        if (typeof ethereum !== 'undefined') {
            if (ethereum.selectedAddress) {
                // console.log('ethereum.address: ', ethereum.selectedAddress);
                var provider = await new ethers.providers.Web3Provider(window.ethereum, "mainnet")
                var abi =  [{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

                var contract = new ethers.Contract("0xA3106416fDE395bf6A62B8e932dF01F5f660A5F2", abi, provider);

                contract.balanceOf(ethereum.selectedAddress, "1").then((res) => {
                    if (res.eq(0)) {
                        window.location.href = `${connectUrl}?code=zero-balance`;
                    }
                })
            } else {
                // console.log('ethereum.address: ', ethereum.selectedAddress);
                window.location.href = `${connectUrl}?code=no-wallet`;
            }
        } else {
            window.location.href = `${connectUrl}?code=no-ethereum`;
        }
    } catch (err) {
        console.log(err);
        window.location.href = `${connectUrl}?code=unhandled-exception`;
    }
}

setInterval(async () => {
    await checkNFTs();
}, 5000);

setTimeout(async () => {
    await checkNFTs();
}, 500);