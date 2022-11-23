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

        } else if ($a[0] === 'authors') {
            if (empty($a[1])) {
                getAuthors();
            } else {
                $id = $a[1];
                getAuthor($id);
            }

        } else if ($a[0] === 'users') {
            if (empty($a[1])) {
                getUsers();
            } else {
                $id = $a[1];
                getUser($id);
            }
        } else if ($a[0] === 'rating') {
            $id = $a[2];
            if (isset($id)) {
                if ($a[1] === 'books') {
                    getRatingByBookId($id);

                } else if ($a[1] === 'users') {
                    getRatingByUserId($id);

                }
            } else {
                getAllRating();

            }
        } else if ($a[0] === 'comments') {
            $id = $a[1];
            if (empty($id)) {

                $book_id = $_GET['book_id'];
                $user_id = $_GET['user_id'];

                if (!empty($book_id) || !empty($user_id)) {
                    if (empty($book_id)) {
                        getCommentByUserId($user_id);
                    } else if (empty($user_id)) {
                        getCommentByBookId($book_id);
                    } else {
                        getCommentByUserIdAndBookId($user_id, $book_id);
                    }
                } else {
                    getComments();
                }

            }  else {
                getCommentByCommentId($id);
            }



        }
        break;

    case 'POST':
        if ($a[0] === 'books') {
            addBook($_POST);
        } else if ($a[0] === 'authors') {
            addAuthor($_POST);
        } else if ($a[0] === 'users') {
            addUser($_POST);
        } else if ($a[0] === 'rating') {
            addRating($_POST);
        } else if ($a[0] === 'comments') {
            addComment($_POST);
        }
        break;

    case 'PATCH':
        $id = $a[1];
        if (isset($id)) {
            $data = file_get_contents('php://input');
            $data = json_decode($data, true);

            if ($a[0] === 'books') {
                updateBook($id, $data);
            } else if ($a[0] === 'authors') {
                updateAuthor($id, $data);
            } else if ($a[0] === 'users') {
                updateUser($id, $data);
            } else if ($a[0] === 'rating') {
                updateRating($data);
            } else if ($a[0] === 'comments') {
                updateComment($id, $data);
            }

        }


    break;

    case 'DELETE':
        $id = $a[1];

        if (!empty($id)) {
            if ($a[0] === 'books') {
                deleteBook($id);
            } else if ($a[0] === 'authors') {
                deleteAuthor($id);
            } else if ($a[0] === 'users') {
                deleteUser($id);
            } else if ($a[0] === 'comments') {
                deleteComment($id);
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

