<?php

const HOST = 'localhost';
const USERNAME = 'root';
const PASSWORD = 'root1234';
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
                `book`.`year_of_issue` AS book_year_of_issue
                FROM `book`  
            ";

    $result = mysqli_query($mysqli, $sql) or die(mysqli_error($mysqli));
    $result = mysqli_fetch_all($result, MYSQLI_ASSOC);

    mysqli_close($mysqli);

    echo json_encode($result);
}

function getPopularBooks() {
    $mysqli = connect_db();

    $sql = "SELECT 
                `book`.`id` AS book_id,
                `book`.`title` AS book_title,
                `book`.`image` AS book_image,
                COUNT(`rating`.`value`) AS rating_count
                FROM `book` 
                LEFT JOIN 
                    `rating` 
                        ON `book`.`id` = `rating`.`book_id`
                GROUP BY book_title, book_image, book_id
                ORDER BY rating_count DESC
                LIMIT 10
            ";

    $result = mysqli_query($mysqli, $sql) or die(mysqli_error($mysqli));
    $result = mysqli_fetch_all($result, MYSQLI_ASSOC);

    mysqli_close($mysqli);

    echo json_encode($result);
}

function getTopBooks() {
    $mysqli = connect_db();

    $sql = "SELECT 
            `book`.`id` AS book_id,
            `book`.`title` AS book_title,
            `book`.`image` AS book_image,
            SUM(`rating`.`value`) / COUNT(`rating`.`value`) AS avg_rating_value
            FROM `book` 
            JOIN `rating`
                ON `rating`.`book_id` = `book`.`id`
                GROUP BY book_title
                ORDER BY avg_rating_value DESC
                LIMIT 10
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
                `book`.`year_of_issue` AS book_year_of_issue
                FROM `book` 
                
                WHERE `book`.`id` = '$id'
    ";

    $result = mysqli_query($mysqli, $sql) or die(mysqli_error($mysqli));
    $result = mysqli_fetch_assoc($result);

    mysqli_close($mysqli);

    echo json_encode($result);

}

