
var account = web3.eth.accounts[0];
  var accountInterval = setInterval(function() {
    if (web3.eth.accounts[0] !== account) {
      account = web3.eth.accounts[0];
        Reload();
    }
  }, 200);

  function Reload(){
    
    web3.eth.getAccounts.call(0,function(err, res){                   
        
        infoContract.IsAdmin(res[0],function(e,r){
            adr=res[0];
            if(r){
                console.log("Welcome back, Administrator!");
                window.location.replace("/Revolutional%20Design/Homepage/adm-mainpage/index.html");
                sort="adm";
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
                        else {
                           
                        }
                       
                    })
                }
                else{
                    console.log("You are new to us! Join our comunity");
                    window.location.replace("/Revolutional%20Design/Homepage/welcome-mainpage/index.html");
                    sort="wlc";
                }
            });
           }
         });
    });
    
}