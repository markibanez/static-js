checkNFTs = async () => {
    console.log(ethereum);
    // wtf this works
}

setInterval(async () => {
    await checkNFTs();
}, 5000);

checkNFTs();