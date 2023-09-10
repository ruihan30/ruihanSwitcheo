function prSwap() {
    var pay = document.getElementsByClassName("currency")[0].querySelector("span");
    var payImg = document.getElementsByClassName("slct")[0];

    var rec = document.getElementsByClassName("currency")[1].querySelector("span");
    var recImg = document.getElementsByClassName("slct")[1];

    console.log(payImg.src);
    const temp = pay.innerHTML;
    pay.innerHTML = rec.innerHTML;
    rec.innerHTML = temp;
    
    payImg.src = "./tokens/" + pay.innerHTML.trim() + ".svg";
    recImg.src = "./tokens/" + rec.innerHTML.trim() + ".svg";

    convert();
}

function updateBgColor(event) {
    var button = event.target;
    var bgColor = getComputedStyle(button).backgroundColor;

    var img = button.querySelector(".dropdown")
    img.style.backgroundColor = bgColor; 
}

function resetBgColor(event) {
    var button = event.target;
    button.querySelector(".dropdown").style.backgroundColor = "white";
}


// Print out list of token details

const currencyData = [{"currency":"BLUR", "name":"Blur","price":0.20811525423728813},
{"currency":"bNEO", "name":"Neo", "price":7.1282679},
{"currency":"BUSD", "name":"Binance USD","price":0.999183113},
{"currency":"USD", "name":"US Dollars", "price":1},
{"currency":"ETH", "name":"Ether","price":1645.9337373737374},
{"currency":"GMX", "name":"Utility & Governance","price":36.345114372881355},
{"currency":"STEVMOS", "name":"Stride Staked Evmos","price":0.07276706779661017},
{"currency":"LUNA", "name":"Luna","price":0.40955638983050846},
{"currency":"RATOM", "name":"Stafi Staked Atom","price":10.250918915254237},
{"currency":"STRD", "name":"Stride", "price":0.7386553389830508},
{"currency":"EVMOS", "name":"Evmos", "price":0.06246181355932203},
{"currency":"IBCX", "name":"Interchain Index","price":41.26811355932203},
{"currency":"IRIS", "name":"Iris","price":0.0177095593220339},
{"currency":"ampLUNA", "name":"Eris Amplified Luna","price":0.49548589830508477},
{"currency":"KUJI", "name":"Kujira","price":0.675},
{"currency":"STOSMO", "name":"Stride Staked Osmosis","price":0.431318},
{"currency":"axlUSDC", "name":"Axelar Wrapped USDC", "price":0.989832},
{"currency":"ATOM", "name":"Atom","price":7.186657333333334},
{"currency":"STATOM", "name":"Stride Staked Atom","price":8.512162050847458},
{"currency":"OSMO", "name":"Osmosis","price":0.3772974333333333},
{"currency":"rSWTH", "name":"Stafi Staked Switcheo","price":0.00408771},
{"currency":"STLUNA", "name":"Stride Staked Luna","price":0.44232210169491526},
{"currency":"LSI", "name":"Lightning Shiba Inu","name":"Blur","price":67.69661525423729},
{"currency":"OKB", "name":"OK BLockchain","price":42.97562059322034},
{"currency":"OKT", "name":"OK Chain","price":13.561577966101694},
{"currency":"SWTH", "name":"Switcheo","price":0.004039850455012084},
{"currency":"USC", "name":"Ultimate Secure Cash","price":0.994},
{"currency":"USDC", "name":"USD Coin","price":0.9998782611186441},
{"currency":"WBTC", "name":"Wrapped Bitcoin","price":26002.82202020202},
{"currency":"wstETH", "name":"Wrapped Liquid Staked Ether","price":1872.2579742372882},
{"currency":"YieldUSD", "name":"Yield USD","price":1.0290847966101695},
{"currency":"ZIL", "name":"Zilliqa", "price":0.01651813559322034}];

let count = 0;
document.addEventListener('DOMContentLoaded', function() {
    while (count < currencyData.length ) {
        const item = currencyData[count];
        const tokensf = item.currency;
        const name = item.name;

        var button = document.createElement("button");
        button.className = "modal-button";
        button.onclick = function() {
            let i = 0;
            if (sessionStorage.getItem("pay") != "true") i=1;
            
            document.getElementsByClassName("currency")[i].querySelector("span").innerHTML = tokensf + " ";
            document.getElementsByClassName("slct")[i].src = "./tokens/" + tokensf + ".svg";
            convert();
        };
        var token = document.createElement("img");
        token.className = "tokenlogo";
        token.src = "./tokens/" + tokensf + ".svg";
        var para = document.createElement("p");
        para.className = "token-labels";
        var tokenName = document.createElement("span");
        tokenName.className = "tokenname";
        tokenName.innerHTML = name;
        var tokenSf = document.createElement("span");
        tokenSf.className = "tokensf";
        tokenSf.innerHTML = tokensf; 

        document.getElementsByClassName("modal")[0].appendChild(button);
        document.getElementsByClassName("modal-button")[count].appendChild(token);
        document.getElementsByClassName("modal-button")[count].appendChild(para);
        document.getElementsByClassName("token-labels")[count].appendChild(tokenName);
        document.getElementsByClassName("token-labels")[count].appendChild(tokenSf);

        count++;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const ps = new PerfectScrollbar('.modal', {
        wheelSpeed: 0.4,
        wheelPropagation: true,
        minScrollbarLength: 20
    });
});

function toggleModal(event) {
    var modal = document.querySelector(".modal");
    modal.style.display = "block";

    var button = event.target;
    if (button == document.querySelectorAll(".currency")[0]) sessionStorage.setItem("pay", "true");
    else sessionStorage.setItem("receive", "true");

    document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5);";
}

window.onclick = function(event) {
    var modal = document.querySelector(".modal");
    var button1 = document.querySelectorAll(".currency")[0];
    var button2 = document.querySelectorAll(".currency")[1];

    if (event.target != modal && event.target != button1 && event.target != button2) {
        if (modal.style.display == "block") {
            modal.style.display = "none";
            sessionStorage.setItem("pay", "false");
            sessionStorage.setItem("receive", "false");
        }
    }
}

function convert() {
    const input = document.getElementsByClassName("amount")[0].value;
    const output = document.getElementsByClassName("value")[0];
    const recInput = document.getElementsByClassName("amount")[1];
    const recOutput = document.getElementsByClassName("value")[1];

    let payExRate;
    for (const item of currencyData){
        var token = document.getElementsByClassName("currency")[0].querySelector("span").innerHTML.trim();
        if (item.currency === token) {
            payExRate = item.price;
            break;
        }
    }
    
    let num = input*payExRate;
    output.value = "$" + num.toFixed(2);
    
    let recExRate;
    for (const item of currencyData){
        var token = document.getElementsByClassName("currency")[1].querySelector("span").innerHTML.trim();
        if (item.currency === token) {
            recExRate = item.price;
            break;
        }
    }

    let recNum = num/recExRate;
    recInput.value = recNum.toFixed(2);

    if (input === "") {
        output.value = "";
        recInput.value = "";
    }
}