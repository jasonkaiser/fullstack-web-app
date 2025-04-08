
<?php
require_once __DIR__ . '/../dao/baseDao.php';



class BaseService {
   protected $dao;
   public function __construct($dao) {
       $this->dao = $dao;
   }

   
   public function getById($id) {


        if (empty($id)) {
            throw new Exception("ID cannot be empty");
        }
        if (!is_numeric($id) || $id <= 0) {
            throw new Exception("ID must be a positive number");
        }
        
        return $this->dao->getById($id);
    }


    public function add($data) {


        if (empty($data)) {
            throw new Exception("Data cannot be empty");
        }
        if (!is_array($data)) {
            throw new Exception("Data must be an array");
        }

        return $this->dao->add($data);
    }


    public function update($id, $data) {


        if (empty($id)) {
            throw new Exception("ID cannot be empty");
        }
        if (empty($data)) {
            throw new Exception("Data cannot be empty");
        }
        if (!is_numeric($id) || $id <= 0) {
            throw new Exception("ID must be a positive number");
        }
        if (!is_array($data)) {
            throw new Exception("Data must be an array");
        }

        return $this->dao->update($id, $data);
    }


    public function delete($id) {


        if (empty($id)) {
            throw new Exception("ID cannot be empty");
        }
        if (!is_numeric($id) || $id <= 0) {
            throw new Exception("ID must be a positive number");
        }

        return $this->dao->delete($id);
    }
}
?>
