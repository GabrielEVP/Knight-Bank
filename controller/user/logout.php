<?php
session_start();
session_destroy();
$response['logout'] = true;
echo json_encode($response);
?>