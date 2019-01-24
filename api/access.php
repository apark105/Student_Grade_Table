<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');

$LOCAL_ACCESS = true;

$output = [
    'success' => false,
    'errors' => []
];


if(empty($_POST['action'])){
    $output[errors][] = "No action specified";
    print(json_encode($output));
    exit();
}
// echo "line 18/19";
// print_r ($_POST);

require_once('mysql_connect.php');
switch($_POST['action']){
    case 'read':
        // print 'did it hit?';
        include('CRUD/read.php');
        break;
    case 'create':
        include('CRUD/create.php');
    break;
    case 'delete':
        include('CRUD/delete.php');
        break;
    case 'update':
        include('CRUD/update.php');
        break;
    default:
        $output['errors'][] = 'invalid action';
}

// $json_output = json_encode($output);
// print($json_output);

?>