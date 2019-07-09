<?php
echo '<script src="/Revolutional%20Design/web3connect.js"></script>';
echo '<script src="\Revolutional Design\TestShop\method.js"></script>';
if(isset($_POST['delete'])){
        $id=$_POST['id'];
        if($id>=0 && $id!=""){
            echo '<script type="text/javascript">
            shopContract.Items(',$id,',function(e,res){
                alert(res);
                if(!res[4]){
                    DeleteItem(',$id,');
                }
            });
            </script>';
            
            $path=$_POST['path'];
            echo "path: ",$path;
            unlink($_POST['path']);
            
        }
        else{
            echo "incorrect input";
            header("Location: \Revolutional Design\WalletADM\index.html?incorrect input");
        }
    }
?>