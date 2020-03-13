<?php

$link = mysqli_connect('localhost','v61698_dbuser','yqJL:<xc!zRwURCB','v61698_db');
//$link = mysqli_connect('localhost', 'root', '','my_first_jsprogect');

if(mysqli_connect_errno()){
    echo 'Error('.mysqli_connect_errno().'): '.mysqli_connect_error();
    exit();
}

?>
