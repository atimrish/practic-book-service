<?php

const HOST = 'localhost';
const USERNAME = 'root';
const PASSWORD = 'root';
const DB_NAME = 'book-service-api';

/** Подключение к бд
 * @return false|mysqli
 */
function connect_db() {
    return mysqli_connect(HOST, USERNAME, PASSWORD, DB_NAME);

}


/** Получает все книги из бд
 * @return void
 */
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


/** Получает книгу из бд по id
 * @param $id
 * @return void
 */
function getBook($id) {
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

/** Добавление книги в бд
 * @param array $data
 * @return void
 */
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

/** Удаление книги из бд по id
 * @param $id
 * @return void
 */
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


/** Изменяет данные книги по id
 * @param $id
 * @param $data
 * @return void
 */
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


/** Получает всех авторов из бд
 * @return void
 */
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


/** Получает автора из бд по его id
 * @param $id
 * @return void
 */
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

/** Добавление автора в бд
 * @param $data
 * @return void
 */
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


/** Изменение данных автора по его id
 * @param $id
 * @param $data
 * @return void
 */
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


/** Удаление автора по его id
 * @param $id
 * @return void
 */
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

/** Получеиние всех пользователей из бд
 * @return void
 */
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

/** Получеиние пользователя из бд по id
 * @param $id
 * @return void
 */
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

/** Добавление пользователя в бд
 * @param $data
 * @return void
 */
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

/** Обновление данных пользователя по id
 * @param $id
 * @param $data
 * @return void
 */
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

/** Удаление пользователя по id
 * @param $id
 * @return void
 */
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

/** Получение всех оценок
 * @return void
 */
function getAllRating() {
    $mysqli = connect_db();
    $sql = "
    SELECT 
        `rating`.`id` AS rating_id,
        `rating`.`user_id` AS user_id,
        `rating`.`book_id` AS book_id,
        `rating`.`value` AS rating_value,
        `user`.`surname` AS user_surname,
        `user`.`name` AS user_name,
        `user`.`patronymic` AS user_patronymic,
        `book`.`title` AS book_title
    FROM `rating`
    LEFT JOIN 
        `user`
            ON 
                `user`.`id` = `rating`.`user_id`
    LEFT JOIN
        `book`
            ON 
                `book`.`id` = `rating`.`book_id`
    ";
    $result = mysqli_query($mysqli, $sql) or die(mysqli_error($mysqli));
    $result = mysqli_fetch_all($result, MYSQLI_ASSOC);
    mysqli_close($mysqli);

    echo json_encode($result);
}

/** Получение всех оценок по id книги
 * @param $id
 * @return void
 */
function getRatingByBookId($id) {
    $mysqli = connect_db();
    $sql = "
    SELECT * FROM `rating`
    WHERE `book_id` = '$id'
    ";
    $result = mysqli_query($mysqli, $sql);
    $result = mysqli_fetch_all($result, MYSQLI_ASSOC);
    mysqli_close($mysqli);

    echo json_encode($result);
}

/** Получение всех оценок по id пользователя
 * @param $id
 * @return void
 */
function getRatingByUserId($id) {
    $mysqli = connect_db();
    $sql = "
    SELECT * FROM `rating`
    WHERE `user_id` = '$id'
    ";
    $result = mysqli_query($mysqli, $sql);
    $result = mysqli_fetch_all($result, MYSQLI_ASSOC);
    mysqli_close($mysqli);

    echo json_encode($result);
}

/** Добавление оценки пользователя
 * @param $user_id
 * @param $book_id
 * @param $value
 * @return void
 */
function addRating($data) {

    $user_id = $data['user_id'];
    $book_id = $data['book_id'];
    $value = $data['value'];

    $mysqli = connect_db();
    $sql = "
    INSERT INTO `rating`(user_id, book_id, value) 
    VALUES ('$user_id', '$book_id', '$value')
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

/** Изменение оценки для книги
 * @param $data
 * @return void
 */
function updateRating($data) {
    $mysqli = connect_db();
    $user_id = $data['user_id'];
    $book_id = $data['book_id'];
    $rating_value = $data['value'];

    $sql = "
    UPDATE `rating`
    SET
        `value` = '$rating_value'
    WHERE `user_id` = '$user_id' AND `book_id` = '$book_id';
    ";
    mysqli_query($mysqli,$sql);

    http_response_code(200);
    $res = [
        "status" => true,
        "message" => "Updated rating"
    ];
    mysqli_close($mysqli);

    echo json_encode($res);

}

/** Удаление оценки
 * @param $data
 * @return void
 */
function deleteRating($data) {
    $mysqli = connect_db();
    $user_id = $data['user_id'];
    $book_id = $data['book_id'];


    $sql = "
    DELETE FROM `rating`
    WHERE `user_id` = '$user_id' AND `book_id` = '$book_id'
    ";
    mysqli_query($mysqli, $sql) or die(mysqli_error($mysqli));
    $response = [
        'status' => true,
        'response_code' => 200
    ];
    http_response_code(200);
    mysqli_close($mysqli);
    echo json_encode($response);
}


function getComments() {
    $mysqli = connect_db();
    $sql = "
    SELECT
        `comment`.`id` AS comment_id,
        `comment`.`user_id` AS user_id,
        `comment`.`book_id` AS book_id,
        `user`.`surname` AS user_surname,
        `user`.`name` AS user_name,
        `user`.`patronymic` AS user_patronymic,
        `book`.`title` AS book_title
    FROM `comment`
    LEFT JOIN 
        `user` ON `user`.`id` = `comment`.`user_id`
    LEFT JOIN
        `book` ON `book`.`id` = `comment`.`book_id`
    ";
    $result = mysqli_query($mysqli, $sql) or die(mysqli_error($mysqli));
    $result = mysqli_fetch_all($result, MYSQLI_ASSOC);
    mysqli_close($mysqli);

    echo json_encode($result);
}


function getCommentByBookId($id) {
    $mysqli = connect_db();
    $sql = "
    SELECT
        `comment`.`id` AS comment_id,
        `comment`.`user_id` AS user_id,
        `comment`.`book_id` AS book_id,
        `user`.`surname` AS user_surname,
        `user`.`name` AS user_name,
        `user`.`patronymic` AS user_patronymic,
        `book`.`title` AS book_title
    FROM `comment`
    LEFT JOIN 
        `user` ON `user`.`id` = `comment`.`user_id`
    LEFT JOIN
        `book` ON `book`.`id` = `comment`.`book_id`
    WHERE `comment`.`book_id` = '$id'
    ";
    $result = mysqli_query($mysqli, $sql) or die(mysqli_error($mysqli));
    $result = mysqli_fetch_all($result, MYSQLI_ASSOC);
    mysqli_close($mysqli);

    echo json_encode($result);

}

function getCommentByUserId($id) {
    $mysqli = connect_db();
    $sql = "
    SELECT
        `comment`.`id` AS comment_id,
        `comment`.`user_id` AS user_id,
        `comment`.`book_id` AS book_id,
        `user`.`surname` AS user_surname,
        `user`.`name` AS user_name,
        `user`.`patronymic` AS user_patronymic,
        `book`.`title` AS book_title
    FROM `comment`
    LEFT JOIN 
        `user` ON `user`.`id` = `comment`.`user_id`
    LEFT JOIN
        `book` ON `book`.`id` = `comment`.`book_id`
    WHERE `comment`.`user_id` = '$id'
    ";
    $result = mysqli_query($mysqli, $sql) or die(mysqli_error($mysqli));
    $result = mysqli_fetch_all($result, MYSQLI_ASSOC);
    mysqli_close($mysqli);

    echo json_encode($result);
}

function getCommentByCommentId($id) {
    $mysqli = connect_db();
    $sql = "
    SELECT
        `comment`.`id` AS comment_id,
        `comment`.`user_id` AS user_id,
        `comment`.`book_id` AS book_id,
        `user`.`surname` AS user_surname,
        `user`.`name` AS user_name,
        `user`.`patronymic` AS user_patronymic,
        `book`.`title` AS book_title
    FROM `comment`
    LEFT JOIN 
        `user` ON `user`.`id` = `comment`.`user_id`
    LEFT JOIN
        `book` ON `book`.`id` = `comment`.`book_id`
    WHERE `comment`.`id` = '$id'
    ";
    $result = mysqli_query($mysqli, $sql) or die(mysqli_error($mysqli));
    $result = mysqli_fetch_all($result, MYSQLI_ASSOC);
    mysqli_close($mysqli);

    echo json_encode($result);
}

function getCommentByUserIdAndBookId($user_id, $book_id) {
    $mysqli = connect_db();
    $sql = "
    SELECT
        `comment`.`id` AS comment_id,
        `comment`.`user_id` AS user_id,
        `comment`.`book_id` AS book_id,
        `user`.`surname` AS user_surname,
        `user`.`name` AS user_name,
        `user`.`patronymic` AS user_patronymic,
        `book`.`title` AS book_title
    FROM `comment`
    LEFT JOIN 
        `user` ON `user`.`id` = `comment`.`user_id`
    LEFT JOIN
        `book` ON `book`.`id` = `comment`.`book_id`
    WHERE `comment`.`user_id` = '$user_id' AND `comment`.`book_id` = '$book_id'
    ";
    $result = mysqli_query($mysqli, $sql) or die(mysqli_error($mysqli));
    $result = mysqli_fetch_all($result, MYSQLI_ASSOC);
    mysqli_close($mysqli);

    echo json_encode($result);

}

function addComment($data) {
    $user_id = $data['user_id'];
    $book_id = $data['book_id'];
    $description = $data['description'];

    $mysqli = connect_db();
    $sql = "
    INSERT INTO `comment`(description, user_id, book_id) 
    VALUES ('$description', '$user_id', '$book_id')
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


function updateComment($id, $data) {

    $mysqli = connect_db();

    $description = $data['description'];

    $sql = "
    UPDATE `comment`
    SET
        `description`='$description'
    WHERE `comment`.`id` = '$id';
    ";
    mysqli_query($mysqli,$sql);

    http_response_code(200);
    $res = [
        "status" => true,
        "message" => "Updated comment"
    ];
    mysqli_close($mysqli);

    echo json_encode($res);

}

function deleteComment($id) {
    $mysqli = connect_db();
    $sql = "
    DELETE FROM `comment`
    WHERE `id` = '$id'
    ";

    mysqli_query($mysqli, $sql) or die(mysqli_error($mysqli));
    $response = [
        'status' => true,
        'response_code' => 200
    ];
    http_response_code(200);
    mysqli_close($mysqli);
    echo json_encode($response);
}
