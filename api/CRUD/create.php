<?php

if(empty($LOCAL_ACCESS)){
    die('Direct access not allowed');
}

$student_name = $_POST['name'];
$student_course = $_POST['course'];
$student_grade = $_POST['grade'];
$output = [
    'success' => false,
    'errors' => [],
];

$query = "INSERT INTO `students` SET
    `Student Name` = '$student_name',
    `Student Course` = '$student_course',
    `Student Grade` = '$student_grade'";

$result = mysqli_query($conn, $query);

if(!empty($result)){
    if(mysqli_affected_rows($conn)){
        $output['success'] = true;
        $output['id'] = mysqli_insert_id($conn);
    }else {
        $output['errors'] = "Unable to insert data";
    }
} else {
    $output['errors'] = "Invalid query";
}

$results = json_encode($output);
print $results;


?>