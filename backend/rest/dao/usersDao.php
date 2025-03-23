<?php

require_once __DIR__ . "/baseDao.php";  

class User extends BaseDao {
    
 
    protected $table_name;


    public function __construct(){

        $this->table_name = "users";
        parent::__construct($this->table_name);
    }

    public function getAllUsers()
    {
        $query = "SELECT * FROM " . $this->table_name;
        return $this->query($query, []);
    }
}

?>


