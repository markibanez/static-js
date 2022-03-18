const connectUrl = '/connect-web3'

checkNFTs = async () => {
    console.log(ethereum);
    if (ethereum) {
        if (ethereum.selectedAddress) {
            console.log(ethereum.selectedAddress);
        } else {
            console.log('no wallet address');
            // window.location.href = connectUrl;
        }
    } else {
        console.log('no ethereum');
        // window.location.href = connectUrl;
    }
}

setInterval(async () => {
    await checkNFTs();
}, 5000);

checkNFTs();