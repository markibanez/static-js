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
        const web3ModalProvider = await web3Modal.connect();
        if (web3Modal.cachedProvider) {
            const provider = await new ethers.providers.Web3Provider(web3ModalProvider, 'mainnet');
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            if (address) {
                console.log(`active address:`, address);
                var abi =  [{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

                var contract = new ethers.Contract("0xA3106416fDE395bf6A62B8e932dF01F5f660A5F2", abi, provider);
                const nftaBalance = await contract.balanceOf(address, 1);

                const shroomsAbi = [
                    "function balanceOf(address owner) view returns (uint balance)"
                ]
                const shroomsContract = new ethers.Contract('0xd9f23168ADb7B0276793dFBA167ad51Ec4DA23a1', shroomsAbi, signer);
                const shroomsBalance = await shroomsContract.balanceOf(address);

                if (nftaBalance.eq(0) && shroomsBalance.eq(0)) {
                    window.location.href = `${connectUrl}?code=zero-balance`;
                }
            } else {
                // console.log('ethereum.address: ', ethereum.selectedAddress);
                window.location.href = `${connectUrl}?code=no-wallet`;
            }
        } else {
            window.location.href = `${connectUrl}?code=not-connected`;
        }
    } catch (err) {
        console.log(err);
        window.location.href = `${connectUrl}?code=unhandled-exception`;
    }
}

setInterval(async () => {
    await checkNFTs();
}, 3600000);

setTimeout(async () => {
    await checkNFTs();
}, 500);