<?php

require_once __DIR__ . "/../config.php";

class BaseDao{

    protected $connection;
    protected $table_name;

    public function __construct($table_name){

        $this->table_name = $table_name;
        try{

            $this->connection = new PDO(
                "mysql:host=" . Config::DB_HOST() . 
                ";dbname=" . Config::DB_NAME() .
                ";port=" . Config::DB_PORT(),
                Config::DB_USER(), 
                Config::DB_PASSWORD(),

                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
                ]

            );

        } catch (PDOException $error) {
            throw $error;
        }

    }

    protected function query($query, $params)
    {
        $stmt = $this->connection->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    protected function query_unique($query, $params){
        
        $result = $this->query($query, $params);
        return reset($result);
    }

    public function add($entity)
    {

        $query = "INSERT INTO " . $this->table_name . " (";
        foreach ($entity as $column => $value) {
            $query .= $column . ', ';
        }
    
        $query = substr($query, 0, -2);  
        $query .= ") VALUES (";
        
     
        foreach ($entity as $column => $value) {
            $query .= ":" . $column . ', ';
        }
        $query = substr($query, 0, -2);  
        $query .= ")";
    
        $stmt = $this->connection->prepare($query);
        foreach ($entity as $column => $value) {
            $stmt->bindValue(':' . $column, $value);
        }
    

        if ($stmt->execute()) {

            $entity['id'] = $this->connection->lastInsertId();
            return $entity; 
        } else {
      
            throw new Exception("Failed to insert entity into database.");
        }
    }
    

    public function update($entity, $id, $id_column = 'id')
    {
        
        $query = "UPDATE " . $this->table_name . " SET ";

        foreach ($entity as $column => $value) {
            if ($column != $id_column) {  
                $query .= $column . "=:" . $column . ", ";
            }
        }

    
        $query = substr($query, 0, -2);
        $query .= " WHERE " . $id_column . " = :id";
        $stmt = $this->connection->prepare($query);

        $entity['id'] = $id;
   

        if ($stmt->execute($entity)) {
            return $entity;  
        } else {
        
            throw new Exception("Failed to update entity.");
        }
    }

    public function delete($id)
    {
    
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->connection->prepare($query);
        $stmt->bindValue(":id", $id);


        if ($stmt->execute()) {
            return true;  
        } else {
    
            throw new Exception("Failed to delete entity.");
        }
    }


    public function getById($id){

        $query = "SELECT * FROM ". $this->table_name . " WHERE id = :id";
        $stmt = $this->connection->prepare($query);
        $stmt->bindValue(":id", $id);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_OBJ);
    }

}




?>