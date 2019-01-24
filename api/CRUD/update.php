<?php

if(empty($LOCAL_ACCESS)){
    die('Direct access not allowed');
}


$student_name = $_POST['name'];
$student_course = $_POST['course'];
$student_grade = $_POST['grade'];
$id = $_POST['id'];
if(empty($student_name) || empty($student_course) || empty($student_grade) || empty($id) ) {
    $output["errors"] = "Edit Failed";
  }

$output = [
    'success' => false,
    'errors' => [],
];

$query = " UPDATE `students` SET `Student Name` = '$student_name', `Student Course` = '$student_course', `Student Grade` = '$student_grade' WHERE `id` = '$id' ";

print($query);


$result = mysqli_query($conn, $query);

if(!empty($result)){
    if(mysqli_affected_rows($conn)){
        $output['success'] = true;
    }else {
        $output['errors'][] = 'Unable to update item';
    }
} else {
    $output['errors'][] = "Invalid query";
}

$results = json_encode($output);

print $results;

?>