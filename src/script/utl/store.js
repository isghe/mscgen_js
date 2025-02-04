/* jshint browser:true */
/* jshint node:true */

/* istanbul ignore else */
if ( typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([], function() {
    "use strict";

    var STORAGE_KEY = "state";

    function localStorageOK (){
        return (typeof localStorage !== 'undefined');
    }

    function getState(){
        if (localStorageOK()){
            try {
                return JSON.parse(localStorage.getItem(STORAGE_KEY));
            } catch (e){
                // silently swallow
            }
        }
        return null;
    }

    function save(pState){
        if (localStorageOK()){
            localStorage.setItem(STORAGE_KEY,
                                 JSON.stringify({
                                    language: pState.getLanguage(),
                                    source: pState.getSource(),
                                    autorender: pState.getAutoRender(),
                                    debug: pState.getDebug()
                                })
            );
        }
    }

    function load(pState){
        var lState = getState();
        if (lState){
            pState.setLanguage(lState.language);
            pState.setSource(lState.source);
            pState.setAutoRender(lState.autorender);
            pState.setDebug(lState.debug);
        }
    }

    return {
        save: save,
        load: load
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
