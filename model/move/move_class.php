<?php 
include_once ("model/standard_class.php"); 
class move_class extends standard_class{

    protected $id_move;
    protected $id_move_type;
    protected $dateTime;
    
    /**
     * Get the value of id_move
     */
    public function getIdMove()
    {
        return $this->id_move;
    }

    /**
     * Set the value of id_move
     */
    public function setIdMove($id_move): self
    {
        $this->id_move = $id_move;

        return $this;
    }

    /**
     * Get the value of id_move_type
     */
    public function getIdMoveType()
    {
        return $this->id_move_type;
    }

    /**
     * Set the value of id_move_type
     */
    public function setIdMoveType($id_move_type): self
    {
        $this->id_move_type = $id_move_type;

        return $this;
    }

    /**
     * Get the value of dateTime
     */
    public function getDateTime()
    {
        return $this->dateTime;
    }

    /**
     * Set the value of dateTime
     */
    public function setDateTime($dateTime): self
    {
        $this->dateTime = $dateTime;

        return $this;
    }
}
?>