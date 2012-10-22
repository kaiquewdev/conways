var Gl = exports;

var vodevil = require('vodevil');

Gl.cell = function () {
    return { live: false };    
};

Gl.grid = function ( lines, cols ) {

    var grid = new Array( lines * cols );

    // Insert cells in undefined slots
    grid = vodevil.intersect( 
        grid, 
        function ( slot ) {
            return Gl.cell();
        }
    );
    
    return grid;
};

Gl.loneliness = function ( neighbors, cell ) {
    neighbors = vodevil.intersect( 
        neighbors, 
        function ( neighbor ) {
            if ( neighbor['live'] ) {
                return neighbor;    
            }    
        }
    ); 

    if ( cell['live'] && neighbors.length < 2 ) {
        cell['live'] = !cell['live'];
    }

    return cell;
};

Gl.overpopulation = function ( neighbors, cell ) {
    neighbors = vodevil.intersect(
        neighbors,
        function ( neighbor ) {
            if ( neighbor['live'] ) {
                return neighbor;    
            }
        }
    );    

    if ( cell['live'] && neighbors.length > 3 ) {
        cell['live'] = !cell['live'];
    }

    return cell;
};

Gl.neighborsAccurate = function ( neighbors, cell ) {
    neighbors = vodevil.intersect(
        neighbors,
        function ( neighbor ) {
            if ( neighbor['live'] ) {
                return neighbor;    
            }
        }
    );    

    if ( !cell['live'] && neighbors.length === 3 ) {
        cell['live'] = !cell['live'];    
    }

    return cell;
};

Gl.remainState = function ( neighbors, cell ) {
    neighbors = vodevil.intersect(
        neighbors,
        function ( neighbor ) {
            if ( neighbor['live'] ) {
                return neighbor['live']; 
            } 
        }
    );    

    if ( neighbors.length === 2 || neighbors.length === 3 ) {
        return cell;
    }

    return {};
};

Gl.filter = function ( grid, lines ) {
    var _grid = {};

    if ( ( grid && lines ) && lines <= grid.length ) {
        // Line manipulation
        var _lineCounter = 0,
            _gridLines = [],
            _lines = lines,
            line = [];

        // Get lines
        for ( ;; ) { 
            if ( _lineCounter === grid.length ) {
                break;    
            } else {
                line.push( grid[ _lineCounter ] );    
                _lines -= 1;

                if ( _lines === 0 ) {
                    _gridLines.push( line );
                    _lines = lines;
                    line = [];
                }
            }

            _lineCounter += 1;
        }

        var _colCounter = 0,
            _gridCols = [],
            _cols = _gridLines.length,
            col = [];

        // Get cols
        for ( ;; ) {
            if ( _colCounter === _gridLines[0].length ) {
                break;    
            } else {
                for ( var c = 0; c < _cols; c++ ) {
                    col.push( _gridLines[ c ][ _colCounter ] );    
                }

                _gridCols.push( col );
                col = [];
            } 

            _colCounter += 1;
        }

        _grid = { lines: _gridLines, cols: _gridCols };
    }

    return _grid;
};

Gl.aroundCell = function ( grid, index, lines ) {
    var vodevil = require('vodevil');

    var around = [],
        _grid = Gl.filter( grid, lines );    

    around = vodevil.intersect(
        grid,
        function ( slot, id ) {
            if (
                id !== index
            ) {
                return slot;    
            } 
        }
    );

    return around;
};
