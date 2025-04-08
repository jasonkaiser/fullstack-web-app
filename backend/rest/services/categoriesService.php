<?php
require_once __DIR__ . '/baseService.php';
require_once __DIR__ . '/../dao/categoriesDao.php';  

class CategoriesService extends BaseService
{   


    public function __construct()
    {
        parent::__construct(new Category);
    }



    public function getCategories(){
        
        $categories = $this->dao->getCategories();

        if(empty($categories)){
            return "Error retrieving data."; 
        }

        return $categories;

    }

    

    public function getCategoryByName($category_name){

        if(empty($category_name)){
            return "Category name can not be empty";
        }

        $category = $this->dao->getCategoryByName($category_name);

        if(empty($category)){
            return "Invalid Category name";
        }

        return $category;

    }
}
?>