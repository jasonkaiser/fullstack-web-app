<?php 


class Config{

    public static function DB_USER(){
        return "root";
    }
    
    
    public static function DB_PASSWORD(){
        return "";
    }
    
    
    public static function DB_NAME(){
        return "LostandFoundDB";
    }
    
    
    public static function DB_HOST(){
        return "localhost";
    }

    public static function DB_PORT(){
        return 3306;
    }

    public static function JWT_SECRET() {
        return 'jason2000';
    }
 
    
    
}


?>