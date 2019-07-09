console.clear();
console.log("Welcome to PowerChain! CLI interface")
console.log("Follow the instructions");
if (typeof web3 == 'undefined') {
    alert("Error: web3 provider is not defined...Make sure tahat metamask is installed");
    console.error("Error: web3 provider is not defined...Make sure tahat metamask is installed");
}
var sort="";
function State(){
    
    web3.eth.getAccounts.call(0,function(err, res){                   
        console.log("Ethereum Address: "+res[0]);
        infoContract.IsAdmin(res[0],function(e,r){
            adr=res[0];
            if(r){
                console.log("Welcome back, Administrator!");
                sort="adm";
                document.getElementById("icon").innerHTML+='<a href="/Revolutional%20Design/Homepage/adm-mainpage/index.html"><i class="fa fa-link"></i></a><a href="/Revolutional%20Design/Homepage/adm-mainpage/index.html">Home</a>';
               
            }
           else{
            infoContract.IsAccount(adr,function(E,R){
                if(R){
                    infoContract.MyState(function(Err,Res){
                        if(Res){
                            console.log("Welcome back, Student!");
                            sort="std";
                            document.getElementById("icon").innerHTML+='<a href="/Revolutional%20Design/Homepage/std-mainpage/index.html"><i class="fa fa-link"></i></a><a href="/Revolutional%20Design/Homepage/std-mainpage/index.html">Home</a>';
                        }
                        else {
                        console.log("Welcome back, Teacher!");
                        sort="tch";
                        window.location.replace("/Revolutional Design/Homepage/tch-mainpage/index.html");
                        }
                        
                    })
                }
                else{
                    console.log("You are new to us! Join our comunity");
                    sort="wlc";
                    window.location.replace("/Revolutional Design/Premission/auth.html");
                }
            });
           }
         });
    });
    
}
if(infoContract!=undefined){
    
    web3.eth.getAccounts.call(0,function(err, res){
        if(res[0]==undefined){
            alert("Error: please unlock metamask with your password and refresh the page");
            console.error("Error: please unlock metamask with your password and refresh the page");
        }
        else{
            console.log("Success: metamask is up and running");
            State();
        }
    });                 
    
  }
  else{
    alert("please install metamask! follow this link: https://metamask.io/");
    console.error("please install metamask! follow this link: https://metamask.io/");
    window.location.replace("/Revolutional%20Design/Premission/meta.html");
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

function CheckCookie() {

    infoContract.CountOfAccounts(function (E, R) {

        for (var i = 0; i < R['c'][0]; i++) {
            infoContract.Accounts(i, function (err, acc) {
                if (acc[3] != getCookie("password") && acc[0] == web3.eth.coinbase) {
                    window.location.replace("/Revolutional Design/Premission/auth.html");
                }
            });
        }
        
    });
}
function Buy(id){
    
    if(infoContract!=undefined&&powertokenContract!=undefined&&shopContract!=undefined){
        powertokenContract.balanceOf(web3.eth.coinbase,function(e,r){
            var balance=r['c'][0];
            console.log("Your balance "+balance+" PWR");
            shopContract.Items(id,function(e,res){
                if(!res[4]){
                    if(balance>=res[2]['c'][0]){
                        powertokenContract.Admin(function(e,adr){
                            
                            powertokenContract.transfer(adr,res[2]['c'][0],function(e,result){
                                if(result!=undefined){
                                    console.log("you are buying "+res[0]+" for "+res[2]['c'][0]+" PWR");
                                }
                                else{
                                    alert("user denied transaction!");
                                    console.error("user denied transaction!");
                                }
                            })
                        })
                        
                    }
                    else{
                        console.error("Error: not enough PWR tokens on balance!");
                        alert("Error: not enough PWR tokens on balance!");
                    }
                    
                }
                else{
                    console.error("This item is not in stock!");
                    alert("This item is not in stock!");
                }
            })
            
        })
    }
   
}
