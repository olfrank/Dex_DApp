<<<<<<< HEAD
=======

// import Dex from '../build/Dex.json'
// const dex = new web3.eth.Contract(abi, contractAddress);
let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

//import Web3, { givenProvider } from 'web3';
// Web3 = require('web3');
// var web3 = new Web3(web3.givenProvider);
>>>>>>> 37c3d9f779b349a2a7665ebb83277b8a031098cd

// var web3 = new Web3(givenProvider);
let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

<<<<<<< HEAD
=======
var contractAddress = "0xF7de7D15577708fC12cd3044a793064B9e55bBD6"
>>>>>>> 37c3d9f779b349a2a7665ebb83277b8a031098cd

var contractAddress = "0x72f3d9f4C587C753ad065e7d8387fDc8ffce525f"

$(document).ready(function (){
    window.ethereum.enable().then(async function(accounts){
        dex = await new web3.eth.Contract(abi, contractAddress, {from: accounts[0]})
<<<<<<< HEAD
        showETHBalance();
        showOrderbookBuy();
        showOrderbookSell();
        showTokenList();
        showTokenBalance();
=======
        // showETHBalance();
        // showOrderbookBuy();
        // showOrderbookSell();
        // showTokenList();
        // showTokenBalance();
>>>>>>> 37c3d9f779b349a2a7665ebb83277b8a031098cd
       
    })


<<<<<<< HEAD
=======
function reloadPage(){
    location.reload();
}

$("#btndepositEth").click(depositEth);
$("#btnwithdrawEth").click(withdrawEth);
$("#btnLimitOrder").click(placeLimitOrder);
$("#btnMarketOrder").click(placeMarketOrder);
$("#btnOrderbook").click(reloadPage);
$("#btnTokenDeposit").click(depositTokens);
$("#btnTokenWithdraw").click(withdrawTokens);
>>>>>>> 37c3d9f779b349a2a7665ebb83277b8a031098cd


$("#btndepositEth").click(depositEth);
$("#btnwithdrawEth").click(withdrawEth);
$("#btnLimitOrder").click(placeLimitOrder);
$("#btnMarketOrder").click(placeMarketOrder);
$("#btnOrderbook").click(reloadPage);
$("#btnTokenDeposit").click(depositTokens);
$("#btnTokenWithdraw").click(withdrawTokens);

async function depositTokens(){
    let amount = $("#depositTokens").val();
    await dex.methods.deposit(amount, web3.utils.fromUtf8("LINK")).send();
}
async function withdrawTokens(){
    let amount = $("#withdrawTokens").val();
    await dex.methods.withdraw(amount, web3.utils.fromUtf8("LINK")).send();
}

async function showTokenBalance(){
    let tokenList = await dex.methods.getTokenList().call();
    for(let i =0; i< tokenList.length; i++){
        let token = await dex.methods.TokenList(i).call();
        let balance = await dex.methods.balances(ethereum.selectedAddress, token).call();
        console.log("Balance of " + web3.utils.toUtf8(token) + " is: " + balance);
        $('<span />').text(web3.utils.toUtf8(token) + ": "+ balance).appendTo("#tokenBal");
    }
}

async function showETHBalance(){
    let address = ethereum.selectedAddress;
    let currentETHBalance = await dex.methods.balances(address, web3.utils.fromUtf8("ETH")).call();
    console.log(web3.utils.fromWei(currentETHBalance));
    $("<span />").text(" " + web3.utils.fromWei(currentETHBalance)).appendTo("#eth-balance");
    $("<span />").text(" " + currentETHBalance).appendTo("#wei-balance");

}

async function showTokenList(){ 
    let list = await dex.methods.getTokenList().call();
    for(let i=0; i < list.length; i++){
        let tokenList = await dex.methods.TokenList(i).call();
        $('<p />').text("Ticker: " + web3.utils.toUtf8(tokenList) + ", ").appendTo('.listOfTokens');
    }
}

async function showOrderbookBuy(){ 
    let orderbook = dex.methods.getOrderBook(web3.utils.fromUtf8("ADA"), 0).call();
    for(let i = 0; i < orderbook.length; i++){
        let ticker = orderbook["ticker"][i];
        let amount = orderbook["amount"][i];
        let price = web3.utils.fromWei(orderbook[i]["price"]);
        console.log(ticker);
        console.log(amount);
        console.log(price);


        $("<tr/>").appendTo("#BuyOrders");
        $("<td/>").text("Ticker: " + web3.utils.fromUtf8(ticker).toString()).appendTo("#BuyOrders");
        $("<td/>").text("Amount: " + amount).appendTo("#BuyOrders");
        $("<td/>").text("Price (in Wei): " + web3.utils.fromWei(price).toString()).appendTo("#BuyOrders");
    }

}

async function showOrderbookSell(){
    let orderbook = dex.methods.getOrderBook(web3.utils.fromUtf8("ADA"), 1).call();
    for(let i = 0; i<orderbook.length; i++){
        let ticker = orderbook[i]["ticker"];
        let amount = orderbook[i]["amount"];
        let price = web3.utils.fromWei(orderbook[i]["price"]);
        $("<tr/>").appendTo("#SellOrders");
        $("<td/>").text("Ticker: " + web3.utils.fromUtf8(ticker).toString()).appendTo("#SellOrders");
        $("<td/>").text("Amount: " + amount).appendTo("#SellOrders");
        $("<td/>").text("Price (in Wei): " + web3.utils.fromWei(price).toString()).appendTo("#SellOrders");
    }
}

function reloadPage(){
    location.reload();
}


async function placeLimitOrder(){
    let side = $("#typeL").val();
    console.log(side);
    let ticker = $("#tickerL").val();
    console.log(ticker);

    let amount = $("#amountL").val();
    console.log(amount);

    let price = $("#priceL").val();
    console.log(price);

    await dex.methods.createLimitOrder(side, web3.utils.fromUtf8(ticker), amount, price).send();
    reloadPage();
}

async function placeMarketOrder(){
    let side = $("#typeM").val();
    console.log(side)
    let ticker = $("#tickerM").val();
    console.log(ticker);
    let amount = $("#amountM").val();
    console.log(amount);
    await dex.methods.createMarketOrder(side, web3.utils.fromUtf8(ticker), amount).send();
    alert("Your Market Order Has Been Placed");
    reloadPage()
}


async function withdrawEth(){
    let amount = $("#withdrawEther").val();
    console.log(amount);
    let address = ethereum.selectedAddress;
    console.log(address);
    let balanceBefore = await dex.methods.balances(address, web3.utils.fromUtf8("ETH")).call();
    console.log(balanceBefore);
    await dex.methods.withdrawEth(amount).send({from: ethereum.selectedAddress});
    let balanceAfter = await dex.methods.balances(ethereum.selectedAddress, web3.utils.fromUtf8("ETH")).call();
    console.log(balanceAfter);
    
    reloadPage()
    
}

async function depositEth (){
    let amount = $("#depositEther").val();
    console.log(amount);
    let address = ethereum.selectedAddress;
    console.log(address);
    let balance = await dex.methods.balances(address, web3.utils.fromUtf8("ETH")).call();
    console.log(balance);
    await dex.methods.depositEth().send({value: web3.utils.toWei(amount, "ether")});
    balance = await dex.methods.balances(address, web3.utils.fromUtf8("ETH")).call();
    console.log(balance);
    
    reloadPage();
    
}

<<<<<<< HEAD












=======
>>>>>>> 37c3d9f779b349a2a7665ebb83277b8a031098cd
});