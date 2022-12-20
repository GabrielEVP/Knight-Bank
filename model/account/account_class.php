<?php 
include_once (str_replace("account", "", __DIR__  . "standard_class.php")); 
class account_class extends standard_class{
    protected $id_account;
    protected $IBAN;
    protected $balance;
    protected $id_user;
    protected $id_user_hist;
    protected $active;

    

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
     * Get the value of balance
     */
    public function getBalance()
    {
        return $this->balance;
    }

    /**
     * Set the value of balance
     */
    public function setBalance($balance): self
    {
        $this->balance = $balance;

        return $this;
    }

    /**
     * Get the value of id_user
     */
    public function getIdUser()
    {
        return $this->id_user;
    }

    /**
     * Set the value of id_user
     */
    public function setIdUser($id_user): self
    {
        $this->id_user = $id_user;

        return $this;
    }

    /**
     * Get the value of id_user_hist
     */
    public function getIdUserHist()
    {
        return $this->id_user_hist;
    }

    /**
     * Set the value of id_user_hist
     */
    public function setIdUserHist($id_user_hist): self
    {
        $this->id_user_hist = $id_user_hist;

        return $this;
    }

    /**
     * Get the value of active
     */
    public function getActive()
    {
        return $this->active;
    }

    /**
     * Set the value of active
     */
    public function setActive($active): self
    {
        $this->active = $active;

        return $this;
    }

    /**
     * Get the value of id_account
     */
    public function getIdAccount()
    {
        return $this->id_account;
    }

    /**
     * Set the value of id_account
     */
    public function setIdAccount($id_account): self
    {
        $this->id_account = $id_account;

        return $this;
    }
}

?>