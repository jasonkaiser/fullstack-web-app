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
            throw new RuntimeException("Users not found.");
        }   
    
        return $users;
    }

    

    public function getUserByEmail($email){

        if(empty($email)){
            
            throw new InvalidArgumentException("Email cannot be empty.");
        }
        
        if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
            throw new InvalidArgumentException("Invalid email format.");
        }

        $user = $this->dao->getUserByEmail($email);

        if(empty($user)){
            throw new RuntimeException("User not found.");
        }

        return $user;
    } 
}
?>