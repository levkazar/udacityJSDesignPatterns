$(function() {
    /**
     * 
     * 
     * @class Model
     */
    class Model {
        /**
         * 
         * 
         * @static
         * @memberof Model
         */
        static init() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        }

        /**
         * 
         * 
         * @static
         * @param {any} obj 
         * @memberof Model
         */
        static add(obj) {
            let data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        }

        /**
         * 
         * 
         * @static
         * @return {string}
         * @memberof Model
         */
        static getAllNotes() {
            return JSON.parse(localStorage.notes);
        }
    };

    /**
     * 
     * 
     * @class Octopus
     */
    class Octopus {
        /**
         * 
         * 
         * @static
         * @param {any} noteStr 
         * @memberof Octopus
         */
        static addNewNote(noteStr) {
            Model.add({
                content: noteStr,
                timestamp: Date.now(),
            });
            View.render();
        }

        /**
         * 
         * 
         * @static
         * @return {array} 
         * @memberof Octopus
         */
        static getNotes() {
            return Model.getAllNotes();
        }

        /**
         * 
         * 
         * @static
         * @memberof Octopus
         */
        static init() {
            Model.init();
            View.init();
        }
    };


    /**
     * 
     * 
     * @class View
     */
    class View {
        /**
         * 
         * 
         * @static
         * @memberof View
         */
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

        /**
         * 
         * 
         * @static
         * @memberof View
         */
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
