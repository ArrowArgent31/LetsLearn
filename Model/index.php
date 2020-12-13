<?php
require("./connection.php");

$action = $_GET['action'];

if ($_SERVER['REQUEST_METHOD'] == 'POST' && $action == 'logIn') {
    $username = $_POST['usernameQ'];
    $password = $_POST['passwordQ'];
    $con = Connection();
    $sql = "SELECT * from users where username='" . $username . "' and password='" . $password . "';";
    $stmt = $con->prepare($sql);
    $result = $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $rows = json_encode($rows);
    echo $rows;
} else if ($_SERVER['REQUEST_METHOD'] == 'POST' && $action == 'bring') {
    $con = Connection();
    $sql = "SELECT * from learning order by WORD asc;";
    $stmt = $con->prepare($sql);
    $result = $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $rows = json_encode($rows);
    echo $rows;
} else if ($_SERVER['REQUEST_METHOD'] == 'POST' && $action == 'findWord') {
    $word = $_POST['wordQuery'];
    $con = Connection();
    $sql = "SELECT * from words WHERE word='" . $word . "';";
    $stmt = $con->prepare($sql);
    $result = $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $rows = json_encode($rows);
    echo $rows;
} else if ($_SERVER['REQUEST_METHOD'] == 'POST' && $action == 'new') {
    $word = $_POST['wordQuery'];
    $phonetic = $_POST['phoneticQuery'];
    $description = $_POST['descriptionQuery'];
    $translation = $_POST['translationQuery'];
    $past_tense = $_POST['pastTenseQuery'];
    $past_participle = $_POST['pastParticipleQuery'];
    $id_user = $_POST['idUserQuery'];

    $con = Connection();
    $sql = "INSERT into words (WORD,PHONETIC,DESCRIPTION,TRANSLATION,PAST_TENSE,PAST_PARTICIPLE,ID_USER) values ('" . $word . "','" . $phonetic . "', '" . $description . "', '" . $translation . "','" . $past_tense . "', '" . $past_participle . "', '" . $id_user . "');";
    $stmt = $con->prepare($sql);
    $result = $stmt->execute();
} else if ($_SERVER['REQUEST_METHOD'] == 'POST' && $action == 'alter') {
    $alter = $_POST['alterQuery'];
    $con = Connection();
    $sql = "ALTER TABLE learning ADD '" . $alter . "' varchar(255);";
    $stmt = $con->prepare($sql);
    $result = $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $rows = json_encode($rows);
    echo $rows;
}
