window.onload = Fill();
console.clear();
console.log("Welcome to PowerChain! CLI interface")
console.log("Follow the instructions");
if (typeof web3 == 'undefined') {
    alert("Error: web3 provider is not defined...Make sure tahat metamask is installed");
    console.error("Error: web3 provider is not defined...Make sure tahat metamask is installed");
}
var sort = "";
function State() {

    web3.eth.getAccounts.call(0, function (err, res) {
        console.log("Ethereum Address: " + res[0]);


        powertokenContract.balanceOf(res[0], function (e, b) {
            console.log("Balance: " + b['c'][0] + "PWR");
        })

        infoContract.IsAdmin(res[0], function (e, r) {
            adr = res[0];
            if (r) {
                console.log("Welcome back, Administrator!");
                sort = "adm";
            }
            else {
                infoContract.IsAccount(adr, function (E, R) {
                    if (R) {
                        infoContract.MyState(function (Err, Res) {
                            if (Res) {
                                console.log("Welcome back, Student!");
                                sort = "std";
                            }
                            else {
                            console.log("Welcome back, Teacher!");
                            sort = "tch";
                            window.location.replace("/Revolutional Design/WalletTCH/index.html");
                            }
                            
                        })
                    }
                    else {
                        console.log("You are new to us! Join our comunity");
                        window.location.replace("/Revolutional Design/Homepage/welcome-mainpage/index.html");
                        sort = "wlc";
                    }
                });
            }
        });
    });

}
if (infoContract != undefined) {

    web3.eth.getAccounts.call(0, function (err, res) {
        if (res[0] == undefined) {
            alert("Error: please unlock metamask with your password and refresh the page");
            console.error("Error: please unlock metamask with your password and refresh the page");
        }
        else {
            console.log("Success: metamask is up and running");
            State();
        }
    });

}
else {
    alert("please install metamask! follow this link: https://metamask.io/");
    console.error("please install metamask! follow this link: https://metamask.io/");
    window.location.replace("/Revolutional%20Design/Premission/meta.html");
}

var access = false;
function CheckCookie() {


    infoContract.CountOfAccounts(function (E, R) {

        for (var i = 0; i < R['c'][0]; i++) {
            infoContract.Accounts(i, function (err, acc) {
                if (acc[0] == web3.eth.coinbase && acc[3] != getCookie("password")) {
                    window.location.replace("/Revolutional Design/Premission/auth.html")
                }
            });
        }

    });

}

function setCookie(name, value, expire) {
    var d = new Date();
    d.setTime(d.getTime() + (expire * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var value = (document.cookie).toString();
    value = value.split("password=");
    return value[1];
}


function Fill() {
    var select = document.getElementById("sel");
    if (infoContract != undefined && powertokenContract != undefined) {
        web3.eth.getAccounts.call(0, function (e, r) {
            powertokenContract.balanceOf(r[0], function (e, b) {
                var bal = document.getElementById("Balance");
                bal.innerText += " " + b['c'][0] + " PWR";
            })
        });

        infoContract.CountOfAccounts(function (err, count) {
            for (var i = 0; i < count; i++) {
                infoContract.Accounts(i, function (err, account) {
                    if (!account[4] && account[1] && account[0] != web3.eth.coinbase) {
                        select.innerHTML += '<option value=' + account[0] + '>' + account[2] + ' - ' + account[0] + '</option>';
                    }

                })
            }
        });
    }
}
function SendTokens() {
    var pwr = document.getElementById("pwr").value;
    var adr = document.getElementById("sel").value;
    if (infoContract != undefined && powertokenContract != undefined && pwr != "" && adr != "") {
        web3.eth.getAccounts.call(0, function (e, r) {
            powertokenContract.balanceOf(r[0], function (e, b) {
                if (b['c'][0] >= pwr) {
                    if (pwr != 0) {
                        if(pwr%1==0&&pwr>0){
                            powertokenContract.transfer(adr, pwr, function (err, res) {
                                if (res == undefined) {
                                    alert("Error: user denied transaction!");
                                    console.error("Error: user denied transaction!");
                                }
                                else{
                                    window.location.replace("/Revolutional%20Design/Premission/Wait.html");
                                }
                            })
                        }
                        else{
                            alert("Error: wrong input! PWR should be a natural number");
                            console.error("Error: wrong input! PWR should be a natural number");
                        }
                        
                    }
                    else{
                        alert("Error: we do not transfer 0 PWR!");
                        console.error("Error: we do not transfer 0 PWR!");
                    }

                }
                else {
                    alert("Error: not enough PWR on balance!");
                    console.error("Error: not enough PWR on balance!");
                }
            })
        });
    }
}
