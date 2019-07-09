function Fill() {
    if (infoContract != undefined && shopContract != undefined && powertokenContract != undefined) {
        var username = document.getElementById("username");
        var address = document.getElementById("address");
        var balance = document.getElementById("balance");
        var gas = document.getElementById("gas");

        web3.eth.getAccounts.call(0, function (err, adr) {
            address.innerHTML += adr;
            powertokenContract.balanceOf(adr, function (err, bal) {
                balance.innerHTML += bal + " PWR";
            })
            web3.eth.getBalance(web3.eth.accounts[0], function (err, bal) {
                gas.innerHTML += bal / 1000000000000000000 + " ETHER";
            })
            infoContract.IsAdmin(adr, function (e, r) {
                if (r) {
                    username.innerHTML += "Administrator";


                }
                else {
                    infoContract.CountOfAccounts(function (e, count) {
                        for (var i = 0; i < count; i++) {
                            infoContract.Accounts(i, function (e, ac) {
                                if (ac[0] == adr && !ac[4]) {

                                    username.innerHTML += ac[2];
                                    if (ac[1]) {
                                        infoContract.CountOfLogs(adr, function (e, c) {
                                            for (var j = c-1; j >=0; j--) {
                                                (function (j) {
                                                    infoContract.Logs(adr, j, function (err, l) {
                                                        if (l[0] != "") {
                                                            var date = new Date(l[1] * 1000);

                                                            // Hours part from the timestamp
                                                            var hours = date.getHours();
                                                            var year = date.getFullYear();
                                                            var day = date.getDate();
                                                            var month = date.getMonth() + 1;
                                                            // Minutes part from the timestamp
                                                            var minutes = "0" + date.getMinutes();
                                                            // Seconds part from the timestamp
                                                            var seconds = "0" + date.getSeconds();
                                                            // Will display time in 10:30:23 format
                                                            var formattedTime = day + "/" + month + "/" + year + " " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                                                            log.innerHTML += "id: " + j + " Log: " + l[0] + " " + formattedTime + '</br> </br>';
                                                        }
                                                    })

                                                })(j)

                                            }
                                        })
                                    }
                                }
                            })
                        }
                    })
                }

            })
        })

    }
    else {
        alert("Unexpected Error in smart contract connection");
        console.error("Unexpected Error in smart contract connection");
    }
}
Fill();