function getBooksByAuthorId($id) {
    $mysqli = connect_db();

    $sql = "
        SELECT 
	`book_author`.`author_id` AS author_id,
    `book_author`.`book_id` AS book_id,
    `book`.`title` AS book_title,
    `book`.`image` AS book_image,
    `book`.`description` AS book_description,
    `book`.`year_of_issue` AS book_year_of_issue
	FROM `book_author`
    LEFT JOIN `book` ON `book_author`.`book_id` = `book`.`id`
    LEFT JOIN `author` ON `book_author`.`author_id` = `author`.`id`
    WHERE author_id = '$id'    
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
function addBook($data) {
    $mysqli = connect_db();

    $title = $data['title'];
    $description = $data['description'];
    $year_of_issue = $data['year_of_issue'];
    $authors = explode('/', $data['author_id']);
    $genres = explode('/', $data['genre_id']);
    $image =  isset($_FILES['image']['name']) ? time() . $_FILES['image']['name'] : 'default-profile-picture.jpeg';
    $tmp_name = $_FILES['image']['tmp_name'];



    $sql = "
    INSERT INTO `book`(title, image, description, year_of_issue)
    VALUES ('$title', '$image', '$description', '$year_of_issue');
    ";

    mysqli_query($mysqli, $sql) or die(mysqli_error($mysqli));

    $book_id = mysqli_insert_id($mysqli);

    $sql = "
            INSERT INTO `book_author`(book_id, author_id) 
            VALUES('$book_id', '$authors[0]')
            ";

    for ($i = 1; $i < count($authors); $i++) {
        $sql .= ", ('$book_id', '$authors[$i]')";
    }
    mysqli_query($mysqli, $sql) or die(mysqli_error($mysqli));


    $sql = "
            INSERT INTO `book_genre`(book_id, genre_id)
            VALUES ('$book_id', '$genres[0]')
    ";

    for ($i = 1; $i < count($genres); $i++) {
        $sql .= ", ('$book_id', '$genres[$i]')";
    }
    $result = mysqli_query($mysqli, $sql) or die(mysqli_error($mysqli));




    if ($result) {
        $response = [
          'status' => true,
          'response_code' => 201
        ];
        http_response_code(201);

        if ($image !== 'default-profile-picture.jpeg') {
            $path = 'uploads' . DIRECTORY_SEPARATOR . $image;

            move_uploaded_file($tmp_name, $path);
        }


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

    $sql = "
    DELETE FROM `book_author`
    WHERE `book_id` = '$id'
    ";

    mysqli_query($mysqli, $sql);

    $sql = "
    DELETE FROM `book_genre`
    WHERE `book_id` = '$id'
    ";

    mysqli_query($mysqli, $sql);

    $response = [

        'status' => true,
        'message' => 'Книга удалена'

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
    $description = $data['description'];
    $year_of_issue = $data['year_of_issue'];

    $sql = "
    UPDATE `book`
    SET
        `title`='$title',
        `description`='$description',
        `year_of_issue`='$year_of_issue'
    WHERE `book`.`id` = '$id';
    
    ";

    mysqli_query($mysqli,$sql);

    http_response_code(200);
    $res = [
        "status" => true,
        "message" => "Книга изменена"
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


function getPopularAuthors() {
    $mysqli = connect_db();

    $sql = "
        SELECT 
        `author`.`id` AS author_id, 
        `author`.`surname` AS surname, 
        `author`.`name` AS name,
        `author`.`author_image` AS author_image,
        `author`.`patronymic` AS patronymic, 
        COUNT(`rating`.`value`) AS count_rating_value 
        FROM `book_author`
            LEFT JOIN `author`
                ON `book_author`.`author_id` = `author`.`id`
            LEFT JOIN `book`
                ON `book_author`.`book_id` = `book`.`id`
            LEFT JOIN `rating` 
                ON `rating`.`book_id` = `book`.`id` 
            GROUP BY author_id 
            ORDER BY count_rating_value DESC 
            LIMIT 5
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
function getAuthorByBookId($id) {
    $mysqli = connect_db();

    $sql = "
    SELECT 
	`book_author`.`book_id` AS book_id,
    `book_author`.`author_id` AS author_id,
    `author`.`surname` AS author_surname,
    `author`.`name` AS author_name,
    `author`.`patronymic` AS author_patronymic,
    `author`.`author_image` AS author_image
	FROM `book_author`
    LEFT JOIN `author` ON `book_author`.`author_id` = `author`.`id`
    LEFT JOIN `book` ON `book_author`.`book_id` = `book`.`id`
    WHERE book_id = '$id'
    ";
    $result = mysqli_query($mysqli, $sql);
    $result = mysqli_fetch_all($result, MYSQLI_ASSOC);
    mysqli_close($mysqli);

    echo json_encode($result);

}

function getAuthor($id) {
    $mysqli = connect_db();

    $sql = "
    SELECT 
	*
	FROM `author`
    WHERE `id` = '$id'
    ";

    $result = mysqli_query($mysqli, $sql);
    $result = mysqli_fetch_assoc($result);
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
    $avatar =  isset($_FILES['avatar']['name']) ? time() . $_FILES['avatar']['name'] : 'default-profile-picture.jpeg';
    $tmp_name = $_FILES['avatar']['tmp_name'];



    $sql = "
    INSERT INTO `author`(surname, name, patronymic, author_image) 
    VALUES ('$surname', '$name', '$patronymic', '$avatar')
    ";

    $result = mysqli_query($mysqli, $sql);


    if ($result) {
        $response = [
            'status' => true,
            'response_code' => 201
        ];
        http_response_code(201);

        $path = 'uploads' . DIRECTORY_SEPARATOR . $avatar;

        move_uploaded_file($tmp_name, $path);




    } else {
        $response = [
            'status' => false,
            'response_code' => 500
        ];
        http_response_code(500);
        echo mysqli_error($mysqli);
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
//    $avatar = isset($_FILES['avatar']['name']) ? time() . $_FILES['avatar']['name'] : 'default-profile-picture.jpeg';
//    $tmp_name = $_FILES['avatar']['tmp_name'];

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
        "message" => "Автор изменен"
    ];

//    $path = 'uploads' . DIRECTORY_SEPARATOR . $avatar;
//    move_uploaded_file($tmp_name, $path);

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
        'message' => 'Автор удален'
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
    $result = mysqli_fetch_assoc($result);
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
    $is_admin = 0;
    $avatar = isset($_FILES['avatar']['name']) ? time() . $_FILES['avatar']['name'] : 'default-profile-picture.jpeg';
    $tmp_name = $_FILES['avatar']['tmp_name'];

    $sql = "
        INSERT INTO `user`(surname, name, patronymic, login, password, is_admin, avatar) 
        VALUES ('$surname', '$name', '$patronymic', '$login', '$password', '$is_admin' ,'$avatar')
    ";

    $result = mysqli_query($mysqli, $sql);

    if ($result) {
        $response = [
            'status' => true,
            'message' => 'Пользователь добавлен',
            'user_id' => mysqli_insert_id($mysqli)
        ];
        http_response_code(201);

        $path = 'uploads' . DIRECTORY_SEPARATOR . $avatar;

        move_uploaded_file($tmp_name, $path);




    } else {
        $response = [
            'status' => false,
            'message' => '500 error'
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
    SELECT 
        ROUND(SUM(`value`) / COUNT(`value`), 2) AS avg_book_rating,
        COUNT(`value`) AS rating_count
    FROM `rating` 
    WHERE `book_id` = '$id' 
    ";
    $result = mysqli_query($mysqli, $sql);
    $result = mysqli_fetch_assoc($result);
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

function getRatingByUserAndBookId($user_id, $book_id) {
    $mysqli = connect_db();
    $sql = "
    SELECT * FROM `rating`
    WHERE 
        `user_id` = '$user_id' AND 
        `book_id` = '$book_id'
    ";

    $result = mysqli_query($mysqli, $sql);
    $result = mysqli_fetch_assoc($result);
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
            'message' => 'Спасибо за оценку'
        ];
        http_response_code(201);
    } else {
        $response = [
            'status' => false,
            'message' => 'Ошибка'
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
        'message' => 'rating is deleted'
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
        `comment`.`description` AS comment_description,
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

/** Получение комментария по id книги
 * @param $id
 * @return void
 */
function getCommentByBookId($id) {
    $mysqli = connect_db();
    $sql = "
    SELECT
        `comment`.`id` AS comment_id,
        `comment`.`user_id` AS user_id,
        `comment`.`book_id` AS book_id,
        `comment`.`description` AS comment_description,
        `user`.`surname` AS user_surname,
        `user`.`name` AS user_name,
        `user`.`patronymic` AS user_patronymic,
        `user`.`avatar` AS user_avatar,
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

/** Получение комментария по id пользователя
 * @param $id
 * @return void
 */
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

/** Получение комментария по его id
 * @param $id
 * @return void
 */
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

/** Получение комментария по id пользователя и id книги
 * @param $user_id
 * @param $book_id
 * @return void
 */
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

/** Добавление комментария
 * @param $data
 * @return void
 */
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
            'message' => 'Комментарий оставлен'
        ];
        http_response_code(201);
    } else {
        $response = [
            'status' => false,
            'message' => 'Не удалось оставить комментарий'
        ];
        http_response_code(500);
    }
    mysqli_close($mysqli);

    echo json_encode($response);
}


/** Изменение комментария
 * @param $id
 * @param $data
 * @return void
 */
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
        "message" => "Комментарий изменен"
    ];
    mysqli_close($mysqli);

    echo json_encode($res);

}

/** Удаление комментария
 * @param $id
 * @return void
 */
function deleteComment($id) {
    $mysqli = connect_db();
    $sql = "
    DELETE FROM `comment`
    WHERE `id` = '$id'
    ";

    mysqli_query($mysqli, $sql) or die(mysqli_error($mysqli));
    $response = [
        'status' => true,
        'message' => 'Комментарий удален'
    ];
    http_response_code(200);
    mysqli_close($mysqli);
    echo json_encode($response);
}


function checkUser($data) {
    $login = $data['login'];
    $password = md5($data['password']);

    $mysqli = connect_db();

    $sql = "SELECT 
                `id`,
                `surname`,
                `name`,
                `patronymic`,
                `avatar`,
                `is_admin`,
                `is_banned`
            FROM `user`
            WHERE 
                `login` = '$login' AND
                `password` = '$password'
            ";

    $result = mysqli_query($mysqli, $sql);

    if (mysqli_num_rows($result) > 0) {
        $result = mysqli_fetch_assoc($result);
        $result['status'] = true;
        $result['message'] = 'Добро пожаловать';
    } else {
        $result = [
          'message' => 'Неправильный логин или пароль'
        ];
    }
    echo  json_encode($result);
}

function checkLogin($data) {
    $login = $data['login'];
    $mysqli = connect_db();

    $sql = "SELECT `login` FROM `user` WHERE `login` = '$login'";

    $result = mysqli_query($mysqli, $sql);
    mysqli_close($mysqli);

    if (mysqli_num_rows($result) === 0) {
        $response = [
            'status' => true,
        ];
    } else {
        $response = [
            'status' => false,
            'message' => 'Пользователь с таким логином уже существует'
        ];
    }
    echo json_encode($response);
}

function getAllGenres() {
    $mysqli = connect_db();

    $sql = "SELECT * FROM `genre`";

    $result = mysqli_query($mysqli, $sql);
    $result = mysqli_fetch_all($result, MYSQLI_ASSOC);

    mysqli_close($mysqli);

    echo json_encode($result);
}

function getGenreByBookId($id) {
    $mysqli = connect_db();

    $sql = "
    SELECT 
        `genre`.`id`,
	    `genre`.`title` 
        FROM `book_genre`
        LEFT JOIN `genre` ON `book_genre`.`genre_id` = `genre`.`id`
        WHERE `book_genre`.`book_id` = '$id'
    ";

    $result = mysqli_query($mysqli, $sql) or die(mysqli_error($mysqli));
    $result = mysqli_fetch_all($result, MYSQLI_ASSOC);

    mysqli_close($mysqli);


    echo json_encode($result);
}


function searchWithLimit() {
    $like = $_GET['like'];

    $mysqli = connect_db();

    $sql = "
    SELECT 
    `book_author`.`book_id` AS id,    
	`book`.`title` AS book_title,
    `book`.`image` AS book_image,
    `author`.`surname` AS author_surname,
    `author`.`name` AS author_name,
    `author`.`patronymic` AS author_patronymic
    FROM `book_author`
    LEFT JOIN `book` ON `book_author`.`book_id` = `book`.`id`
    LEFT JOIN `author` ON `book_author`.`author_id` = `author`.`id`
    WHERE CONCAT_WS(' ', `book`.`title`, `author`.`surname`, `author`.`name`, `author`.`patronymic`) LIKE '%$like%'
    LIMIT 10
    ";

    $result = mysqli_query($mysqli, $sql) or die(mysqli_error($mysqli));
    $result = mysqli_fetch_all($result, MYSQLI_ASSOC);

    mysqli_close($mysqli);


    echo json_encode($result);

}

function search() {

    $like = $_GET['like'];
    $params = $_GET['params'];
    $params = explode('/', $params);



    $mysqli = connect_db();


    $sql = "
    SELECT 
    `book_author`.`book_id` AS id,   
	`book`.`title` AS book_title,
    `book`.`image` AS book_image
    FROM `book_author`
    LEFT JOIN `book` ON `book_author`.`book_id` = `book`.`id`
    LEFT JOIN `author` ON `book_author`.`author_id` = `author`.`id`
    WHERE 
    ";

    if ($params[0] !== '') {

        $sql .= "
            `book`.`id` = ANY 
            (
                SELECT 
                `book_id` 
                FROM `book_genre` 
                WHERE `genre_id` = $params[0]
            )
        ";

        for ($i = 1; $i < count($params); $i++) {
            $sql .= "  
            AND `book`.`id` = ANY 
            (
                SELECT 
                `book_id` 
                FROM `book_genre` 
                WHERE `genre_id` = $params[$i]
            )
            
            ";
        }

        $sql .= " AND ";
    }

    $sql .= " CONCAT_WS(' ', `book`.`title`, `author`.`surname`, `author`.`name`, `author`.`patronymic`) LIKE '%$like%'";

    $sql .= " GROUP BY book_title";


    $result = mysqli_query($mysqli, $sql) or die(mysqli_error($mysqli));
    $result = mysqli_fetch_all($result, MYSQLI_ASSOC);

    mysqli_close($mysqli);


    echo json_encode($result);
}


function searchUser() {
    $like = $_GET['like'];

    $mysqli = connect_db();

    $sql = "
    SELECT 
    `id`,   
    `surname`,
    `name`,
    `patronymic`,
    `is_banned`
    FROM `user`
    WHERE CONCAT_WS(' ', `name`, `surname`, `patronymic`) LIKE '%$like%'
    ";

    $result = mysqli_query($mysqli, $sql) or die(mysqli_error($mysqli));
    $result = mysqli_fetch_all($result, MYSQLI_ASSOC);

    mysqli_close($mysqli);


    echo json_encode($result);
}


function banUser($id, $data) {
    $ban = $data['ban'];
    $mysqli = connect_db();
    $sql = "
    UPDATE `user`
    SET
        `is_banned` = $ban
    WHERE `user`.`id` = '$id';
    ";
    mysqli_query($mysqli,$sql);

    http_response_code(200);
    $res = [
        "status" => true,
        "message" => "Пользователь забанен"
    ];
    mysqli_close($mysqli);

    echo json_encode($res);
}


function addGenre($data) {
    $mysqli = connect_db();

    $title = $data['title'];

    $sql = "
        SELECT 
            `title` 
            FROM `genre`
            WHERE `title` = '$title';
        ";

    $result = mysqli_query($mysqli, $sql);

    
    if (mysqli_num_rows($result) === 0) {

        $sql = "
            INSERT INTO `genre`(title)
            VALUES ('$title')
        ";

        mysqli_query($mysqli, $sql) or die(mysqli_error($mysqli));

        $res = [
            'status' => true,
            'message' => 'Жанр добавлен'
        ];

    } else {
        $res = [
          'status' => false,
          'message' => 'Такой жанр уже существует'
        ];
    }

    echo json_encode($res);
}


