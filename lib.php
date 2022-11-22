<?php

const HOST = 'localhost';
const USERNAME = 'root';
const PASSWORD = 'root1234';
const DB_NAME = 'book-service-api';

function connect_db() {
    return mysqli_connect(HOST, USERNAME, PASSWORD, DB_NAME);

}

function getBooks() {
    $mysqli = connect_db();

    $sql = "SELECT
                `book`.`id`,
                `book`.`title` AS book_title,
                `book`.`image` AS book_image,
                `book`.`description` AS book_description,
                `book`.`year_of_issue` AS book_year_of_issue,
                `book`.`author_id`,
                `book`.`genre_id`,
                `book`.`rating` AS book_rating,
                `author`.`surname` AS author_surname,
                `author`.`name` AS author_name,
                `author`.`patronymic` AS author_patronymic,
                `genre`.`title` AS genre
                FROM `book` 
                LEFT JOIN 
                    `author`
                        ON `author`.`id` = `book`.`author_id` 
                LEFT JOIN 
                    `genre` 
                        ON `genre`.`id` = `book`.`genre_id`
            ";

    $result = mysqli_query($mysqli, $sql) or die(mysqli_error($mysqli));
    $result = mysqli_fetch_all($result, MYSQLI_ASSOC);

    mysqli_close($mysqli);

    echo json_encode($result);
}


function getBook(int $id) {
    $mysqli = connect_db();

    $sql = "
        SELECT
                `book`.`id`,
                `book`.`title` AS book_title,
                `book`.`image` AS book_image,
                `book`.`description` AS book_description,
                `book`.`year_of_issue` AS book_year_of_issue,
                `book`.`author_id`,
                `book`.`genre_id`,
                `book`.`rating` AS book_rating,
                `author`.`surname` AS author_surname,
                `author`.`name` AS author_name,
                `author`.`patronymic` AS author_patronymic,
                `genre`.`title` AS genre
                FROM `book` 
                LEFT JOIN 
                    `author`
                        ON `author`.`id` = `book`.`author_id` 
                LEFT JOIN 
                    `genre` 
                        ON `genre`.`id` = `book`.`genre_id`
                WHERE `book`.`id` = '$id'
    ";

    $result = mysqli_query($mysqli, $sql) or die(mysqli_error($mysqli));
    $result = mysqli_fetch_all($result, MYSQLI_ASSOC);

    mysqli_close($mysqli);

    echo json_encode($result);

}

function addBook(array $data) {
    $mysqli = connect_db();

    $title = $data['title'];
    $image = $data['image'];
    $description = $data['description'];
    $year_of_issue = $data['year_of_issue'];
    $author_id = $data['author_id'];
    $genre_id = $data['genre_id'];

    $sql = "
    INSERT INTO `book`(title, image, description, year_of_issue, author_id, genre_id)
    VALUES ('$title', '$image', '$description', '$year_of_issue', '$author_id', '$genre_id');
    ";

    $result = mysqli_query($mysqli, $sql);

    if ($result) {
        $response = [
          'status' => true,
          'response_code' => 201
        ];
        http_response_code(201);
    } else {
        $response = [
            'status' => false,
            'response_code' => 500
        ];
        http_response_code(500);
    }



    mysqli_close($mysqli);

    echo json_encode($response);

}

function deleteBook($id) {
    $mysqli = connect_db();

    $sql = "
    DELETE FROM `book`
    WHERE `book`.`id` = '$id'
    ";

    mysqli_query($mysqli, $sql);
    $response = [

        'status' => true,
        'response_code' => 200

    ];

    http_response_code(200);

    mysqli_close($mysqli);

    echo json_encode($response);

}


function updateBook($id, $data) {
    $mysqli = connect_db();

    $title = $data['title'];
    $image = $data['image'];
    $description = $data['description'];
    $year_of_issue = $data['year_of_issue'];
    $author_id = $data['author_id'];
    $genre_id = $data['genre_id'];

    $sql = "
    UPDATE `book`
    SET
        `title`='$title',
        `image`='$image',
        `description`='$description',
        `year_of_issue`='$year_of_issue',
        `author_id`='$author_id',
        `genre_id`='$genre_id' 
    WHERE `book`.`id` = '$id';
    
    ";

    mysqli_query($mysqli,$sql);

    http_response_code(200);
    $res = [
        "status" => true,
        "message" => "Post is update"
    ];

    mysqli_close($mysqli);

    echo json_encode($res);

}

