<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Credentials: true');
header('Content-type: json/application');

require_once 'lib.php';

$a = $_GET['q'];
if ($a[0] === '/') {
    $a = substr($a,1);
}

$a = explode('/', $a);


$book_id = $_GET['book_id'];
$user_id = $_GET['user_id'];



$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'GET':
        $id = $a[1];
        if (empty($id) && empty($user_id) && empty($book_id)) {
            switch ($a[0]) {
                case 'books':
                    getBooks();
                    break;
                case 'authors':
                    getAuthors();
                    break;
                case 'users':
                    getUsers();
                    break;
                case 'rating':
                    getAllRating();
                    break;
                case 'comments':
                    getComments();
                    break;
            }


        } else {
            $id = $a[2];
            $type = $a[1];
            switch ($a[0]) {
                case 'books':
                    getBook($id);
                    break;
                case 'authors':
                    getAuthor($id);
                    break;
                case 'users':
                    getUser($id);
                    break;
                case 'rating':
                    if (!empty($type) && !empty($id)) {
                        switch ($type) {
                            case 'books':
                                getRatingByBookId($id);
                                break;
                            case 'users':
                                getRatingByUserId($id);
                                break;
                        }
                    } else {
                        getAllRating();
                    }
                    break;
                case 'comments':
                    $id = $a[1];
                    if (empty($id)) {
                        if (!empty($book_id) && !empty($user_id)) {
                            getCommentByUserIdAndBookId($user_id, $book_id);
                        } else if (!empty($book_id)) {
                            getCommentByBookId($book_id);
                        } else if (!empty($user_id)) {
                            getCommentByUserId($user_id);
                        }
                    } else {
                        getCommentByCommentId($id);
                    }
                    break;
            }


        }

        break;

    case 'POST':
        switch ($a[0]) {
            case 'books':
                addBook($_POST);
                break;
            case 'authors':
                addAuthor($_POST);
                break;
            case 'users':
                addUser($_POST);
                break;
            case 'rating':
                addRating($_POST);
                break;
            case 'comments':
                addComment($_POST);
                break;
        }
        break;

    case 'PATCH':
        $id = $a[1];
        $data = file_get_contents('php://input');
        $data = json_decode($data, true);
        if (isset($id)) {

            switch ($a[0]) {
                case 'books':
                    updateBook($id, $data);
                    break;
                case 'authors':
                    updateAuthor($id, $data);
                    break;
                case 'users':
                    updateUser($id, $data);
                    break;
                case 'comments':
                    updateComment($id, $data);
                    break;
            }

        } else if ($a[0] === 'rating') {
            updateRating($data);
        }

    break;

    case 'DELETE':
        $id = $a[1];

        if (!empty($id)) {
            switch ($a[0]) {
                case 'books':
                    deleteBook($id);
                    break;
                case 'authors':
                    deleteAuthor($id);
                    break;
                case 'users':
                    deleteUser($id);
                    break;
                case 'comments':
                    deleteComment($id);
                    break;
            }

        } else {
            if ($a[0] === 'rating') {
                $data = file_get_contents('php://input');
                $data = json_decode($data, true);
                deleteRating($data);
            }

        }

        break;

    default:
        http_response_code(404);
        break;
}


