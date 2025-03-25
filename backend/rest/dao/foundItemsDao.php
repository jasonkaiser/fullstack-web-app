<?php

    require_once __DIR__ . "/baseDao.php";  


    class FoundItem extends BaseDao {

    protected $table_name;


        public function __construct(){

            $this->table_name = "foundItems";
            parent::__construct($this->table_name);
        }


        public function getItemByCategory($category_id){

        }

        public function getItemByStatus($status){

        }

        public function getItemByName($name){

        }

        public function getItemByUser($user_id){

        }

        public function getAllItems(){

        }


    }




?>