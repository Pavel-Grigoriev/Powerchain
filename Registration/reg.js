window.onload = function () {
    infoContract.IsAdmin(web3.eth.coinbase, function (e, r) {
        if (r) {
            console.error("Error: you have already been registered");
            alert("Error: you have already been registered");
            window.location.replace("/Revolutional%20Design/Homepage/std-mainpage/index.html");
        }
        else {
            infoContract.IsAccount(web3.eth.coinbase, function (e, r) {
                if (r) {
                    console.error("Error: you have already been registered");
                    alert("Error: you have already been registered");
                    window.location.replace("/Revolutional%20Design/Homepage/std-mainpage/index.html");
                }
            });
        }
    })
}
console.clear();
console.log("Welcome to PowerChain! CLI interface")
console.log("Follow the instructions");
if (typeof web3 == 'undefined') {
    console.error("Error: web3 provider is not defined...Make sure tahat metamask is installed");
}

if (infoContract != undefined) {

    web3.eth.getAccounts.call(0, function (err, res) {
        if (res[0] == undefined) {
            console.error("Error: please unlock metamask with your password and refresh the page");
        }
        else {
            console.log("Success: metamask is up and running");
            State();
        }
    });

}
else {
    console.error("please install metamask! follow this link: https://metamask.io/");
    window.location.replace("/Revolutional%20Design/Premission/meta.html");
}


function Registrate() {
    infoContract.IsAdmin(web3.eth.coinbase, function (e, r) {
        if (r) {
            console.error("Error: you have already been registered");
            alert("Error: you have already been registered");
            window.location.replace("/Revolutional%20Design/Homepage/std-mainpage/index.html");
        }
        else {
            infoContract.IsAccount(web3.eth.coinbase, function (e, r) {
                if (r) {
                    console.error("Error: you have already been registered");
                    alert("Error: you have already been registered");
                    window.location.replace("/Revolutional%20Design/Homepage/std-mainpage/index.html");
                }
                else {
                    var username = (document.getElementById("usr").value).toString();
                    var password = Display();
                    var userPreference;
                    if (username != "" && document.getElementById("pas").value != "") {


                        if (confirm("Do you want to REGISTRATE with this user info?") == true) {
                            infoContract.Validate(password, function (er, rs) {
                                if (rs) {
                                    infoContract.RegStudent(username, password, function (Err, Res) {
                                        if (Res != undefined) {
                                            userPreference = "Registered successfully!";
                                            console.log(userPreference);
                                            setCookie("password", password, 5);
                                            IsSet();
                                            window.location.replace("/Revolutional%20Design/Premission/Wait.html");
                                        }
                                        else {
                                            console.error("user denied transaction!");
                                            alert("Error: user denied transaction!");
                                        }
                                    });


                                }
                                else{
                                    alert("Error: this password has already been taken");
                                    console.error("Error: this password has already been taken");
                                    document.getElementById("pas").value="";
                                }
                            })

                        } else {
                            userPreference = "Registration Cancelled!";
                            console.error(userPreference);
                        }

                    }
                    else {
                        alert("Error: wrong input!!! empty field");
                        console.error("Error: wrong input!!! empty field");
                    }


                }
            });
        }
    })
}

function Display() {
    var password = "0x" + sha256(document.getElementById("pas").value);
    return password;

}
var sort = "";
function State() {

    web3.eth.getAccounts.call(0, function (err, res) {
        console.log("Ethereum Address: " + res[0]);
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
                            else console.log("Welcome back, Teacher!");
                            sort = "tch";
                        })
                    }
                    else {
                        console.log("You are new to us! Join our comunity");
                        sort = "wlc";
                    }
                });
            }
        });
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
function IsSet() {

    infoContract.CountOfAccounts(function (E, R) {

        for (var i = 0; i < R['c'][0]; i++) {
            infoContract.Accounts(i, function (err, acc) {
                if (acc[3] == getCookie("password") && acc[0] == web3.eth.coinbase) {

                    alert("Powerchain has set a cookie file for you to interact with the dapp");
                    console.warn("Powerchain has set a cookie file for you to interact with the dapp");
                    console.log("cookie: " + document.cookie);
                }
            });
        }
    });
}
function ExpireCookie() {
    setCookie("password", "", 0);
    console.log("cookie: " + document.cookie);
}
function CheckCookie() {
    infoContract.CountOfAccounts(function (E, R) {

        for (var i = 0; i < R['c'][0]; i++) {
            infoContract.Accounts(i, function (err, acc) {
                if (acc[3] == getCookie("password") && acc[0] == web3.eth.coinbase) {

                    infoContract.MyState(function (e, r) {
                        if (r) {
                            window.location.replace("/Revolutional%20Design/Homepage/std-mainpage/index.html");
                        }
                        else {
                            window.location.replace("/Revolutional%20Design/Homepage/tch-mainpage/index.html");
                        }
                    })

                }
            });
        }
    });
}