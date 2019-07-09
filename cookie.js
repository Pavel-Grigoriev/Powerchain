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

function CheckCookie() {

    infoContract.CountOfAccounts(function (E, R) {

        for (var i = 0; i < R['c'][0]; i++) {
            infoContract.Accounts(i, function (err, acc) {
                if (acc[3] == getCookie("password") && acc[0] == web3.eth.coinbase) {


                    return true;
                }
            });
        }
        return false;
    });
}
