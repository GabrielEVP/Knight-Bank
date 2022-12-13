<?php 
class move_type_class {
    protected $id_moveType;
    protected $name;

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
     * Get the value of name
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set the value of name
     */
    public function setName($name): self
    {
        $this->name = $name;

        return $this;
    }
}
?>