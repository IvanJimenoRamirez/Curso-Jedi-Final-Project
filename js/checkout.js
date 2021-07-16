$(window).on("load", function(){
    var queryString = location.search.substring(1);
    var arrayItems = queryString.split("|");
    var amountSSD = arrayItems[0];
    var amountUSB = arrayItems[1];
    var amountPhone = arrayItems[2];
    var amountIPhone = arrayItems[3];
    $("#firstItem").append(`
        ${amountSSD !== "0" ? `<p> <span class="item">SSD - SanDisk.</span> Total amount: <b>${amountSSD}.</b> Price: <b> ${(Number(amountSSD)*44.99).toFixed(2)}$ </b> </p>`:""}
    `)
    $("#secondItem").append(`
        ${amountUSB !== "0" ? `<p> <span class="item"> USB - SanDisk.</span> Total amount: <b>${amountUSB}.</b> Price: <b>${(Number(amountUSB)*18.99).toFixed(2)}$</b> </p>`:""}
    `)
    $("#thirdItem").append(`
        ${amountPhone !== "0" ? `<p> <span class="item"> Mi 10T - Xiaomi. </span>Total amount: <b>${amountPhone}.</b> Price: <b>${(Number(amountPhone)*279.99).toFixed(2)}$</b> </p>`:""}
    `)
    $("#fourthItem").append(`
        ${amountIPhone !== "0" ? `<p> <span class="item"> iPhone 12 Pro Max - Apple.</span> Total amount: <b>${amountIPhone}.</b> Price: <b> ${(Number(amountIPhone)*1235.99).toFixed(2)}$ </b> </p>`:""}
    `)
    $("#totalPrice").append(`
        <p> <b> Total: ${((Number(amountIPhone)*1235.99) + (Number(amountPhone)*279.99)+ (Number(amountUSB)*18.99)+ (Number(amountSSD)*44.99)).toFixed(2)}$ </b> </p>
    `)
    $("#goBack").on("click", () => {
        window.location.replace(`shop.html?${queryString}`);
    })
});