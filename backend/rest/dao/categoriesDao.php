<?php

    require_once __DIR__ . "/baseDao.php";  


    class Category extends BaseDao {

    protected $table_name;


        public function __construct(){

            $this->table_name = "categories";
            parent::__construct($this->table_name);
        }


        public function gettAllCategories(){
            $query = "SELECT * FROM " . $this->table_name;
            return $this->query($query, []);
        }



    }




?>