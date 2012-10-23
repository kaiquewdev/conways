var vodevil = require('vodevil'),
    gl = require('./gl');

var WIDE = 5,
    SQUARE = 9632,
    SPACES = '    ';

var wide = WIDE,
    _grid = gl.grid( wide, wide ),
    grid = gl.filter( _grid, wide ),
    board = grid['lines'],
    _board = grid['lines'];

// Game methods
var randomLiveCell = function () {
    var line = Math.round( Math.random() * ( board.length - 1 ) ),
        cell = Math.round( Math.random() * ( board[0].length - 1 ) );

    board[ line ][ cell ]['live'] = true;
};
randomLiveCell();

for ( var start = 0, end = 10; start <= end; start++ ) {
    _board = vodevil.intersect(
        _board,
        function ( line, lid ) {
            return vodevil.intersect(
                line,
                function ( cell, cid ) {
                    var around = gl.aroundCell( 
                        _grid, 
                        [ lid, cid ], 
                        wide 
                    );    

                    around = vodevil.intersect(
                        around,
                        function ( line ) {
                            return vodevil.intersect(
                                line,
                                function ( _cell ) {
                                    return _cell;
                                }
                          ); 
                        }
                    );

                    //Apply rules
                    cell = gl.loneliness( around, cell );
                    cell = gl.overpopulation( around, cell );
                    cell = gl.neighborsAccurate( around, cell );
                    
                    if ( 'live' in gl.remainState( around, cell ) ) {
                        cell = gl.remainState( around, cell );    
                    }

                    return cell;
                }
            );
        }
    );

    // Change board chars
    board = vodevil.intersect(
        _board, 
        function ( line ) {
            return vodevil.intersect(
                line,
                function ( cell ) {
                    if ( cell['live'] ) {
                        return ' ' + String.fromCharCode( SQUARE ) + ' ';    
                    } else {
                        return SPACES;    
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
    console.log( '\n' );

    _grid = vodevil.intersect(
        _board,
        function ( line ) {
            return vodevil.intersect(
                line,
                function ( cell ) {
                    return cell;    
                }
            );    
        }
    );
}
