// Swap button
function prSwap() {
    const pay = $(".currency").eq(0).find("span");
    const payImg = $(".slct").eq(0);
    const rec = $(".currency").eq(1).find("span");
    const recImg = $(".slct").eq(1);

    let temp = pay.html();
    pay.html(rec.html());
    rec.html(temp);
    
    payImg.attr("src", "./tokens/" + pay.html().trim() + ".svg");
    recImg.attr("src", "./tokens/" + rec.html().trim() + ".svg");


    const payValue = $(".amount").eq(0);
    const recValue = $(".amount").eq(1);

    temp = payValue.val();
    payValue.val(recValue.val());
    recValue.val(temp);

    convert();
}

// Correcting background colour of images
function updateBgColor(event) {
    const button = $(event.target);
    const bgColor = button.css('background-color');

    const img = button.find(".dropdown");
    img.css('background-color', bgColor);
}

function resetBgColor(event) {
    const button = $(event.target);
    button.find(".dropdown").css('background-color', 'white');
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
const currencyDataWithIds = currencyData.map((currency, index) => ({
    ...currency,
    id: index + 1
}));

let tokenButtons =[];

document.addEventListener('DOMContentLoaded', function() {
    const modal = $('.tokenList');

    currencyData.forEach(function(item) {
        const { currency, name } = item;

        const button = $('<button>', { class: 'modal-button' }).on('click', function() {
            const i = sessionStorage.getItem("pay") !== "true" ? 1 : 0;
            $(".currency").eq(i).find("span").html(`${currency} `);
            $(".slct").eq(i).attr("src", `./tokens/${currency}.svg`);
            convert();
        });

        const token = $('<img>', { class: 'tokenlogo', src: `./tokens/${currency}.svg` });
        const para = $('<p>', { class: 'token-labels' });

        const tokenName = $('<span>', { class: 'tokenname', html: name });
        const tokenSf = $('<span>', { class: 'tokensf', html: currency });

        button.append(token, para.append(tokenName, tokenSf));
        modal.append(button);
        tokenButtons.push(button);
    });
});

// Modal functions
document.addEventListener('DOMContentLoaded', function() {
    const ps = new PerfectScrollbar('.tokenList', {
        wheelSpeed: 0.4,
        wheelPropagation: true,
        minScrollbarLength: 20,
        zIndex: 4
    });
});

function toggleModal(event) {
    const modal = $(".modal");
    modal.css("display", "block");

    const button = $(event.target);
    if (button.is($(".currency").eq(0))) sessionStorage.setItem("pay", "true");
    else sessionStorage.setItem("receive", "true");

    $("#background").css({ "background-color": "grey", "opacity": "0.65"});
}

window.onclick = function(event) {
    const scrollX = $(".ps__rail-y");
    const scrollY = $(".ps__thumb-y");
    const modalHeader = $(".modal-header");
    const button1 = $(".currency").eq(0);
    const button2 = $(".currency").eq(1);

    if (!button1.add(button2).add(scrollX).add(scrollY).is(event.target) && !modalHeader.has(event.target).length) {
        closeModal(); 
    }
} 

function closeModal() {
    const modal = $(".modal");

    modal.css("display", "none");
    sessionStorage.setItem("pay", "false");
    sessionStorage.setItem("receive", "false");

    $("#background").css({ "background-color": "", "opacity": ""});
}

document.addEventListener('DOMContentLoaded', function() {
    $('#tokenSearch').on('input', function() {
        var searchTerm = $(this).val().toLowerCase();

        tokenButtons.forEach(function(button) {
            var tokenName = button.find(".tokenname").text().toLowerCase();
            var tokenSf = button.find(".tokensf").text().toLowerCase();

            if (tokenName.includes(searchTerm) || tokenSf.includes(searchTerm)) {
                button.show();
            } else {
                button.hide();
            }
        });
    });
});

// Updating displayed information

function convert() {
    const input = $(".amount").eq(0).val();
    const output = $(".value").eq(0);
    const recInput = $(".amount").eq(1);

    let payToken = $(".currency").eq(0).find("span").text().trim();
    const payExRate = currencyData.find(currency => currency.currency === payToken).price;

    let num = input * payExRate;
    output.val("$" + num.toFixed(2));

    let recToken = $(".currency").eq(1).find("span").text().trim();
    const recExRate = currencyData.find(currency => currency.currency === recToken).price;

    recInput.val((num / recExRate).toFixed(2));

    const exRateBox = $(".exrate");
    exRateBox.css('display', 'block');
    const exRate = payExRate / recExRate;
    exRateBox.html(`1 ${recToken} = ${exRate.toFixed(5)} ${payToken}`);

    if (input === "") {
        output.val("");
        recInput.val("");
        exRateBox.css('display', 'none');
    }
}


