let category = ["Computer Accesories","Telephony"];
let amount = [
    { 
        value: [0,0]
    },
    {
        value: [0,0]
    }
];

let index = 0;
let telephony = 0;
let btnClicked = 0;
let totalItems = 0;

$(window).on("load", function(){

    var queryString = location.search.substring(1);
    var arrayItems = queryString.split("|");
    if (arrayItems.length > 1) {
        amount[0].value[0] = arrayItems[0];
        amount[0].value[1] = arrayItems[1];
        amount[1].value[0] = arrayItems[2];
        amount[1].value[1] = arrayItems[3];
        totalItems = Number(arrayItems[0]) + Number(arrayItems[1]) + Number(arrayItems[2]) + Number(arrayItems[3]);
        document.getElementById("checkoutItems").innerHTML = `${totalItems} items`
    }
    console.log(arrayItems);
    $("#openShop").on("click", () =>{
        btnClicked = 1;
        document.getElementById("changeCategory").style = "height:0%";
        $("#openShop").hide();
        $("#imgSSD").prepend(`
        <img src="images/shop/computerAccessories/disco_duro1.png" class="cardImage card-img-top computerAccess" alt="SSD Sandisk - 480GB">
        `);
        $("#ssdBody").prepend(`
            <h5 class="card-title textAlign computerAccess">SSD 480 GB - SanDisk SSD PLUS</h5>
            <p class="card-tetx textAlign computerAccess">Go SSD speeds and breathe new life into your computer.</p>
            <hr class="computerAccess">
            <p class="card-tetx textAlign computerAccess"> Price: 44.99$ </p>
            <p id="totalSSD" class="computerAccess card-tetx textAlign"> Total Amount: ${amount[index].value[0]} </p>
        `);
        $("#imgUSB").prepend(`
            <img src="images/shop/computerAccessories/usb_1.png" class="cardImage card-img-top imgCard computerAccess" alt="USB SanDisk - 128GB 3.0">
        `);
        $("#usbBody").prepend(`
            <h5 class="computerAccess card-title textAlign">USB 128 GB - SanDisk Ultra Flair, USB 3.0</h5>
            <p class="computerAccess card-tetx textAlign">The Sandisk Ultra Flair allows you to transfer your precious files very quickly.</p>
            <hr class="computerAccess">
            <p class="computerAccess card-tetx textAlign"> Price: 18.99$ </p>
            <p id="totalUSB" class="computerAccess card-tetx textAlign"> Total Amount: ${amount[index].value[1]} </p>
        `);
        document.getElementById("shopBody").style = "display:flex;"
        document.getElementById("category").innerHTML = `<p class="categoryStyle">${category[index]}</p>`;
        $("#category").show();
        $("#categoryContainer").show();
    });
    $("#categoryCA").on("click", () => {
        if (index && btnClicked) {
            document.getElementById("changeCategory").style = "height: 100%";
            setTimeout(function() {
                index = 0;
                $(".teleph").hide();
                $(".computerAccess").show();
                document.getElementById("category").innerHTML = `<p class="categoryStyle">${category[index]}</p>`;
            }, 1200);
            setTimeout(function() {
                document.getElementById("changeCategory").style = "height: 0%";
            }, 2000);
        }
    });
    $("#categoryT").on("click", () => {
        if (!index && btnClicked) {
            index = 1;
            if (!telephony){
                telephony = 1;
                document.getElementById("changeCategory").style = "height: 100%";
                setTimeout(function() {
                    $(".computerAccess").hide();
                    $("#imgSSD").prepend(`
                        <img src="images/shop/computerAccessories/phone-1.png" class="cardImage card-img-top teleph" alt="Xiamomi Mi 10T">
                    `);
                    $("#ssdBody").prepend(`
                        <h5 class="card-title textAlign teleph">Xiaomi Mi 10 T</h5>
                        <p class="card-tetx textAlign teleph">Black, 128 GB, 6 GB RAM, 6.67" Full HD+, Qualcomm Snapdragon 865, 5000 mAh.</p>
                        <hr class="teleph">
                        <p class="card-tetx textAlign teleph"> Price: 279.99$ </p>
                        <p id="totalXiaomi" class="teleph card-tetx textAlign"> Total Amount: ${amount[index].value[0]} </p>
                    `);
                    $("#imgUSB").prepend(`
                        <img src="images/shop/computerAccessories/iphone-1.png" class="cardImage card-img-top imgCard teleph" alt="iPhone 12 Pro Max">
                    `);
                    $("#usbBody").prepend(`
                        <h5 class="teleph card-title textAlign">Apple iPhone 12 Pro Max</h5>
                        <p class="teleph card-tetx textAlign">Graphite, 128 GB, 5G, 6.7 "OLED Super Retina XDR, A14 Bionic Chip, iOS.</p>
                        <hr class="teleph">
                        <p class="teleph card-tetx textAlign"> Price: 1,235.99$ </p>
                        <p id="totalIphone" class="teleph card-tetx textAlign"> Total Amount: ${amount[index].value[1]} </p>
                    `);
                    document.getElementById("category").innerHTML = `<p class="categoryStyle">${category[index]}</p>`;
                }, 1300);
                setTimeout(function() {
                    document.getElementById("changeCategory").style = "height: 0%";
                }, 2000);
            }
            else{
                document.getElementById("changeCategory").style = "height: 100%";
                setTimeout(function() {
                    $(".computerAccess").hide();
                    $(".teleph").show();
                    document.getElementById("category").innerHTML = `<p class="categoryStyle">${category[index]}</p>`;
                }, 1300);
                setTimeout(function() {
                    document.getElementById("changeCategory").style = "height: 0%";
                }, 2000);
            }
        }
    });
    $("#addSSD").on("click", () => {
        totalItems++;
        if(totalItems > 99) document.getElementById("checkoutItems").innerHTML = `+99 items`;
        else document.getElementById("checkoutItems").innerHTML = `${totalItems} items`;
        amount[index].value[0]++;
        if (!index) document.getElementById("totalSSD").innerHTML = `Total Amount: ${amount[index].value[0]}`;
        else document.getElementById("totalXiaomi").innerHTML = `Total Amount: ${amount[index].value[0]}`;
    })
    $("#substractSSD").on("click", () => {
        if ((amount[index].value[0] - 1) > -1) {
            totalItems--;
            if(totalItems > 99) document.getElementById("checkoutItems").innerHTML = `+99 items`;
            else document.getElementById("checkoutItems").innerHTML = `${totalItems} items`
            amount[index].value[0]--;
            if (!index) document.getElementById("totalSSD").innerHTML = `Total Amount: ${amount[index].value[0]}`;
            else document.getElementById("totalXiaomi").innerHTML = `Total Amount: ${amount[index].value[0]}`;
        }
    })
    $("#addUSB").on("click", () => {
        totalItems++;
        if(totalItems > 99) document.getElementById("checkoutItems").innerHTML = `+99 items`;
        else document.getElementById("checkoutItems").innerHTML = `${totalItems} items`
        amount[index].value[1]++;
        if (!index) document.getElementById("totalUSB").innerHTML = `Total Amount: ${amount[index].value[1]}`;
        else document.getElementById("totalIphone").innerHTML = `Total Amount: ${amount[index].value[1]}`;
    })
    $("#substractUSB").on("click", () => {
        if ((amount[index].value[1] - 1) > -1) {
            totalItems--;
            if(totalItems > 99) document.getElementById("checkoutItems").innerHTML = `+99 items`;
            else document.getElementById("checkoutItems").innerHTML = `${totalItems} items`
            amount[index].value[1]--;
            if (!index) document.getElementById("totalUSB").innerHTML = `Total Amount: ${amount[index].value[1]}`;
            else document.getElementById("totalIphone").innerHTML = `Total Amount: ${amount[index].value[1]}`;
        }
    })
    $("#checkout").on("click", () => {
        array = `${amount[0].value[0]}|${amount[0].value[1]}|${amount[1].value[0]}|${amount[1].value[1]}`
        window.location.replace(`checkout.html?${array}`);
    })
});