window.onload = Display();
function Display() {
    var content = document.getElementById("news");
    content.innerHTML = "";
    var select = document.getElementById("sel").value;
    var number;


    if (infoContract != undefined) {
        if (select != "0") {
            if (select != "all") {
                if (select == "5") {
                    number = 5;
                }
                if (select == "3") {
                    number = 3;
                }
                if (select == "10") {
                    number = 10;
                }

                infoContract.CountOfNews(function (e, count) {
                    if (count >= number) {
                        for (var i = count['c'][0] - 1; i >= count['c'][0] - number; i--) {
                            (function (i) {
                                setInterval(100);
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
                                        setInterval(100);
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
            else {
                infoContract.CountOfNews(function (e, count) {
                    for (var i = count['c'][0] - 1; i >= 0; i--) {
                        (function (i) {
                            infoContract.News(i, function (e, r) {
                                if (r[0] != "") {
                                    setInterval(100);
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
                });

            }

        }
        else {
            content.innerHTML = "";

        }

    }
    else {
        console.error("unknown error!");
        alert("unknown error!");
    }
}