<?php

    ini_set('display_errors', 1);   
    error_reporting(E_ALL);      

    require_once __DIR__ . "/dao/baseDao.php";
    require_once __DIR__ . "/dao/usersDao.php";
    require_once __DIR__ . "/dao/categoriesDao.php";  

    $user = new User();
    $getUser = $user->getUserByEmail("bob.brown@example.com");

    $categories = new Category();
    $getCategories = $categories->gettAllCategories();

    if ($getUser) {
        
        echo "User ID: " . $getUser['id'] . "<br>";
        echo "User Name: " . $getUser['name'] . "<br>";
    } else {
        echo "No user found with the given email.";
    }

    foreach( $getCategories as $category ) {
        echo "<td>". $category["categoryID"] . "</td>";
        echo "<td>". $category["categoryName"] . "</td>";
    }
    
?>
