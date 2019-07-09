console.clear();
console.log("Welcome to PowerChain! CLI interface")
console.log("Follow the instructions");
if (typeof web3 == 'undefined') {
    
    console.error("Error: web3 provider is not defined...Make sure that metamask is installed");
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
                window.location.replace("/Revolutional%20Design/Homepage/adm-mainpage/index.html");
            }
           else{
            infoContract.IsAccount(adr,function(E,R){
                if(R){
                    infoContract.MyState(function(Err,Res){
                        if(Res){
                            console.log("Welcome back, Student!");
                            window.location.replace("/Revolutional%20Design/Homepage/std-mainpage/index.html");
                            sort="std";
                        }
                        else
                        {
                            console.log("Welcome back, Teacher!");
                            window.location.replace("/Revolutional%20Design/Homepage/tch-mainpage/index.html");
                            sort="tch";
                        }
                    })
                }
                else{
                    console.log("You are new to us! Join our comunity");
                    sort="wlc";
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

 