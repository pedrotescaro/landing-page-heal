<?php

    $connection = new mysql();

    $name = $_POST['name'];  
    $email =$_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm-password'];

    $sql = "INSERT INTO USER(user_name, user_email, user_password, confirm_password )
            VALUES (:user_name, :user_email, :user_password, :confirm_password)";

    $stmt = $connection->prepare($sql);

    $stmt->execute(
        [
            ':user_name'=> $name;
            ':user_email'=> $email;
            ':user_password'=>$password;
            ':confirm_password'=>$confirm_password;        
        ]
    );

    