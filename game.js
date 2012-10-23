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
    _board[0][0]['live'] =
    _board[0][1]['live'] =
    _board[1][0]['live'] =
    _board[1][1]['live'] =

    _board[3][0]['live'] =
    _board[3][1]['live'] =
    _board[4][0]['live'] =
    _board[4][1]['live'] =

    _board[9][9]['live'] =
    _board[9][8]['live'] =
    _board[9][7]['live'] =

    _board[9][4]['live'] =
    _board[9][3]['live'] =

    _board[8][6]['live'] =
    _board[7][4]['live'] =


    true;
};

var loop = function ( fn ) {
    for ( ;; )
        fn();
};

var main = function ( draw ) {
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

    drawImages();

    _board = vodevil.intersect(
        _board,
        function ( line, lid ) {
            return vodevil.intersect(
                line,
                function ( cell, cid ) {
                    var around = [],
                        _around = gl.aroundCell( 
                            _grid, 
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
                        if ( cell['live'] ) {
                            cell = gl.loneliness( around, cell );    
                            cell = gl.overpopulation( around, cell );
                            cell = gl.remainState( around, cell );    
                        } else {
                            cell = gl.neighborsAccurate( around, cell );    
                        }
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
                        return String.fromCharCode( SQUARE ) + ' ';    
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
};

//main( true );
loop( main );
