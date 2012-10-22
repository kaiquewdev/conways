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
