checkNFTs = async () => {
    console.log(ethereum);
}

setInterval(async () => {
    await checkNFTs();
}, 5000);

checkNFTs();