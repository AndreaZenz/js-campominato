(function () {

    // Il computer deve generare 16 numeri casuali tra 1 e 100.
    // I numeri non possono essere duplicati.

    // In seguito deve chiedere all’utente (100 - 16) volte di inserire
    // un numero alla volta, sempre compreso tra 1 e 100.

    // L’utente non può inserire più volte lo stesso numero.

    // Se il numero è presente nella lista dei numeri generati, la partita termina, 
    // altrimenti si continua chiedendo all’utente un altro numero.

    // La partita termina quando il giocatore inserisce un numero “vietato” 
    // o raggiunge il numero massimo possibile di numeri consentiti.

    // Al termine della partita il software deve comunicare il punteggio, 
    // cioè il numero di volte che l’utente ha inserito un numero consentito.

    var minNumber = 1;
    var maxNumber = 100;
    var aiNumbersLength = 16;

    var aiNumbers = [];

    var userNumbers = []

    /*
    chiede all'utente di inserire un numero tramite prompt, x volte dove x è la differenza tra il valore "!maxNumber" e "aiNumbersLength".
    Controllare che il numero inserito sia un numero valido e che non sia ancora stato utilizzato e che non sia minore di "minNumber" o maggiore di "maxNumber"
    deve anche controllare che il numero non esista all'interno dell'array "aiNumbers"
    */
    function askUserNumbers() {
        var userLengthMax = maxNumber - minNumber - aiNumbersLength;

        var gameOver = false

        //finchè la length dei numeri inseriti è minore della length massima di numeri che l'utente può inserire continuo a chiedere all'utente di inserire un numero tramite prompt
        while (userNumbers.length <= userLengthMax && !gameOver) {
            var userInput = prompt("inserisci un numero tra " + minNumber + " e " + maxNumber + ". (" + userNumbers.length + ")");

            if(userInput == null) {
                gameOver = true;
            }

            if (userNumbers.length === userLengthMax) {
                gameOver = true

                alert("HAI VINTO!!!");
            }

            /*
            - se il valore inserito E' valido, ritorna TRUE
            - se il valore NON è valido e l'utente deve reinserirlo, ritorna FALSE
            - se il valore NON è valido perchè è una mina, ritorna "game over"
            */

            var inputIsValid = checkUserInput(userInput)

            if (!inputIsValid && inputIsValid !== "game over") {
                alert("numero inserito non valido");

            } else if (inputIsValid === "game over") {
                gameOver = true;

                alert("Hai perso dopo aver inserito " + userNumbers.length + " numeri.")

            } else {
                userNumbers.push(parseInt(userInput));

                console.log(userNumbers);
            }
        }
    }


    /*
    deve controllare se:
    - il valore è un numero reale
    - il numero NON è minore di minNumber
    - il numero NON è maggiore di maxNumber
    - il numero NON sia già stato usato dall'utente
    */
    function checkUserInput(inputValue) {
        var result = true
        var numberToCheck = parseInt(inputValue)

        if (isNaN(numberToCheck)) {
            return false;
        }

        if (numberToCheck < minNumber || numberToCheck > maxNumber) {
            return false;
        }

        if (userNumbers.indexOf(numberToCheck) > -1) {
            return false;
        }

        if (aiNumbers.indexOf(numberToCheck) > -1) {
            return "game over";
        }

        return result
    }

    /*
    crea i numeri iniziali del computer e si assicura anche che i numeri non siano doppi
    */
    function createAiNumbers() {
        while (aiNumbers.length < aiNumbersLength) {
            var numeroRandom = generateRandomNumbers(minNumber, maxNumber);

            if (aiNumbers.indexOf(numeroRandom) === -1) {
                aiNumbers.push(numeroRandom)
            }
        } 

        console.log(aiNumbers);
    }

    /*
    //funzione che genera numeri random tra il min ed il max passati come argomento
    */
    function generateRandomNumbers(min, max) {
        return Math.floor(Math.random() *(max - min)) + min
    }


    createAiNumbers();
    askUserNumbers();

})()