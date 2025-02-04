/* jshint browser:true */
/* global define */
define(["./uistate",
        "../lib/codemirror/lib/codemirror",
        "../utl/maps", "../utl/gaga",
        "../lib/codemirror/addon/edit/closebrackets",
        "../lib/codemirror/addon/edit/matchbrackets",
        "../lib/codemirror/addon/display/placeholder",
        "../lib/codemirror/addon/dialog/dialog",
        "../lib/codemirror/addon/search/searchcursor",
        "../lib/codemirror/addon/search/search",
        "../lib/codemirror/addon/selection/active-line",
        "../lib/codemirror/mode/mscgen/mscgen",
        "../lib/codemirror/mode/javascript/javascript"
        ],
        function(uistate, codemirror, map, gaga) {
    "use strict";

    var gGaKeyCount = 0;
    var gCodeMirror = {};

    function init (pElement){
        gCodeMirror = codemirror.fromTextArea(pElement, {
            lineNumbers       : true,
            autoCloseBrackets : true,
            autofocus         : true,
            matchBrackets     : true,
            styleActiveLine   : true,
            theme             : "blackboard",
            mode              : "xu",
            placeholder       : "Type your text. Or drag a file to this area....",
            lineWrapping      : false
        });
    }

    function summedLength (pArray){
        return pArray.reduce(
            function(pSum, pCur){
                return pSum + pCur.length;
            },
            0
        );
    }

    function isBigChange(pChange){
        return Math.max(summedLength(pChange.text), summedLength(pChange.removed)) > 1;
    }

    function setupEditorEvents(){
        gCodeMirror.on ("change", function(pUnused, pChange) {
            uistate.onInputChanged(isBigChange(pChange));
            if (gGaKeyCount > 17) {
                gGaKeyCount = 0;
                gaga.g('send', 'event', '17 characters typed', uistate.getLanguage());
            } else {
                gGaKeyCount++;
            }
        });

        gCodeMirror.on ("drop", function(pUnused, pEvent) {
            /* if there is a file in the drop event clear the textarea,
             * otherwise do default handling for drop events (whatever it is)
             */
            if (pEvent.dataTransfer.files.length > 0) {
                uistate.setLanguage(map.classifyExtension(pEvent.dataTransfer.files[0].name), false);
                uistate.setSource("");
                gaga.g('send', 'event', 'drop', uistate.getLanguage());
            }
        });
    }

    return {
        init: function(pElement) {
            init(pElement);
            uistate.init(gCodeMirror);
            setupEditorEvents();

        }
    };
});
/*
 This file is part of mscgen_js.

 mscgen_js is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 mscgen_js is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with mscgen_js.  If not, see <http://www.gnu.org/licenses/>.
 */
