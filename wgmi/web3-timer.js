const connectUrl = '/connect-web3'

checkNFTs = async () => {
    console.log(ethereum);
    if (ethereum) {
        if (ethereum.selectedAddress) {
            console.log(ethereum.selectedAddress);
        } else {
            window.location.href = connectUrl;
        }
    } else {
        window.location.href = connectUrl;
    }
}

setInterval(async () => {
    await checkNFTs();
}, 5000);

checkNFTs();