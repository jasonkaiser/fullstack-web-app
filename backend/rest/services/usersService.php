<?php
require_once __DIR__ . '/baseService.php';
require_once __DIR__ . '/../dao/usersDao.php';  

class UsersService extends BaseService
{   


    public function __construct()
    {
        parent::__construct(new User);
    }



    public function getAllUsers() {

        $users = $this->dao->getAllUsers();

        if(empty($users)){
            return "Error retrieving data."; 
        }   
    
        return $users;
    }

    

    public function getUserByEmail($email){

        if(empty($email)){
            
            return "Email can not be empty.";
        }
        
        if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
            return "Invalid Email format";
        }

        $user = $this->dao->getUserByEmail($email);

        if(empty($user)){
            return "No User found with that Email";
        }

        return $user;
    } 
}
?>