function DeleteItem(id){
    if(id>=0){
        shopContract.CountOfItems(function(e,r){
            if(r['c'][0]>id){
                shopContract.LockItem(id,function(err,res){
                    if(res==undefined){
                        window.location.replace("/Revolutional Design/WalletADM/index.html?user denied transaction");
                        console.error("user denied transaction!");
                        
                    }
                    else{
                        window.location.replace("/Revolutional Design/WalletADM/index.html?removed");
                    }
                  
                })
            }
            else{
                console.error("incorrect input1");
                alert("incorrect input1");
            }
        })
        
    }
    else{
        
        console.error("incorrect input");
        window.location.replace("/Revolutional Design/WalletADM/index.html?incorrect input");
    }
    
}