function getAuthors() {
    $mysqli = connect_db();

    $sql = "
    SELECT * FROM `author`
    ";

    $result = mysqli_query($mysqli, $sql);
    $result = mysqli_fetch_all($result, MYSQLI_ASSOC);

    mysqli_close($mysqli);

    echo json_encode($result);
}

function getAuthor($id) {
    $mysqli = connect_db();

    $sql = "
    SELECT * FROM `author`
    WHERE `id` = '$id'
    ";
    $result = mysqli_query($mysqli, $sql);
    $result = mysqli_fetch_all($result, MYSQLI_ASSOC);
    mysqli_close($mysqli);

    echo json_encode($result);

}

function addAuthor($data) {
    $mysqli = connect_db();

    $surname = $data['surname'];
    $name = $data['name'];
    $patronymic = $data['patronymic'];

    $sql = "
    INSERT INTO `author`(surname, name, patronymic) 
    VALUES ('$surname', '$name', '$patronymic')
    ";

    $result = mysqli_query($mysqli, $sql);

    if ($result) {
        $response = [
            'status' => true,
            'response_code' => 201
        ];
        http_response_code(201);
    } else {
        $response = [
            'status' => false,
            'response_code' => 500
        ];
        http_response_code(500);
    }

    mysqli_close($mysqli);

    echo json_encode($response);
}

function updateAuthor($id, $data) {

    $mysqli = connect_db();

    $surname = $data['surname'];
    $name = $data['name'];
    $patronymic = $data['patronymic'];

    $sql = "
    UPDATE `author`
    SET
        `surname`='$surname',
        `name`='$name',
        `patronymic`='$patronymic'
    WHERE `author`.`id` = '$id';
    ";
    mysqli_query($mysqli,$sql);

    http_response_code(200);
    $res = [
        "status" => true,
        "message" => "Post is update"
    ];
    mysqli_close($mysqli);

    echo json_encode($res);
}

function deleteAuthor($id) {
    $mysqli = connect_db();

    $sql = "
    DELETE FROM `author`
    WHERE `id` = '$id'
    ";
    mysqli_query($mysqli, $sql);

    $response = [
        'status' => true,
        'response_code' => 200
    ];

    http_response_code(200);
    mysqli_close($mysqli);
    echo json_encode($response);
}

function getUsers() {
    $mysqli = connect_db();
    $sql = "
    SELECT * FROM `user`
    ";

    $result = mysqli_query($mysqli, $sql);
    $result = mysqli_fetch_all($result, MYSQLI_ASSOC);
    mysqli_close($mysqli);

    echo json_encode($result);
}

function getUser($id) {
    $mysqli = connect_db();
    $sql = "
    SELECT * FROM `user`
    WHERE `id` = '$id'
    ";

    $result = mysqli_query($mysqli, $sql);
    $result = mysqli_fetch_all($result, MYSQLI_ASSOC);
    mysqli_close($mysqli);

    echo json_encode($result);
}

function addUser($data) {
    $mysqli = connect_db();

    $surname = $data['surname'];
    $name = $data['name'];
    $patronymic = $data['patronymic'];
    $login = $data['login'];
    $password = md5($data['password']);
    $is_admin = $data['is_admin'];

    $sql = "
    INSERT INTO `user`(surname, name, patronymic, login, password, is_admin) 
    VALUES ('$surname', '$name', '$patronymic', '$login', '$password', '$is_admin')
    ";

    $result = mysqli_query($mysqli, $sql);

    if ($result) {
        $response = [
            'status' => true,
            'response_code' => 201
        ];
        http_response_code(201);
    } else {
        $response = [
            'status' => false,
            'response_code' => 500
        ];
        http_response_code(500);
    }

    mysqli_close($mysqli);

    echo json_encode($response);

}

function updateUser($id, $data) {
    $mysqli = connect_db();

    $surname = $data['surname'];
    $name = $data['name'];
    $patronymic = $data['patronymic'];

    $sql = "
    UPDATE `user`
    SET
        `surname`='$surname',
        `name`='$name',
        `patronymic`='$patronymic'
    WHERE `user`.`id` = '$id';
    ";
    mysqli_query($mysqli,$sql);

    http_response_code(200);
    $res = [
        "status" => true,
        "message" => "Updated user"
    ];
    mysqli_close($mysqli);

    echo json_encode($res);

}

function deleteUser($id) {
    $mysqli = connect_db();

    $sql = "
    DELETE FROM `user`
    WHERE `id` = '$id'
    ";
    mysqli_query($mysqli, $sql);
    $response = [
        'status' => true,
        'response_code' => 200
    ];
    http_response_code(200);
    mysqli_close($mysqli);
    echo json_encode($response);
}

