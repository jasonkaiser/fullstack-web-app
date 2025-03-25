<?php

require_once __DIR__ . "/baseDao.php";  

class User extends BaseDao {
    
 
    protected $table_name;


    public function __construct(){

        $this->table_name = "users";
        parent::__construct("$this->table_name");
    }

    public function getAllUsers()
    {
        $query = "SELECT * FROM " . $this->table_name;
        return $this->query($query, []);
    }

    public function getUserByEmail($email){
        $query = "SELECT * FROM " . $this->table_name . " WHERE email = :email";
        $stmt = $this->connection->prepare($query);
        $stmt->bindValue(":email", $email, PDO::PARAM_STR);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}

?>


