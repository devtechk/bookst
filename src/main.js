import firebase from "firebase";
import Swal from 'sweetalert2';

var getIsbnModule = require('./modules/getIsbnGoogle');
var addBookModule = require('./modules/insertBook');


var $ = require("jquery");
var config = {
    apiKey: "AIzaSyBI3M7_7KJUmABvSccQN1U1A6cKyiKfvnA",
    authDomain: "bookst-cea15.firebaseapp.com",
    databaseURL: "https://bookst-cea15.firebaseio.com",
    projectId: "bookst-cea15",
    storageBucket: "bookst-cea15.appspot.com",
    messagingSenderId: "390972415499"
};
firebase.initializeApp(config);
/**************************************************
 * GET from ISBN
 *************************************************/


if (document.getElementById("submit")) {
    var getIsbn = new getIsbnModule();
    getIsbn;
} else {
}

if (document.getElementById("clear")) {
    document.getElementById("clear").addEventListener("click", function (ev) {
        document.getElementById("inputCode").value = '';
        document.getElementById("demo").innerHTML = "";
        document.getElementById("submit").disabled = false;

    });
} else {

}


/**************************************************
 * CONNECT to firebase
 *************************************************/
const databaseFb = firebase.database();

/**************************************************
 * INSERT to firebase
 *************************************************/
var insertIt = document.getElementById('insertBookEl');

if (insertIt) {
    var insertBook = new addBookModule();
        insertBook;
}

/**************************************************
 * Create Table firedata
 *************************************************/

const dbRefObj = firebase.database().ref().child('library');
//Total Books stored.
if (document.getElementById("totalBooksId")) {
    dbRefObj.on('value', function (snapshot) {
        let count = 0;
        snapshot.forEach(function () {
            count++;
        });

        document.getElementById("totalBooksId").innerHTML = 'Totale libri: ' + count;
    });
}
dbRefObj.on('child_added', snap => {
    //Total Books stored END.

    let titoloResult = snap.child('titolo').val();
    let sottotitoloResult = snap.child('sottotitolo').val();
    let materiaResult = snap.child('materia').val();
    let isbnResult = snap.child('isbn').val();
    let fondoResult = snap.child('fondo').val();
    let editoreResult = snap.child('editore').val();
    let collanaResult = snap.child('collana').val();
    let autoreResult = snap.child('autore').val();
    let argomentoResult = snap.child('argomento').val();
    let annoResult = snap.child('anno').val();

    $('#showLibrary').append("<tr><td>" + titoloResult + "</td><td>" + sottotitoloResult +
        "</td><td>" + autoreResult + "</td><td>" + isbnResult +
        "</td><td>" + editoreResult + "</td><td>" + collanaResult +
        "</td><td>" + annoResult + "</td><td>" + fondoResult +
        "</td><td>" + materiaResult + "</td><td>" + argomentoResult + "</td></tr>");

});

/**************************************************
 * RESET Library
 *************************************************/

if (document.getElementById('deleteAll')) {
    document.getElementById('deleteAll').addEventListener('click', function () {
        Swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this library!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            console.log(result.value);
            if (result.value) {
                databaseFb.ref('library/').remove();
                Swal(
                    'Deleted!',
                    'Your imaginary file has been deleted.',
                    'success'
                )
                // For more information about handling dismissals please visit
                // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal(
                    'Azione revocata',
                    'Libreria intatta',
                    'error'
                )
            }
        })
    });
}

/**************************************************
 * SEARCH Firebase
 *************************************************/

function searchInLibrary(field, toSearch) {
    dbRefObj.orderByChild(field).equalTo(toSearch).on("value", function (snapshot) {
        console.log(snapshot.val());
        snapshot.forEach(function (data) {
            console.log(data.key);
        });
    });
};


if (document.getElementById('searchBook')) {

    document.getElementById('searchBook').addEventListener('click', function () {
        document.getElementById("showResultSearch").innerHTML = "<tr></tr>";

        let inputSearchText = document.getElementById('inputSearchText').value;
        //let filterBy = document.querySelector("input[name=orderBy]:checked").value;
        let filteredBy = document.getElementById("selectFilter").options[document.getElementById("selectFilter").selectedIndex].value;

        document.getElementById("inputSearchText").placeholder = 'Cerca';


        dbRefObj.orderByChild(filteredBy).equalTo(inputSearchText).on("child_added", function (snapshot) {


            let hh = 0;
            let arrh = [];
            console.log('SNAPSHOT', typeof snapshot);

            dbRefObj.on('value', function (snapshot) {
                let countk = 0;
                Object.keys(snapshot).map(function(objectKey, index) {
                    var value = snapshot[objectKey];
                    hh = index;
                    countk++;

                });
                arrh.push(countk)
                console.log("countk", typeof arrh);

            });

            //Recupero dati da DataSnapshot
            let titoloResult = snapshot.child('titolo').val();
            let sottotitoloResult = snapshot.child('sottotitolo').val();
            let materiaResult = snapshot.child('materia').val();
            let isbnResult = snapshot.child('isbn').val();
            let fondoResult = snapshot.child('fondo').val();
            let editoreResult = snapshot.child('editore').val();
            let collanaResult = snapshot.child('collana').val();
            let autoreResult = snapshot.child('autore').val();
            let argomentoResult = snapshot.child('argomento').val();
            let annoResult = snapshot.child('anno').val();



                    $('#showResultSearch').append("<tr id=''><td>" + titoloResult + "</td><td>" + sottotitoloResult +
                        "</td><td>" + autoreResult + "</td><td>" + isbnResult +
                        "</td><td>" + editoreResult + "</td><td>" + collanaResult +
                        "</td><td>" + annoResult + "</td><td>" + fondoResult +
                        "</td><td>" + materiaResult + "</td><td>" + argomentoResult + "</td><td><a id='editBook' class='button is-info'>Modifica</a></td></tr>");


            //document.getElementById('editBook').addEventListener('click', function () {
              //  console.log(titoloResult);
            //});
        });

        dbRefObj.on('value', function (snapshot) {
            let count = 0;
            snapshot.forEach(function () {
                count++;
            });

            //document.getElementById("totalBooksFoundId").innerHTML = 'Totale libri trovati: ' + count;
            console.log('UPLOADED');
        });
    });
}

/**************************************************
 * BULMA animations
 *************************************************/

document.getElementById('selectPage').addEventListener('change', function () {
    var url = this.value; // get selected value
    if (url) { // require a URL
        window.location = url; // redirect
    }
    return false;
});