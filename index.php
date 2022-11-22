<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Credentials: true');
header('Content-type: json/application');

require_once 'lib.php';

$a = explode('/',$_GET['a']);


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'GET':
        if ($a[0] === 'books') {

            if (empty($a[1])) {
                getBooks();
            } else {
                $id = $a[1];

                getBook($id);
            }


        }
        break;

    case 'POST':
        if ($a[0] === 'books') {
            addBook($_POST);
        }
        break;

    case 'PATCH':
        if ($a[0] === 'books') {
        $id = $a[1];

        if (isset($id)) {
            $data = file_get_contents('php://input');
            $data = json_decode($data, true);
            updateBook($id, $data);
        }
    }
    break;

    case 'DELETE':
        $id = $a[1];
        deleteBook($id);
        break;

    default:
        http_response_code(404);
        break;
}



//if ($method === 'GET') {
//
//    if ($a[0] === 'books') {
//
//        if (empty($a[1])) {
//            getBooks();
//        } else {
//
//            $id = $a[1];
//
//            getBook($id);
//
//        }
//
//
//    }
//
//} else if ($method === 'POST') {
//
//    if ($a[0] === 'books') {
//        addBook($_POST);
//    }
//
//} else if ($method === 'PATCH') {
//
//    if ($a[0] === 'books') {
//        $id = $a[1];
//
//        if (isset($id)) {
//            $data = file_get_contents('php://input');
//            $data = json_decode($data, true);
//
//            updateBook($id, $data);
//
//        } else {
//
//            echo 'err';
//
//        }
//
//    }
//
//
//} else if ($method === 'DELETE') {
//
//    $id = $a[1];
//
//    deleteBook($id);
//
//}

