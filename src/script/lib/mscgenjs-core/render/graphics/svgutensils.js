/* jshint undef:true */
/* jshint unused:strict */
/* jshint browser:true */
/* jshint node:true */
/* jshint indent:4 */

/* istanbul ignore else */
if ( typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(["./constants", "./idmanager", "./svgelementfactory", "./svglowlevelfactory", "../../lib/lodash/lodash.custom"],
        function(C, id, fact, llfact, _) {
    /**
     * Some SVG specific calculations & workarounds
     */
    "use strict";

    var gDocument;
    var gSvgBBoxerId = id.get("bboxer");

    /* istanbul ignore next */
    function _createBBoxerSVG(pId){
        var lSvg = fact.createSVG(pId);
        gDocument.body.appendChild(lSvg);

        return lSvg;
    }

    /* istanbul ignore next */
    function getNativeBBox(pElement){
        /* getNativeBBoxWithCache */
        var lSvg = gDocument.getElementById(gSvgBBoxerId);
        lSvg = lSvg ? lSvg : _createBBoxerSVG (gSvgBBoxerId);

        lSvg.appendChild(pElement);
        var lRetval = pElement.getBBox();
        lSvg.removeChild(pElement);

        return lRetval;
    }

    /*
     * workaround for Opera browser quirk: if the dimensions
     * of an element are 0x0, Opera's getBBox() implementation
     * returns -Infinity (which is a kind of impractical value
     * to actually render, even for Opera)
     * To counter this, manually set the return value to 0x0
     * if height or width has a wacky value:
     */
    /* istanbul ignore next */
    function sanitizeBBox(pBBox){
        var INSANELYBIG = 100000;

        if (Math.abs(pBBox.height) > INSANELYBIG || Math.abs(pBBox.width) > INSANELYBIG ) {
            return {
                height : 0,
                width : 0,
                x : 0,
                y : 0
            };
        } else {
            return pBBox;
        }
    }

    function _getBBox(pElement) {
        /* istanbul ignore if */
        if ( typeof (pElement.getBBox) === 'function') {
            return sanitizeBBox(getNativeBBox(pElement));
        } else {
            return {
                height : 15,
                width : 15,
                x : 2,
                y : 2
            };
        }
    }

    function createTSpan(pLabel){
        var lTSpanLabel = gDocument.createElementNS(C.SVGNS, "tspan");
        lTSpanLabel.appendChild(gDocument.createTextNode(pLabel));

        return lTSpanLabel;
    }

    function createText(pLabel) {
        var lText = llfact.createElement( "text", { x: "0", y: "0" } );
        lText.appendChild(createTSpan(pLabel));
        return lText;
    }

    function _calculateTextHeight(){
        /* Uses a string with some characters that tend to stick out
         * above/ below the current line and an 'astral codepoint' to
         * determine the text height to use everywhere.
         *
         * The astral \uD83D\uDCA9 codepoint mainly makes a difference in gecko based
         * browsers. The string in readable form: ÁjyÎ9ƒ@💩
         */
        return _getBBox(createText("\u00C1jy\u00CE9\u0192@\uD83D\uDCA9")).height;
    }


    function _removeRenderedSVGFromElement(pElementId){
        id.setPrefix(pElementId);
        var lChildElement = gDocument.getElementById(id.get());
        if (!!lChildElement) {
            var lParentElement = gDocument.getElementById(pElementId);
            if (lParentElement) {
                lParentElement.removeChild(lChildElement);
            } else {
                gDocument.body.removeChild(lChildElement);
            }
        }
    }

    return {
        init: function(pDocument){
            gDocument = pDocument;
        },
        removeRenderedSVGFromElement : _removeRenderedSVGFromElement,

        /**
         * Returns the bounding box of the passed element.
         *
         * Note: to be able to calculate the actual bounding box of an element it has
         * to be in a DOM tree first. Hence this function temporarily creates the element,
         * calculates the bounding box and removes the temporarily created element again.
         *
         * @param {SVGElement} pElement - the element to calculate the bounding box for
         * @return {boundingbox} an object with properties height, width, x and y. If
         * the function cannot determine the bounding box  be determined, returns 15,15,2,2
         * as "reasonable default"
         */
        getBBox : _getBBox,

        /**
         * Returns the height in pixels necessary for rendering characters
         */
        calculateTextHeight: _.memoize(_calculateTextHeight),

        // webkit (at least in Safari Version 6.0.5 (8536.30.1) which is
        // distibuted with MacOSX 10.8.4) omits the xmlns: and xlink:
        // namespace prefixes in front of xlink and all hrefs respectively.
        // this function does a crude global replace to circumvent the
        // resulting problems. Problem happens for xhtml too
        webkitNamespaceBugWorkaround : function (pText){
            return pText.replace(/\ xlink=/g, " xmlns:xlink=", "g")
                        .replace(/\ href=/g, " xlink:href=", "g");
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
