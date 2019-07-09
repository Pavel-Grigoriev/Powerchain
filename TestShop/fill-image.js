shopContract.CountOfItems(function(e,r){
    var count=r['c'][0];
    for( var i=0;i<count;i++){ (function(i) {
        
        shopContract.Items(i,function(e,r){
            
            if(!r[4]){
               
                document.getElementById("content").innerHTML+='<style type="text/css">[id="'+i+'"] .img{background: url(./assets/css/images/'+r[3]+') no-repeat 50% 50%;background-size: contain;}</style>';
            }
        });
    })(i)
    }
});
//from blockchain