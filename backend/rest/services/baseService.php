
<?php
require_once __DIR__ . '/../dao/baseDao.php';



class BaseService {
   protected $dao;
   public function __construct($dao) {
       $this->dao = $dao;
   }

   
        public function getById($id) {
            return $this->dao->getById($id);

        }
        public function add($data) {
            return $this->dao->add($data);

        }
        public function update($id, $data) {
            return $this->dao->update($id, $data);

        }
        public function delete($id) {
            return $this->dao->delete($id);

        }
}
?>
