$(document).ready(function () {
    document.getElementById("homeBody").style.display = "block";
    document.getElementById("logInBody").style.display = "none";
    document.getElementById("signUpBody").style.display = "none";
    document.getElementById("newWordBody").style.display = "none";
    document.getElementById("verbYes").style.display = "none";
    document.getElementById("seeWordsBody").style.display = "none";



    //ADD A NEW USER
    document.getElementById("signUp").addEventListener("click", newUser);
    //SHOWS THE FORM OF THE WORD
    function newUser() {
        document.getElementById("signUpBody").style.display = "block";
        document.getElementById("logInBody").style.display = "none";

    }
    document.getElementById("back").addEventListener("click", goSignIn);
    //SHOWS THE FORM OF NEW USER
    function goSignIn() {
        document.getElementById("signUpBody").style.display = "none";
        document.getElementById("logInBody").style.display = "block";

    }

    //SEE FORM TO ADD A NEW WORD
    document.getElementById("newWord").addEventListener("click", showFormNewWord);
    function showFormNewWord() {
        document.getElementById("seeWordsBody").style.display = "none";
        document.getElementById("newWordBody").style.display = "block";
    }

    //SHOW HOME
    document.getElementById("home").addEventListener("click", showHomeBody);
    function showHomeBody() {
        document.getElementById("seeWordsBody").style.display = "none";
        document.getElementById("newWordBody").style.display = "none";

    }

    //SEE WORDS FORM
    document.getElementById("seeWords").addEventListener("click", seeWordsBody);
    function seeWordsBody() {
        document.getElementById("seeWordsBody").style.display = "block";
        document.getElementById("newWordBody").style.display = "none";
        seeWords();
    }

    //FUNCTION TO SEE ALL THE WORDS
    function seeWords() {
        $.ajax({
            type: "POST",
            url: "../Model/index.php?action=bring",
            success: function (exist) {
                if (exist) {
                    data = JSON.parse(exist);
                    console.log(data);
                    let rows = ''
                    for (let i = 0; i < data.length; i++) {
                        rows += `
                        <tr>
                            <td>${data[i].WORD}</td>
                            <td>${data[i].PHONETIC}</td>
                            <td>${data[i].DESCRIPTION}</td>
                            <td>${data[i].TRANSLATION}</td>
                            <td>${data[i].PAST_TENSE}</td>
                            <td>${data[i].PAST_PARTICIPLE}</td>
                        </tr>
                        `;
                    }
                    document.getElementById("tableWords").innerHTML = rows;
                }
            }
        });
    }




    //FUNCTION TO LOG IN
    document.getElementById("logIn").addEventListener("click", logIn);
    function logIn() {
        const username = document.getElementById('usernameLI').value;
        const password = document.getElementById('passwordLI').value;
        form_data = new FormData();//Los objetos FormData permiten compilar un conjunto 
        form_data.append('usernameQ', username);//de pares clave/valor para enviar mediante XMLHttpRequest. 
        form_data.append('passwordQ', password);//y meto dentro las variables para llevarlo a la función
        $.ajax({
            url: "../Model/index.php?action=logIn",
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function (exist) {
                console.log(exist);
                if (exist != null) {
                    loggedUser();
                }
            }
        });
    }

    //JUST BLANK
    function loggedUser() {
        document.getElementById("signUpBody").style.display = "none";
        document.getElementById("logInBody").style.display = "none";
    }

    //IF THE USER WANTS TO ADD A NEW WORD 
    document.getElementById("addWord").addEventListener("click", findWord);
    //SHOWS THE FORM OF THE WORD
    function addNewWord() {
        const word = document.getElementById('word').value.toUpperCase();
        const phonetic = document.getElementById('phonetic').value.toUpperCase();
        const description = document.getElementById('description').value.toUpperCase();
        const translation = document.getElementById('translation').value.toUpperCase();
        const pasttense = document.getElementById('pasttense').value.toUpperCase();
        const pastparticiple = document.getElementById('pastparticiple').value.toUpperCase();
        const idUser = 1;

        form_data = new FormData();//Los objetos FormData permiten compilar un conjunto 
        form_data.append('wordQuery', word);//de pares clave/valor para enviar mediante XMLHttpRequest. 
        form_data.append('phoneticQuery', phonetic);//y meto dentro las variables para llevarlo a la función
        form_data.append('descriptionQuery', description);
        form_data.append('translationQuery', translation);
        form_data.append('pastTenseQuery', pasttense);
        form_data.append('pastParticipleQuery', pastparticiple);
        form_data.append('idUserQuery', idUser);
        $.ajax({
            url: "../Model/index.php?action=new",
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function () {
                alert("Word added!");
                document.getElementById('word').value = "";
                document.getElementById('phonetic').value = "";
                document.getElementById('description').value = "";
                document.getElementById('translation').value = "";
                document.getElementById('pasttense').value = "";
                document.getElementById('pastparticiple').value = "";
            }
        });

    }
    //CHECK THE WORD YOU WANT TO ADD
    function findWord() {
        const word = document.getElementById('word').value;
        if (word == "") {
            alert("You can not add a new word without writing first!")
        }
        else {
            form_data = new FormData();//Los objetos FormData permiten compilar un conjunto 
            form_data.append('wordQuery', word);//de pares clave/valor para enviar mediante XMLHttpRequest. 
            //y meto dentro las variables para llevarlo a la función
            $.ajax({
                url: "../Model/index.php?action=findWord",
                dataType: 'text',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: function (exist) {
                    if (exist != null) {
                        addNewWord();
                    }
                }
            });
        }
    }

    //IF THE WORD IT IS A VERB
    document.getElementById("verbyes1").addEventListener("click", verbYes1);
    //GIVES THE OPTION TO PUT THE PAST OF THE VERB
    function verbYes1() {
        document.getElementById("verbYes").style.display = "block";
    }

    //IF THE WORD IT ISNT A VERB
    document.getElementById("verbno1").addEventListener("click", verbNo1);
    //TAKES OFF THE OPTION TO PUT THE PAST OF THE VERB
    function verbNo1() {
        document.getElementById("verbYes").style.display = "none";
        document.getElementById("pasttense").value = "";
        document.getElementById("pastparticiple").value = "";
    }


    //IF THE USER WANTS TO CANCEL ANY FUNCTION
    document.getElementById("cancel").addEventListener("click", cancelFunctions);
    //SHOWS THE FORM OF THE WORD
    function cancelFunctions() {
        document.getElementById("homeBody").style.display = "block";
        document.getElementById("newWordBody").style.display = "none";
    }


});


