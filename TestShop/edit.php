<?php
echo '<script src="/Revolutional%20Design/web3connect.js"></script>';
echo '<script src="\Revolutional Design\TestShop\method.js"></script>';
if(isset($_POST['submit'])){

    $title=$_POST['title'];
    $des=$_POST['description'];
    $price=$_POST['price'];
    if($title!="" && $des!="" && $price>0){
            $file=$_FILES['file'];
            print_r($file);
            $fileName=$_FILES['file']['name'];
            $fileTmpName=$_FILES['file']['tmp_name'];
            $fileSize=$_FILES['file']['size'];
            $fileError=$_FILES['file']['error'];
            $fileType=$_FILES['file']['type'];

            $fileExt= explode('.',$fileName);
            $fileActualExt = strtolower(end($fileExt));

            $allowed=array('jpg','jpeg','png','pdf');

            if(in_array($fileActualExt,$allowed)){
            if($fileError === 0){
                    if($fileSize<1000000000){
                        $fileDestination='./assets/css/images/'.$fileName;
                        move_uploaded_file($fileTmpName,$fileDestination);
                        header("Location: \Revolutional Design\WalletADM\index.html?uploaded successfully");
                    }
                    else{
                        echo "Your file is too big!";
                    }

            }
            else{
                echo "There was an error uploading your file!";
            }
            }
            else{
                echo "You can not upload files of this type!";
            }
        }
        else{
            echo "Incorect Input";
        }
    }
    
?>
