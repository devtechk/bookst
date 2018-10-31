function insertBook(databaseFb, Swal) {
    document.getElementById('insertBookEl').addEventListener('click', function () {
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

        if (titoloIdDb == "") {
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
}

module.exports = insertBook;