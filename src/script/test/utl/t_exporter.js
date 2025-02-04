/* jshint unused: false */
var assert = require("assert");
var xport = require("../../utl/exporter");

var gAST = {
    "meta": {
        "extendedOptions": false,
        "extendedArcTypes": false,
        "extendedFeatures": false
    },
    "entities": [
    {
        "name": "a",
        "label": "💩"
    },
    {
        "name": "b",
        "label": "序"
    },
    {
        "name": "c",
        "label": "💩"
    }
  ],
    "arcs": [
      [
      {
        "kind": "=>",
        "from": "a",
        "to": "b",
        "label": "things"
    },
      {
        "kind": "=>",
        "from": "c",
        "to": "b"
    }
    ]
  ]
};
var gSVG = '<svg>just a dummy thing</svg>';
var gMsc = 'msc{a[label="💩"],b[label="序"],c [label="💩"]; a => b[label="things"], c => b;}';

describe('ui/utl/exporter', function(){
    describe('#toVectorURI', function(){
        it('Should render an URI encoded svg', function(){
            assert.equal(xport.toVectorURI(gSVG),
                         "data:image/svg+xml;charset=utf-8,%3Csvg%3Ejust%20a%20dummy%20thing%3C%2Fsvg%3E");
        });

    });
    describe('#toHTMLSnippetURI', function(){
        it('should render an URI encoded html file with the passed chart embedded', function(){
            assert.equal(xport.toHTMLSnippetURI(gMsc, 'mscgen'),
            "data:text/plain;charset=utf-8,%3C!DOCTYPE%20html%3E%0A%3Chtml%3E%0A%20%20%3Chead%3E%0A%20%20%20%20%3Cmeta%20content%3D'text%2Fhtml%3Bcharset%3Dutf-8'%20http-equiv%3D'Content-Type'%3E%0A%20%20%20%20%3Cscript%20src%3D'https%3A%2F%2Fsverweij.github.io%2Fmscgen_js%2Fmscgen-inpage.js'%20defer%3E%0A%20%20%20%20%3C%2Fscript%3E%0A%20%20%3C%2Fhead%3E%0A%20%20%3Cbody%3E%0A%20%20%20%20%3Cpre%20class%3D'code%20mscgen%20mscgen_js'%20data-language%3D'mscgen'%3E%0Amsc%7Ba%5Blabel%3D%22%F0%9F%92%A9%22%5D%2Cb%5Blabel%3D%22%E5%BA%8F%22%5D%2Cc%20%5Blabel%3D%22%F0%9F%92%A9%22%5D%3B%20a%20%3D%3E%20b%5Blabel%3D%22things%22%5D%2C%20c%20%3D%3E%20b%3B%7D%0A%20%20%20%20%3C%2Fpre%3E%0A%20%20%3C%2Fbody%3E%0A%3C%2Fhtml%3E");
        });
    });
    describe('#toHTMLSnippetURI with link to interpreter', function(){
        it('should render an URI encoded html file with the passed chart embedded', function(){
            assert.equal(xport.toHTMLSnippetURI(gMsc, 'mscgen', true),
            "data:text/plain;charset=utf-8,%3C!DOCTYPE%20html%3E%0A%3Chtml%3E%0A%20%20%3Chead%3E%0A%20%20%20%20%3Cmeta%20content%3D'text%2Fhtml%3Bcharset%3Dutf-8'%20http-equiv%3D'Content-Type'%3E%0A%20%20%20%20%3Cscript%3E%0A%20%20%20%20%20%20var%20mscgen_js_config%20%3D%20%7B%0A%20%20%20%20%20%20%20%20clickable%3A%20true%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%3C%2Fscript%3E%0A%20%20%20%20%3Cscript%20src%3D'https%3A%2F%2Fsverweij.github.io%2Fmscgen_js%2Fmscgen-inpage.js'%20defer%3E%0A%20%20%20%20%3C%2Fscript%3E%0A%20%20%3C%2Fhead%3E%0A%20%20%3Cbody%3E%0A%20%20%20%20%3Cpre%20class%3D'code%20mscgen%20mscgen_js'%20data-language%3D'mscgen'%3E%0Amsc%7Ba%5Blabel%3D%22%F0%9F%92%A9%22%5D%2Cb%5Blabel%3D%22%E5%BA%8F%22%5D%2Cc%20%5Blabel%3D%22%F0%9F%92%A9%22%5D%3B%20a%20%3D%3E%20b%5Blabel%3D%22things%22%5D%2C%20c%20%3D%3E%20b%3B%7D%0A%20%20%20%20%3C%2Fpre%3E%0A%20%20%3C%2Fbody%3E%0A%3C%2Fhtml%3E");
        });
    });
    describe('#todotURI', function(){
        it('should render an URI encoded string representing a graphviz dot program', function(){
            assert.equal(xport.todotURI(gAST),
            "data:text/plain;charset=utf-8,%2F*%20Sequence%20chart%20represented%20as%20a%20directed%20graph%0A%20*%20in%20the%20graphviz%20dot%20language%20(http%3A%2F%2Fgraphviz.org%2F)%0A%20*%0A%20*%20Generated%20by%20mscgen_js%20(https%3A%2F%2Fsverweij.github.io%2Fmscgen_js)%0A%20*%2F%0A%0Agraph%20%7B%0A%20%20rankdir%3DLR%0A%20%20splines%3Dtrue%0A%20%20ordering%3Dout%0A%20%20fontname%3D%22Helvetica%22%0A%20%20fontsize%3D%229%22%0A%20%20node%20%5Bstyle%3Dfilled%2C%20fillcolor%3Dwhite%20fontname%3D%22Helvetica%22%2C%20fontsize%3D%229%22%20%5D%0A%20%20edge%20%5Bfontname%3D%22Helvetica%22%2C%20fontsize%3D%229%22%2C%20arrowhead%3Dvee%2C%20arrowtail%3Dvee%2C%20dir%3Dforward%5D%0A%0A%20%20%22a%22%20%5Blabel%3D%22%F0%9F%92%A9%22%5D%3B%0A%20%20%22b%22%20%5Blabel%3D%22%E5%BA%8F%22%5D%3B%0A%20%20%22c%22%20%5Blabel%3D%22%F0%9F%92%A9%22%5D%3B%0A%0A%20%20%22a%22%20--%20%22b%22%20%5Blabel%3D%22(1)%20things%22%2C%20arrowhead%3D%22normal%22%5D%0A%20%20%22c%22%20--%20%22b%22%20%5Blabel%3D%22(2)%22%2C%20arrowhead%3D%22normal%22%5D%0A%7D");
        });
    });
    describe('#toVanillaMscGenURI', function(){
        it('should render an URI encoded vanilla mscgen program', function(){
            assert.equal(xport.toVanillaMscGenURI(gAST),
            'data:text/plain;charset=utf-8,msc%20%7B%0A%20%20a%20%5Blabel%3D%22%F0%9F%92%A9%22%5D%2C%0A%20%20b%20%5Blabel%3D%22%E5%BA%8F%22%5D%2C%0A%20%20c%20%5Blabel%3D%22%F0%9F%92%A9%22%5D%3B%0A%0A%20%20a%20%3D%3E%20b%20%5Blabel%3D%22things%22%5D%2C%0A%20%20c%20%3D%3E%20b%3B%0A%7D');
        });
    });
    describe('#toDoxygenURI', function(){
        it('should render an URI encoded doxygen pastable program', function(){
            assert.equal(xport.toDoxygenURI(gAST),
            'data:text/plain;charset=utf-8,%20*%20%5Cmsc%0A%20*%20%20%20a%20%5Blabel%3D%22%F0%9F%92%A9%22%5D%2C%0A%20*%20%20%20b%20%5Blabel%3D%22%E5%BA%8F%22%5D%2C%0A%20*%20%20%20c%20%5Blabel%3D%22%F0%9F%92%A9%22%5D%3B%0A%20*%20%0A%20*%20%20%20a%20%3D%3E%20b%20%5Blabel%3D%22things%22%5D%2C%0A%20*%20%20%20c%20%3D%3E%20b%3B%0A%20*%20%5Cendmsc');
        });
    });
    describe('#toLocationString', function(){
        it ('with extra parameters', function(){
            var lLocation = {
                protocol: "http",
                host: "localhost",
                pathname: "mscgen_js/index.html",
                search: '?debug=false&donottrack=true'
            };
            assert.equal(xport.toLocationString(lLocation, gMsc, 'mscgen'),
                        'mscgen_js/index.html?lang=mscgen&donottrack=true&debug=false&msc=msc%7Ba%5Blabel%3D%22%F0%9F%92%A9%22%5D%2Cb%5Blabel%3D%22%E5%BA%8F%22%5D%2Cc%20%5Blabel%3D%22%F0%9F%92%A9%22%5D%3B%20a%20%3D%3E%20b%5Blabel%3D%22things%22%5D%2C%20c%20%3D%3E%20b%3B%7D');
        });
        it ('without extra parameters', function(){
            var lLocation = {
                protocol: "http",
                host: "localhost",
                pathname: "mscgen_js/index.html"
            };
            assert.equal(xport.toLocationString(lLocation, gMsc, 'mscgen'),
                        'mscgen_js/index.html?lang=mscgen&msc=msc%7Ba%5Blabel%3D%22%F0%9F%92%A9%22%5D%2Cb%5Blabel%3D%22%E5%BA%8F%22%5D%2Cc%20%5Blabel%3D%22%F0%9F%92%A9%22%5D%3B%20a%20%3D%3E%20b%5Blabel%3D%22things%22%5D%2C%20c%20%3D%3E%20b%3B%7D');


        });
        it ('with a source that is too big (> 4k)', function(){
            var lLocation = {
                protocol: "http",
                host: "localhost",
                pathname: "mscgen_js/index.html",
                search: '?debug=false&donottrack=true'
            };
            var l100wString = '# 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890';
            var lBig = l100wString;
            for (var i=0;i<40;i++){
                lBig += l100wString;
            }
            assert.equal(xport.toLocationString(lLocation, lBig, 'mscgen'),
                        'mscgen_js/index.html?lang=mscgen&donottrack=true&debug=false&msc=%23%20source%20too%20long%20for%20an%20URL');

        });
    });
});
