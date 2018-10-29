function getIsbn() {
    document.getElementById("submit").addEventListener("click", function (e) {
        e.preventDefault();
        var isbnValue = document.getElementById("inputCode").value;
        var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbnValue;

        //Ajax call
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                var elx = JSON.parse(this.responseText);
                console.log('hello', elx.items[0].volumeInfo);

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
                document.getElementById('annoId').value = elx.items[0].volumeInfo.publishedDate;
                document.getElementById("argomentoId").value = argument;

            }
        };
        xhttp.open("GET", url);
        xhttp.send();
    });
}

module.exports = getIsbn;