const buttonId = "connect"
var bt = document.getElementById(buttonId)
var div = document.getElementById("content")
div.style.display="none"

async function hasPass()
{
    var provider = await new ethers.providers.Web3Provider(window.ethereum, "mainnet")
    await provider.send("eth_requestAccounts", [])
    var signer = provider.getSigner()
    var address = await signer.getAddress()
    var abi = ["function balanceOf(address owner) view returns (uint balance)"]

    var contractShroom = new ethers.Contract("0xd89B00736C50C867133EBc5BF731FDbA6b29b3b7", abi, signer)

    contractShroom.balanceOf(address).then((res) =>
    {
        if (res > 0)
        {
            bt.style.display="none"
            div.style.display="block"
        }
        else alert("This wallet doesn't have a WGMI NFT, you can't access the content")
    })
}

bt.onclick = hasPass