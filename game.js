var vodevil = require('vodevil'),
    gl = require('./gl');

var SQUARE = 9604;

var grid = gl.filter( gl.grid( 5, 5 ), 5 ),
    board = grid['lines'];



board = vodevil.intersect(
    board, 
    function ( line ) {
        return vodevil.intersect(
            line,
            function ( cell ) {
                if ( cell['live'] ) {
                    return String.fromCharCode( SQUARE );    
                } else {
                    return '';    
                }
            }
        );
    }
);

var lines = vodevil.intersect(
    board,
    function ( line ) {
        return line.join('');    
    }
);

console.log( lines.join('\n') );
