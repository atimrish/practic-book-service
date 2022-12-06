<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Credentials: true');
header('Content-type: json/application');

error_reporting(E_STRICT);
require_once 'lib.php';

$a = $_GET['q'];
if ($a[0] === '/') {
    $a = substr($a,1);
}

$a = explode('/', $a);

//die(print_r($a));

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
                case 'popular-books':
                    getPopularBooks();
                    break;
                case 'top-books':
                    getTopBooks();
                    break;
                case 'authors':
                    getAuthors();
                    break;
                case 'popular-authors':
                    getPopularAuthors();
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
                case 'genre':
                    getAllGenres();
                    break;
                case 'search':
                    search();
                    break;
                case 'search-with-limit':
                    searchWithLimit();
                    break;
                case 'search-user':
                    searchUser();
                    break;
            }


        } else {
            $id = $a[2];

            if (!empty($id)) {
                $type = $a[1];
            } else {
                $id = $a[1];
            }


            switch ($a[0]) {
                case 'books':
                    getBook($id);
                    break;
                case 'author-books':
                    getBooksByAuthorId($id);
                    break;
                case 'authors-by-book':
                    getAuthorByBookId($id);
                    break;
                case 'authors':
                    getAuthor($id);
                    break;
                case 'users':
                    getUser($id);
                    break;
                case 'genre':
                    getGenreByBookId($id);
                    break;
                case 'rating':

                    $id = $a[1];
                    if (empty($id)) {
                        if (!empty($book_id) && !empty($user_id)) {
                            getRatingByUserAndBookId($user_id, $book_id);
                        } else if (!empty($book_id)) {
                            getRatingByBookId($book_id);
                        } else if (!empty($user_id)) {
                            getRatingByUserId($user_id);
                        }
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
            case 'login':
                checkUser($_POST);
                break;
            case 'logincheck':
                checkLogin($_POST);
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
                case 'ban-user':
                    banUser($id);
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


