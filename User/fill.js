var sort="";
web3.eth.getAccounts.call(0,function(err, res){                   
    
    infoContract.IsAdmin(res[0],function(e,r){
        adr=res[0];
        if(r){
            sort="adm";
            document.getElementById("icon").innerHTML='<a href="/Revolutional%20Design/Homepage/'+sort+'-mainpage/index.html"><i class="fa fa-link"></i></a><a href="/Revolutional%20Design/Homepage/'+sort+'-mainpage/index.html" style="margin-left: 10px;">Home</a>';
            
        }
       else{
        infoContract.IsAccount(adr,function(E,R){
            if(R){
                infoContract.MyState(function(Err,Res){
                    if(Res){
                        
                        sort="std";
                        document.getElementById("icon").innerHTML='<a href="/Revolutional%20Design/Homepage/'+sort+'-mainpage/index.html"><i class="fa fa-link"></i></a><a href="/Revolutional%20Design/Homepage/'+sort+'-mainpage/index.html" style="margin-left: 10px;">Home</a>';
            
                    }
                    else {
                       
                        sort="tch";
                        document.getElementById("icon").innerHTML='<a href="/Revolutional%20Design/Homepage/'+sort+'-mainpage/index.html"><i class="fa fa-link"></i></a><a href="/Revolutional%20Design/Homepage/'+sort+'-mainpage/index.html" style="margin-left: 10px;">Home</a>';
            
                    }
                    
                })
            }
            else{
                
                sort="welcome";
                document.getElementById("icon").innerHTML='<a href="/Revolutional%20Design/Homepage/'+sort+'-mainpage/index.html"><i class="fa fa-link"></i></a><a href="/Revolutional%20Design/Homepage/'+sort+'-mainpage/index.html" style="margin-left: 10px;">Home</a>';
            
            }
        });
       }
     });
});
