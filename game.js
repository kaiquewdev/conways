var spawn = require('child_process').spawn,
    vodevil = require('vodevil'),
    gl = require('./gl');

var WIDE = 10,
    SQUARE = 9632,
    SPACES = '  ';

var wide = WIDE,
    _grid = gl.grid( wide, wide ),
    grid = gl.filter( _grid, wide ),
    board = grid['lines'],
    _board = grid['lines'];

var drawImages = function () { 
    _board[4][5]['live'] =

    _board[5][4]['live'] =
    _board[5][5]['live'] =
    _board[5][6]['live'] =

    _board[6][6]['live'] =


    true;
};

var loop = function ( fn ) {
    for ( ;; )
        fn();
};

var readGrid = function ( grid, board ) {
    return vodevil.intersect(
        board,
        function ( line ) {
            return vodevil.intersect(
                line,
                function ( cell ) {
                    return cell;    
                }
            );
        }
    );
};

var updateBoard = function ( grid, board, draw ) {
    return vodevil.intersect(
        board,
        function ( line, lid ) {
            return vodevil.intersect(
                line,
                function ( cell, cid ) {
                    var around = [],
                        _around = gl.aroundCell( 
                            grid, 
                            [ lid, cid ], 
                            wide 
                        );    

                    around = vodevil.intersect(
                        _around,
                        function ( line ) {
                            return vodevil.intersect(
                                line,
                                function ( _cell ) {
                                    return _cell;
                                }
                          ); 
                        }
                    )[0][0];

                    if ( !draw ) {
                        cell = gl.loneliness( around, cell );    
                        cell = gl.overpopulation( around, cell );
                        cell = gl.remainState( around, cell );    
                        cell = gl.neighborsAccurate( around, cell );    
                    }

                    return cell;
                }
            );
        }
    );    
};

var readBoard = function ( board ) {
    return vodevil.intersect(
        board, 
        function ( line ) {
            return vodevil.intersect(
                line,
                function ( cell ) {
                    if ( cell['live'] ) {
                        return String.fromCharCode( SQUARE ) + ' ';    
                    } else {
                        return SPACES;    
                    }
                }
            );
        }
    );
};

var putLines = function ( board ) {
    var lines = vodevil.intersect(
        board,
        function ( line ) {
            return line.join('');    
        }
    ); 

    console.log( lines.join('\n') );
};

var main = function ( draw ) {
    drawImages();

    _grid = readGrid( _grid, board ); 

    _board = updateBoard( _grid, _board, draw );

    // Change board chars
    board = readBoard( board );

    putLines( board );
    console.log( '\n' );
};

//main( true );
loop( main );
