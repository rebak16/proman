// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    _appendToElement: function (elementToExtend, textToAppend, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        for (let childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend.prependChild(childNode);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }

        return elementToExtend.lastChild;
    },
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        for (let board of boards) {
            var a = document.createElement("section");
            a.className = 'board';
            a.id = `boardid${board.id}`;
            var b = document.createElement("div");
            b.className = 'board-header';
            a.appendChild(b);
            var c = document.createElement("span");
            c.textContent = `${board.title}`;
            c.className = 'board-title';
            b.appendChild(c);
            document.querySelector('#boards').appendChild(a);
        }

    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        dataHandler.getBoards(function (boards) {
            for (let board of boards) {
                boardId = board.id;
                dataHandler.getCardsByBoardId(`${boardId}`, function (cards) {
                    dom.showCards(cards);
                })

            }
        });
    },

    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
        var d = document.createElement("div");
        d.className = 'board-columns';


        var e = document.createElement("div");
        e.className = 'board-column';
        var j = document.createElement("div");
        j.className = 'board-column-title';
        j.textContent = 'New';
        e.appendChild(j);


        var e1 = document.createElement("div");
        e1.className = 'board-column';
        var j1 = document.createElement("div");
        j1.className = 'board-column-title';
        j1.textContent = 'In Progress';
        e1.appendChild(j1);


        var e2 = document.createElement("div");
        e2.className = 'board-column';
        var j2 = document.createElement("div");
        j2.className = 'board-column-title';
        j2.textContent = 'Testing';
        e2.appendChild(j2);


        var e3 = document.createElement("div");
        e3.className = 'board-column';
        var j3 = document.createElement("div");
        j3.className = 'board-column-title';
        j3.textContent = 'Done';
        e3.appendChild(j3);


        var g = document.createElement("div");
        g.className = 'board-column-content';

        var g1 = document.createElement("div");
        g1.className = 'board-column-content';

        var g2 = document.createElement("div");
        g2.className = 'board-column-content';

        var g3 = document.createElement("div");
        g3.className = 'board-column-content';


        for (let card of cards) {
            var d = document.createElement("div");
            d.className = 'board-columns';


            if (card.status_id === 'new') {


                var h = document.createElement("div");
                h.className = 'card';
                var i = document.createElement("div");
                i.className = 'card-title';
                i.textContent = `${card.title}`;

                h.appendChild(i);
                g.appendChild(h);
                e.appendChild(g)


            }


            if (card.status_id === 'in progress') {


                var h1 = document.createElement("div");
                h1.className = 'card';
                var i1 = document.createElement("div");
                i1.className = 'card-title';
                i1.textContent = `${card.title}`;

                h1.appendChild(i1);
                g1.appendChild(h1);
                e1.appendChild(g1);


            }


            if (card.status_id === 'testing') {


                var h2 = document.createElement("div");
                h2.className = 'card';
                var i2 = document.createElement("div");
                i2.className = 'card-title';
                i2.textContent = `${card.title}`;

                h2.appendChild(i2);
                g2.appendChild(h2);
                e2.appendChild(g2);


            }


            if (card.status_id === 'done') {


                var h3 = document.createElement("div");
                h3.className = 'card';
                var i3 = document.createElement("div");
                i3.className = 'card-title';
                i3.textContent = `${card.title}`;

                h3.appendChild(i3);
                g3.appendChild(h3);
                e3.appendChild(g3);


            }


            d.appendChild(e);
            d.appendChild(e1);
            d.appendChild(e2);
            d.appendChild(e3);


            document.querySelector(`#boardid${card.board_id}`).appendChild(d);
        }
    }
    // here comes more features

};
