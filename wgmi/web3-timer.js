const connectUrl = '/connect-web3'

checkNFTs = async () => {
    try {
        if (typeof ethereum !== 'undefined') {
            console.log('ethereum.selectedAddress: ', ethereum.selectedAddress);
            // if (ethereum.selectedAddress) {
            //     var provider = await new ethers.providers.Web3Provider(window.ethereum, "mainnet")
            //     var abi = ["function balanceOf(address owner) view returns (uint balance)"];

            //     var contract = new ethers.Contract("0xd89B00736C50C867133EBc5BF731FDbA6b29b3b7", abi, provider);

            //     contract.balanceOf(ethereum.selectedAddress).then((res) => {
            //         if (res.eq(0)) {
            //             window.location.href = `${connectUrl}?code=zero-balance`;
            //         }
            //     })
            // } else {
            //     window.location.href = `${connectUrl}?code=no-wallet`;
            // }
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

checkNFTs();