import firebase from "firebase";
import Swal from 'sweetalert2';
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


if(document.getElementById("submit")){

    document.getElementById("submit").addEventListener("click", function (e) {
        e.preventDefault();
        var isbnValue = document.getElementById("inputCode").value;
        var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbnValue ;

        //Ajax call
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200) {
                var elx = JSON.parse(this.responseText);
                console.log('hello', elx.items[0].volumeInfo );

                for (var i = 0; i < elx.items[0].volumeInfo.authors.length; i++) {
                    var authors = elx.items[0].volumeInfo.authors[i];
                }
                if (elx.items[0].volumeInfo.hasOwnProperty('categories')) {
                    for (var i = 0; i < elx.items[0].volumeInfo.categories.length; i++) {
                        var argument = elx.items[0].volumeInfo.categories[i];
                    }
                }

                document.getElementById('titoloId').value = elx.items[0].volumeInfo.title;
                console.log(document.getElementById('titoloId').value + "AJAX");
                document.getElementById('sottotitoloId').value = "";

                document.getElementById('autoreId').value = authors;
/*                for (var i = 0; i < elx.items[0].volumeInfo.industryIdentifiers.length; i++) {
                    var isbnCodes = elx.items[0].volumeInfo.industryIdentifiers[i];
                    console.log(isbnCodes);
                    var isbnCodesHtml = document.getElementById("demo").innerHTML += "<td><br> <b>CODICE " + isbnCodes.type +"</b> </td>" + isbnCodes.identifier;
                }*/
                document.getElementById('codiceIsbnId').value = elx.items[0].volumeInfo.industryIdentifiers[1].identifier;
                document.getElementById('editoreId').value = elx.items[0].volumeInfo.publisher;
                document.getElementById('annoId').value =  elx.items[0].volumeInfo.publishedDate;
                document.getElementById("argomentoId").value = argument ;

            }
        };
        xhttp.open("GET", url);
        xhttp.send();
    });
} else {
}

if(document.getElementById("clear")) {
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
var insertIt = document.getElementById('insertBook');

insertIt.addEventListener('click', function () {
    let titoloIdDb = document.getElementById('titoloId').value;
    let sottotitoloIdDb = document.getElementById('sottotitoloId').value;
    let autoreIdDb = document.getElementById('autoreId').value;
    let codiceIsbnIdDb = document.getElementById('codiceIsbnId').value;
    let editoreIdDb = document.getElementById('editoreId').value;
    let collanaIdDb = document.getElementById('collanaId').value;
    let annoIdDb = document.getElementById('annoId').value;
    let fondoIdDb = document.getElementById('fondoId').value;
    let materiaIdDb = document.getElementById('materiaId').value;
    let argomentoIdDb = document.getElementById('argomentoId').value;

    if(titoloIdDb == ""){
        console.log(titoloIdDb + 'insert a value');
        var modalOpen = document.querySelector('.modal');
        var modalClose = document.querySelector('.modal-close');
            event.stopPropagation();
            modalOpen.classList.add('is-active');
        modalClose.addEventListener('click', function () {
            modalOpen.classList.remove('is-active');
        });
    } else {
        databaseFb.ref('library/' + codiceIsbnIdDb).set({
            titolo: titoloIdDb,
            sottotitolo: sottotitoloIdDb,
            autore: autoreIdDb,
            isbn: codiceIsbnIdDb,
            editore: editoreIdDb,
            collana: collanaIdDb,
            anno: annoIdDb,
            fondo: fondoIdDb,
            materia: materiaIdDb,
            argomento: argomentoIdDb
        }, function (error) {
            if (error) {
                Swal("Il libro non può essere salvato.", "error", error);

            } else {
                Swal("Libro inserito correttamente.", "", "success");
                document.getElementById('inputCode').value = '';
                document.getElementById('titoloId').value = '';
                document.getElementById('sottotitoloId').value = '';
                document.getElementById('autoreId').value = '';
                document.getElementById('codiceIsbnId').value = '';
                document.getElementById('editoreId').value = '';
                document.getElementById('collanaId').value = '';
                document.getElementById('annoId').value = '';
                document.getElementById('fondoId').value = '';
                document.getElementById('materiaId').value = '';
                document.getElementById('argomentoId').value = '';

            }
            
        });
    }
});

/**************************************************
 * Create Table firedata
 *************************************************/
const dbRefObj = firebase.database().ref().child('library');
dbRefObj.on('child_added', snap => {
    //Total Books stored.
    let totalBooks = 1;
    let i;
    for (i in snap) {
        if (snap.hasOwnProperty(i)) {
            totalBooks++;
        }
    }
    document.getElementById("totalBooksId").innerHTML = "Totale libri " + totalBooks;

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

    $('table').append("<tr><td>" + titoloResult + "</td><td>" + sottotitoloResult +
        "</td><td>" + autoreResult + "</td><td>" + isbnResult +
        "</td><td>" + editoreResult + "</td><td>" + collanaResult +
        "</td><td>" + annoResult + "</td><td>" + fondoResult +
        "</td><td>" + materiaResult + "</td><td>" + argomentoResult + "</td></tr>");

});


/**************************************************
 * RESET Library
 *************************************************/
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