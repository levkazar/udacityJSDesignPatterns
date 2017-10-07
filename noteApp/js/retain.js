$(function() {
    
    class Model {

        static init() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        }

        static add(obj) {
            let data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        }

        static getAllNotes() {
            return JSON.parse(localStorage.notes);
        }
    };

    class Octopus {

        static addNewNote(noteStr) {
            Model.add({
                content: noteStr,
                timestamp: Date.now(),
            });
            View.render();
        }

        static getNotes() {
            return Model.getAllNotes();
        }

        static init() {
            Model.init();
            View.init();
        }
    };

    class View {

        static init() {
            this.noteList = $('#notes');
            let newNoteForm = $('#new-note-form');
            let newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e) {
                Octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            View.render();
        }

        static render() {
            let htmlStr = '';
            Octopus.getNotes().forEach(function(note) {
                htmlStr += '<li class="note">'+
                        note.content+
                        ', '+
                        new Date(note.timestamp).toLocaleDateString()+
                    '</li>';
            });
            this.noteList.html( htmlStr );
        }
    };

    Octopus.init();
});
