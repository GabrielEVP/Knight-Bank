<?php 
include_once ("model/standard_class.php"); 
class move_class extends standard_class{

    protected $id_move;
    protected $id_moveType;
    protected $dateTime;
    protected $notion;
    
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
     * Get the value of id_moveType
     */
    public function getIdMoveType()
    {
        return $this->id_moveType;
    }

    /**
     * Set the value of id_moveType
     */
    public function setIdMoveType($id_moveType): self
    {
        $this->id_moveType = $id_moveType;

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

    /**
     * Get the value of notion
     */
    public function getNotion()
    {
        return $this->notion;
    }

    /**
     * Set the value of notion
     */
    public function setNotion($notion): self
    {
        $this->notion = $notion;

        return $this;
    }
}
?>