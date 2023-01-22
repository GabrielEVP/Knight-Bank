<?php
include_once (str_replace("account_move", "", __DIR__  . "standard_class.php")); 
class account_move_class extends standard_class{
    protected $id_acccount_move;
    protected $IBAN;
    protected $id_move;
    protected $amount;

    

    /**
     * Get the value of id_acccount_move
     */
    public function getIdAcccountMove()
    {
        return $this->id_acccount_move;
    }

    /**
     * Set the value of id_acccount_move
     */
    public function setIdAcccountMove($id_acccount_move): self
    {
        $this->id_acccount_move = $id_acccount_move;

        return $this;
    }

    /**
     * Get the value of IBAN
     */
    public function getIBAN()
    {
        return $this->IBAN;
    }

    /**
     * Set the value of IBAN
     */
    public function setIBAN($IBAN): self
    {
        $this->IBAN = $IBAN;

        return $this;
    }

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
     * Get the value of amount
     */
    public function getAmount()
    {
        return $this->amount;
    }

    /**
     * Set the value of amount
     */
    public function setAmount($amount): self
    {
        $this->amount = $amount;

        return $this;
    }
}




?>