shopContract.CountOfItems(function(e,r){
    var count=r['c'][0];
    for( var i=0;i<count;i++){(function(i){
        shopContract.Items(i,function(e,r){
            if(!r[4]){
                
                var title=r[0];
                var description=r[1];
                var price=r[2]['c'][0];
                document.getElementById('content').innerHTML +='<form id='+i+' class="box"  method="post"><h1>'+title +'</h1><div class="img"></div><h2>'+description+'</h2><h3>Price: '+price+' PWR</h3><input type="button" class="'+price+'" value="Buy" onclick="Buy('+i+');"></form>';
            }    
        });
    })(i)
        
    }
});
//from blockchain