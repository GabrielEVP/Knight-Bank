<?php 
include_once ("model/standard_class.php"); 
class user_class extends standard_class{
    protected $id_user;
    protected $gmail;
    protected $NIF;
    protected $name;
    protected $surname;
    protected $password;
    protected $admin;
    protected $login_tries;


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
     * Get the value of gmail
     */
    public function getGmail()
    {
        return $this->gmail;
    }

    /**
     * Set the value of gmail
     */
    public function setGmail($gmail): self
    {
        $this->gmail = $gmail;

        return $this;
    }

    /**
     * Get the value of NIF
     */
    public function getNIF()
    {
        return $this->NIF;
    }

    /**
     * Set the value of NIF
     */
    public function setNIF($NIF): self
    {
        $this->NIF = $NIF;

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

    /**
     * Get the value of surname
     */
    public function getSurname()
    {
        return $this->surname;
    }

    /**
     * Set the value of surname
     */
    public function setSurname($surname): self
    {
        $this->surname = $surname;

        return $this;
    }

    /**
     * Get the value of password
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set the value of password
     */
    public function setPassword($password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get the value of admin
     */
    public function getAdmin()
    {
        return $this->admin;
    }

    /**
     * Set the value of admin
     */
    public function setAdmin($admin): self
    {
        $this->admin = $admin;

        return $this;
    }

    /**
     * Get the value of active
     */
    public function getLogintries()
    {
        return $this->login_tries;
    }

    /**
     * Set the value of active
     */
    public function setLogintries($login_tries): self
    {
        $this->login_tries = $login_tries;

        return $this;
    }
}
?>