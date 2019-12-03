
var contractAddress = "0x557D0Ecd8A9ae210519d1bD9B543723E04941eEe";//"0x9B3cC03489B11ec13ccaA136D1fc682510B5f6de";
var provider = new ethers.providers.Web3Provider(web3.currentProvider);
var signer = provider.getSigner();
var contract = new ethers.Contract(contractAddress, contractAbi, signer);

// function getContractBalance() {    
//     var boxBalance = document.getElementById("boxBalance");
//     console.log("getContractBalance - submitting the request");     
//     contract.getContractBalance()
//     .then( (resultFromContract) => {
//         console.log("getContractBalance - result is", resultFromContract);
//         boxBalance.innerHTML = resultFromContract;
//     })
//     .catch( (err) => {
//         console.error(err);
//         alert("A screen will be load asking to allow this page to connect with your Ethereum account.\nPlease give this permission to proceed.\nOr if you don't have an Ethereum account please install Metamask");
//         ethereum.enable();
//         alert("After you give the permission we are going to reload the page");
//         document.location = "index.html";
//     });
// }


function executeAluguel() {
   

    var periodoDeLocacao = document.frmAluguel.periodoDeLocacao.value;  
    var nomeCliente = document.frmAluguel.nomeCliente.value;    
    var valorDiaria = '1000000000000000000';//wei = 1 ether
                      
                      
    var boxCommStatus = document.getElementById("boxCommStatus");
    boxCommStatus.innerHTML = "Sending transaction..."; 
  
    var valor = periodoDeLocacao*(valorDiaria*2);    
   
    var additionalSettings = {
        value: ethers.utils.parseUnits(String(valor),'wei'),
        gasLimit: 3000000
    }; 

    contract.alugar( nomeCliente, periodoDeLocacao ,additionalSettings)
    .then( (tx) => {

        console.log("executeAluguel - Transaction ", tx);   
        boxCommStatus.innerHTML = "Transaction sent. Waiting for the result...";
        tx.wait()
        .then( (resultFromContract) => {
            console.log("executeAluguel - the result was ", resultFromContract);           
            boxCommStatus.innerHTML = "Transaction executed.";
        })        
        .catch( (err) => {
            console.error("executeAluguel - after tx being mint");
            console.error(err);
            boxCommStatus.innerHTML = "Algo saiu errado: " + err.message;
        })
    })
    .catch( (err) => {
        console.error("executeAluguel - tx has been sent");
        console.error(err);
        boxCommStatus.innerHTML = "Something went wrong: " + err.message;
    })
}
