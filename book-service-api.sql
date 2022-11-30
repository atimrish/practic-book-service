-- phpMyAdmin SQL Dump
-- version 5.1.4deb1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Ноя 30 2022 г., 21:51
-- Версия сервера: 8.0.31-0ubuntu2
-- Версия PHP: 8.1.7-1ubuntu3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `book-service-api`
--

-- --------------------------------------------------------

--
-- Структура таблицы `author`
--

CREATE TABLE `author` (
  `id` int UNSIGNED NOT NULL,
  `surname` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `name` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `patronymic` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `author_image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'defaut-profile-picture.jpg'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `author`
--

INSERT INTO `author` (`id`, `surname`, `name`, `patronymic`, `author_image`) VALUES
(1, 'Стивенсон', 'Роберт Льюис', '', '16698143180676b304a4dee0b0b92ef710cdf9649a.webp'),
(2, 'Дойл', 'Артур Конан', '', '1669815772артур-конан-дойль.webp'),
(3, 'Сент-Экзюпери', 'Антуан де ', '', '1669816720антуан-де-сент-экзюпери.webp'),
(4, 'Оруэлл', 'Джордж', '', '1669817364джордж-оруэлл.webp'),
(5, 'Булгаков', 'Михаил', 'Афанасьевич', '1669818103михаил-булгаков.webp'),
(6, 'Брэдбери', 'Рэй', '', '1669818624рэй-бредбери.webp');

-- --------------------------------------------------------

--
-- Структура таблицы `book`
--

CREATE TABLE `book` (
  `id` int UNSIGNED NOT NULL,
  `title` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `year_of_issue` varchar(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `author_id` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `genre_id` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `rating` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `book`
--

INSERT INTO `book` (`id`, `title`, `image`, `description`, `year_of_issue`, `author_id`, `genre_id`, `rating`) VALUES
(1, 'Клуб самоубийц', '1669814622cover13d__w220.webp', 'Добро пожаловать в мир удивительных приключений и хитро задуманных преступлений, головокружительных погонь, смертельных дуэлей и умопомрачительно смешных диалогов, – мир, в котором викторианский \"рыцарь без страха и упрека\" принц Флоризель и его верный друг полковник Джеральдин ведут смертельную схватку со Злом, защищая несправедливо обиженных, – и ни на минуту не теряют при этом достойного истинных джентльменов чувства юмора.', '1981', '1', '6', NULL),
(2, 'Собака Баскервилей', '1669815978собака_баскервилей.webp', 'Настоящие английские джентльмены расследуют настоящие английские преступления в одном из лучших произведений о Шерлоке Холмсе и докторе Ватсоне - повести \"Собака Баскервилей\".', '1902', '2', '6', NULL),
(3, 'Затерянный мир', '1669816245затерянный-мир.webp', '	Роман \"Затерянный мир\" — это увлекательная история о чудаковатом профессоре Челленджере и его друзьях, открывших настоящий \"затерянный мир\" в неисследованном районе Южной Америки и обнаруживших в нем живых динозавров. Книга ничуть не устарела и десятилетия спустя читается с таким же интересом, с каким читалась и прежде.  В сборник также вошло продолжение приключений полюбившихся героев — повесть \"Отравленный пояс\".', '1912', '2', '9', NULL),
(4, 'Маленький принц ', '1669817077маленький-принц.webp', '\"Маленький принц\" — наиболее известное (переведено более чем на 180 языков) произведение Экзюпери, написанное незадолго до смерти автора и им же проиллюстрированное.  Эта печальная, мудрая, человечная сказка предназначена скорее взрослым, чем детям. В ней рассказано о самом важном: о дружбе и любви, о долге и верности…Читая эту чудесную историю, и улыбнешься, и взгрустнешь, и непременно задумаешься над тем, что не всегда можно понять разумом… Как говорил Маленький принц — \"увидишь сердцем\".  В издание также включен сборник эссе \"Планета людей\".', '1943', '3', '10', NULL),
(5, '1984', '16698176121984.webp', 'Культовый роман Джорджа Оруэлла, одна из главных антиутопий XX века.  Жуткий и пугающий текст, и 70 лет спустя не утративший актуальности.  Впервые «1984» публикуется на русском языке в новом, полном, без цензуры и купюр, переводе Дарьи Целовальниковой. Аннотация  Своеобразный антипод второй великой антиутопии XX века - \"О дивный новый мир\" Олдоса Хаксли. Что, в сущности, страшнее: доведенное до абсурда \"общество потребления\" - или доведенное до абсолюта \"общество идеи\"?  По Оруэллу, нет и не может быть ничего ужаснее тотальной несвободы...', '1949', '4', '8', NULL),
(6, 'Скотный двор', '1669817909скотный-двор.webp', 'Роман «1984» об опасности тоталитаризма стал одной из самых известных антиутопий XX века, которая стоит в одном ряду с «Мы» Замятина, «О дивный новый мир» Хаксли и «451° по Фаренгейту» Брэдбери.  Что будет, если в правящих кругах распространятся идеи фашизма и диктатуры? Каким станет общественный уклад, если власть потребует неуклонного подчинения? К какой катастрофе приведет подобный режим?  Повесть-притча «Скотный двор» полна острого сарказма и политической сатиры. Обитатели фермы олицетворяют самые ужасные людские пороки, а сама ферма становится символом тоталитарного общества. Как будут существовать в таком обществе его обитатели — животные, которых поведут на бойню?', '1945', '4', '8', NULL),
(7, 'Мастер и Маргарита', '1669818411мастер-и-маргарита.webp', 'Роман Михаила Булгакова «Мастер и Маргарита» стал must-read задолго до того, как это выражение вошло в наш обиход. Когда в 1966 году, спустя четверть века после написания, роман впервые опубликовали, это стало событием в литературной жизни страны. Невозможно было достать ни экземпляра напечатавшего его журнала «Москва». Конечно, не обошлось без тотальной цензуры. Но вся она была «обнулена» ушедшими в народ самиздатовскими списками, в которых воспроизводились все отрывки с указанием мест, откуда они были вырезаны.  Вениамин Каверин говорил о «Мастере и Маргарите» как о произведении, в котором «невероятные события происходят в каждой главе». Действительно, Булгаков поселил в большевистскую Москву самого Сатану, его Мастер затравлен критиками — адептами соцреализма, а герои «романа внутри романа» — Иешуа, Левий Матвей и Понтий Пилат — точно не герои булгаковского времени. Но все они шествуют сквозь время — может быть, и наша эпоха уже озирается, отыскивая странную фигуру на Патриарших.', '1966', '5', '8', NULL),
(8, '451 по Фаренгейту ', '1669818848451-по-фаренгейту.webp', '451° по Фаренгейту — температура, при которой воспламеняется и горит бумага. Философская антиутопия Брэдбери рисует беспросветную картину развития постиндустриального общества: это мир будущего, в котором все письменные издания безжалостно уничтожаются специальным отрядом пожарных, а хранение книг преследуется по закону, интерактивное телевидение успешно служит всеобщему оболваниванию, карательная психиатрия решительно разбирается с редкими инакомыслящими, а на охоту за неисправимыми диссидентами выходит электрический пес…  Роман, принесший своему творцу мировую известность.  Сенсационным было заявление Брэдбери в 2007 году, что «451° по Фаренгейту» понимают неправильно. Эта книга не о правительственной цензуре, это история о том, как телевидение уничтожает интерес к чтению книг.  В начале 1950-х большинство американцев в глаза не видело телевизора, однако Брэдбери предсказал наступление новой эры свободы, достатка и развлечений, когда желание быть счастливым, помноженное на политкорректность, приведет к запрету книг.  «Телевизор говорит вам, о чем надлежит думать, и вколачивает это вам в голову. Он всегда и обязательно прав».', '1953', '6', '8', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `comment`
--

CREATE TABLE `comment` (
  `id` int UNSIGNED NOT NULL,
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `user_id` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `book_id` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Структура таблицы `genre`
--

CREATE TABLE `genre` (
  `id` int UNSIGNED NOT NULL,
  `title` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `genre`
--

INSERT INTO `genre` (`id`, `title`) VALUES
(1, 'Фэнтези'),
(2, 'Хоррор'),
(3, 'Драма'),
(4, 'Боевик'),
(5, 'Триллер'),
(6, 'Детектив'),
(7, 'Мистика'),
(8, 'Фантастика'),
(9, 'Приключения'),
(10, 'Художественный вымысел');

-- --------------------------------------------------------

--
-- Структура таблицы `rating`
--

CREATE TABLE `rating` (
  `id` int UNSIGNED NOT NULL,
  `user_id` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `book_id` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `value` int(10) UNSIGNED ZEROFILL NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int UNSIGNED NOT NULL,
  `surname` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `name` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `patronymic` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `login` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'defaut-profile-picture.jpg'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_genre_book` (`genre_id`),
  ADD KEY `FK_author_book` (`author_id`);

--
-- Индексы таблицы `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_book_comment` (`book_id`),
  ADD KEY `FK_user_comment` (`user_id`);

--
-- Индексы таблицы `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_book_rating` (`book_id`),
  ADD KEY `FK_user_rating` (`user_id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `author`
--
ALTER TABLE `author`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `book`
--
ALTER TABLE `book`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `genre`
--
ALTER TABLE `genre`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
