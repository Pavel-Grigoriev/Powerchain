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
                        alert("You are not an authorised user");
                        window.location.replace("/Revolutional%20Design/Registration/index.html");
                        sort = "welcome";
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

function Login() {
    
    var access = false;
    var password = Display();
    infoContract.Login(password, function (err, res) {
        if (res) {
            access = true;
            console.log("You are logged in!");
            
            setCookie("password", password, 5);
            
            IsSet();
            infoContract.MyState(function (err, role) {
                if (role) {
                    window.location.replace("/Revolutional%20Design/Homepage/std-mainpage/index.html")
                }
                else{
                    window.location.replace("/Revolutional%20Design/Homepage/tch-mainpage/index.html")
                }
            })
            
        }
        else {
            access = false;

            alert("wrong password!");
            console.error("wrong password!");
            document.getElementById("pas").value="";
        }
    });
}
function Display() {
    var password = "0x" + sha256(document.getElementById("pas").value);
    return password;

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
    infoContract.MyState(function (err, role) {
        if (role) {
            window.location.replace("/Revolutional%20Design/Homepage/std-mainpage/index.html")
        }
        else{
            window.location.replace("/Revolutional%20Design/Homepage/tch-mainpage/index.html")
        }
    })
}
function CheckCookie() {

    infoContract.CountOfAccounts(function (E, R) {

        for (var i = 0; i < R['c'][0]; i++) {
            infoContract.Accounts(i, function (err, acc) {
                if (acc[3] == getCookie("password") && acc[0] == web3.eth.coinbase) {


                    window.location.replace('/Revolutional%20Design/Login/logout.html');
                }
            });
        }
    });
}
