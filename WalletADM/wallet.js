window.onload = FillContent();
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
                                window.location.replace("/Revolutional Design/WalletSTD/index.html");
                            }
                            else {
                                console.log("Welcome back, Teacher!");
                                sort = "tch";
                                window.location.replace("/Revolutional Design/WalletSTD/index.html");
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

function FillContent() {
    var teachers = document.getElementById("teachers");
    var students = document.getElementById("students");
    var refill = document.getElementById("refill");
    var info = document.getElementById("info");
    if (infoContract != undefined && powertokenContract != undefined) {

        web3.eth.getAccounts.call(0, function (e, r) {
            powertokenContract.balanceOf(r[0], function (e, b) {
                info.innerHTML += "Ethereum Address: " + r + "<br/>";
                info.innerHTML += "Balance: " + b['c'][0] + "  PWR<br/>";



            })
        });
        students.innerHTML += "<br/>List of Students<br/>";
        infoContract.CountOfAccounts(function (err, count) {
            for (var i = 0; i < count; i++) {
                infoContract.Accounts(i, function (err, account) {
                    if (!account[4] && account[1]) {
                        powertokenContract.balanceOf(account[0], function (err, res) {
                            students.innerHTML += account[2] + ' - ' + account[0] + ' - ' + res['c'][0] + "  PWR <br/>";
                        })

                    }

                })
            }
        });
        teachers.innerHTML += "<br/>List of Teachers<br/>";
        infoContract.CountOfAccounts(function (err, count) {
            for (var i = 0; i < count; i++) {
                infoContract.Accounts(i, function (err, account) {
                    if (!account[4] && !account[1]) {
                        powertokenContract.balanceOf(account[0], function (err, res) {
                            teachers.innerHTML += account[2] + ' - ' + account[0] + ' - ' + res['c'][0] + " PWR <br/>";
                        })

                    }
                })
            }
        });

    }
}
function RefillTokens() {
    console.log("refilltokens");
    infoContract.CountOfAccounts(function (err, count) {
        for (var i = 0; i < count; i++) {
            infoContract.Accounts(i, function (err, account) {
                if (!account[4] && !account[1] && account[0] != web3.eth.coinbase) {
                    powertokenContract.balanceOf(account[0], function (err, res) {
                        if (res['c'][0] < 5) {
                            powertokenContract.transfer(account[0], 5 - res['c'][0], function (e, r) {
                                if (r == undefined) {
                                    console.error("Error: user denied transaction!");
                                    alert("Error: user denied transaction!");
                                }
                            })
                        }
                    })

                }

            })
        }
    });
}
function RefillEther() {
    console.log("refillether");
    infoContract.CountOfAccounts(function (err, count) {
        for (var i = 0; i < count; i++) {
            infoContract.Accounts(i, function (err, account) {
                if (!account[4] && account[0] != web3.eth.coinbase) {
                    web3.eth.getBalance(account[0], function (e, r) {
                        if ((r['c'][0] / 10000) < 1) {

                            infoContract.Admin(function (E, R) {

                                web3.eth.sendTransaction({ from: R, to: account[0], value: web3.toWei(0.1, 'ether') }, function (e, r) {
                                    if (r == undefined) {
                                        console.error("User denied transaction");
                                    }
                                    else {
                                        console.log("wait for the transaction to be mined");
                                        alert("wait for the transaction to be mined")
                                    }
                                });
                            })

                        }

                    })

                }

            })
        }
    });
}
function Display(id) {
    var password = "0x" + sha256(document.getElementById(id).value);
    return password;

}
function addT() {
    var adr = document.getElementById("a1").value;
    var isAddress = web3.isAddress(adr);
    if (isAddress) {
        var usr = document.getElementById("u1").value;
        var pas = Display("p1");
        if (adr != "" && usr != "" && pas != "") {
            infoContract.Validate(pas, function (e, r) {
                if (r) {
                    infoContract.AddTeacher(adr, usr, pas, function (err, res) {
                        if (res == undefined) {
                            console.error("user denied transaction");
                            alert("user denied transaction");
                            window.location.reload();
                        }
                    })
                }
                else {

                    alert("This pasword has already been taken");
                    console.error("This pasword has already been taken");
                }
            })
        }
    }
    else {
        console.error("incorrect address!");
        alert("incorrect address");
    }

}
function addS() {
    var adr = document.getElementById("a2").value;
    var isAddress = web3.isAddress(adr);
    if (isAddress) {
        var usr = document.getElementById("u2").value;
        var pas = Display("p2");
        if (adr != "" && usr != "" && pas != "") {
            infoContract.Validate(pas, function (e, r) {
                if (r) {
                    infoContract.AddStudent(adr, usr, pas, function (err, res) {
                        if (res == undefined) {
                            console.error("user denied transaction");
                            alert("user denied transaction");
                            window.location.reload();
                        }
                    })
                }
                else {

                    alert("This pasword has already been taken");
                    console.error("This pasword has already been taken");
                }
            })
        }
    }
    else {
        console.error("incorrect address!");
        alert("incorrect address");
    }

}
function Del() {
    var adr = document.getElementById("a3").value;
    if (adr != "") {
        var isAddress = web3.isAddress(adr);
        if (isAddress) {
            infoContract.CountOfAccounts(function (e, count) {
                for (var i = 0; i < count; i++) {
                    infoContract.Accounts(i, function (e, ac) {

                        if (ac[0] == adr && !ac[4]) {
                            infoContract.DeleteAccount(adr, function (err, res) {
                                if (res != undefined) {
                                    console.log("Succcessfully deleted account: " + ac[0] + " username: " + ac[2]);
                                }
                                else {
                                    console.error("user denied transaction!");
                                    alert("user denied transaction!");
                                }
                            })
                        }
                    })
                }
            })
        }
        else {
            console.error("incorrect address!");
            alert("incorrect address");
        }

    }
}
function AddItem() {
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var path = document.getElementById('file').value;
    var price = document.getElementById('price').value;
    path = path.split(/\\/).pop();
    if (title != "" && description != "" && price > 0 && path != "") {
        shopContract.AddItem(title, description, path, price, function (e, r) {
            if (r == undefined) {
                alert("user denied transaction!");
                console.error("user denied transaction!");
            }

        });
    }

}
function FillItems() {
    if (shopContract != undefined) {
        var list = document.getElementById("items");
        shopContract.CountOfItems(function (e, r) {
            for (var i = 0; i < r['c'][0]; i++) {
                (function (i) {
                    shopContract.Items(i, function (e, res) {
                        if (!res[4]) {
                            list.innerHTML += '</br>id: ' + i + " title: " + res[0] + " price: " + res[2]['c'][0] + " PWR  image link: " + res[3];
                        }

                    })
                })(i)

            }

        })
    }
}
FillItems();
function ChangeItem() {
    var id = document.getElementById("cid").value;
    var title = document.getElementById("ctitle").value;
    var description = document.getElementById("cdescription").value;
    var price = document.getElementById("cprice").value;
    var path = document.getElementById("cpath").value;

    if (id >= 0 && id != "") {
        var message = "";
        shopContract.CountOfItems(function (err, res) {
            if (res['c'][0] - 1 >= id) {
                if (title != "") {
                    message += " Changing Title to: " + title;
                    shopContract.ChangeItemTitle(id, title, function (e, r) {
                        if (r == undefined) {
                            alert("user denied tranaction");
                            console.error("user denied transaction");
                        }
                    })
                }
                if (description != "") {
                    message += " Changing description to: " + description;
                    shopContract.ChangeItemDescription(id, description, function (e, r) {
                        if (r == undefined) {
                            alert("user denied tranaction");
                            console.error("user denied transaction");
                        }
                    })
                }
                if (price != "") {
                    message += " Changing price to: " + price;
                    shopContract.ChangeItemPrice(id, price, function (e, r) {
                        if (r == undefined) {
                            alert("user denied tranaction");
                            console.error("user denied transaction");
                        }
                    })
                }
                if (path != "") {
                    message += " Changing link to: " + path;
                    shopContract.ChangeItemPath(id, path, function (e, r) {
                        if (r == undefined) {
                            alert("user denied tranaction");
                            console.error("user denied transaction");
                        }
                    })
                }
                if (message != "") {
                    message += " on item id: " + id;
                    alert(message);
                }
            }
            else {
                console.error("incorrect id input");
                alert('incorrect id input');
            }
        })

    }
    else {
        console.error("incorrect id input");
        alert('incorrect id input');
    }
}
function Logs() {
    var address = document.getElementById('address').value;
    var display = document.getElementById('display');
    var isAddress = web3.isAddress(address);
    display.innerHTML = "Logs: " + '</br>';
    if (isAddress) {
        infoContract.CountOfLogs(address, function (err, count) {
            if (count != 0) {
                display.innerHTML += ""
            }
            for (var i = 0; i < count['c'][0]; i++) {
                (function (i) {
                    infoContract.Logs(address, i, function (err, log) {
                        if (log[0] != "") {
                            var date = new Date(log[1] * 1000);

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
                            display.innerHTML += "id: " + i + " Log: " + log[0] + " " + formattedTime + '</br> </br>';
                        }

                    })
                })(i)

            }

        })
    }

}
function DeleteLog() {
    var address = document.getElementById('address').value;
    var id = document.getElementById('newid').value;
    var isAddress = web3.isAddress(address);
    if (isAddress) {
        infoContract.CountOfLogs(address, function (er, res) {
            if (res['c'][0] > id) {
                infoContract.DeleteLog(address, id, function (err, r) {
                    if (r == undefined) {
                        console.error("user denied transaction");
                        alert("user denied transaction");
                    }
                })
            }
            else {
                alert("incorrect id input!");
                console.error("incorrect id input!");
            }
        })
    }
}
function AddNews() {
    var text = document.getElementById("news").value;
    if (text != "") {
        infoContract.WriteNews(text, function (err, res) {
            if (res == undefined) {
                alert("user denied transaction!");
                console.error("user denied transaction!");
            }
        })
    }
    else {
        alert("Error: empty input");
        console.error("Error: empty input");
    }


}
function DeleteNews() {
    var id = document.getElementById("did").value;
    if (id != "") {
        infoContract.CountOfNews(function (e, count) {
            if (id < count['c'][0] && id > 0) {
                infoContract.DeleteNews(id, function (err, res) {
                    if (res == undefined) {
                        alert("user denied transaction!");
                        console.error("user denied transaction!");
                    }
                })
            }
            else {
                alert("Error: incorrect id");
                console.error("Error: incorrect id");
            }
        })


    }
    else {
        alert("Error: empty input");
        console.error("Error: empty input");
    }

}
function FillNews() {
    var content = document.getElementById("newscontent");
    content.innerHTML = "";
    infoContract.CountOfNews(function (e, count) {
        if (count >= 3) {
            for (var i = count['c'][0] - 1; i >= count['c'][0] - 3; i--) {
                (function (i) {
                    infoContract.News(i, function (e, r) {
                        if (r[0] != "") {
                            var date = new Date(r[1] * 1000);
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
                            content.innerHTML += i + ") " + formattedTime + " " + r[0] + '<br>';
                        }
                    })
                })(i)

            }
        }
        else {

            for (var i = count['c'][0] - 1; i >= 0; i--) {
                (function (i) {
                    infoContract.News(i, function (e, r) {
                        if (r[0] != "") {
                            var date = new Date(r[1] * 1000);
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
                            content.innerHTML += i + ") " + formattedTime + " " + r[0] + '<br>';
                        }
                    })
                })(i)

            }
        }

    })
}
function ShowNews() {
    var content = document.getElementById("newscontent");
    content.innerHTML = "";
    infoContract.CountOfNews(function (e, count) {
        for (var i = count['c'][0] - 1; i >= 0; i--) {
            (function (i) {
                infoContract.News(i, function (e, r) {
                    if (r[0] != "") {
                        var date = new Date(r[1] * 1000);
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
                        content.innerHTML += i + ") " + formattedTime + " " + r[0] + '<br>';
                    }
                })
            })(i)

        }
    })

}
function HideNews(){
    var content = document.getElementById("newscontent");
    content.innerHTML = "";
    
}
FillNews();