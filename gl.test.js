var chai = require('chai'),
    expect = chai.expect,
    gl = require('./gl');

suite('Game of Life Suite of Tests', function () {
    suite('Items', function () {
        suite('cell', function () {
            test('initial cell', function () {
                expect( gl.cell() ).to.deep.equal({
                    live: false 
                });    
            });
        });

        suite('grid', function () {
            test('deep in slots', function () {
                var slots = [
                    { live: false },
                    { live: false },
                    { live: false },
                    { live: false },
                    { live: false },
                    { live: false },
                    { live: false },
                    { live: false },
                    { live: false },
                ];

                expect( gl.grid( 3, 3 ) ).to.deep.equal( slots );
            });

            test('length', function () {
                expect( gl.grid( 3, 3 ).length ).to.be.equal( 9 );    
            });
        });

        suite('rules', function () {
            test('cell loneliness true to die', function () {
                var around = [
                    { live: true }
                ];    

                var cell = { live: true };

                expect( gl.loneliness( around, cell ) ).to.deep.equal({
                    live: false   
                });

                cell = { live: false };
                
                expect( gl.loneliness( around, cell ) ).to.deep.equal({
                    live: false    
                });
            });

            test('cell loneliness false to die', function () {
                var around = [
                    { live: true },
                    { live: true },
                ];    

                var cell = { live: true };

                expect( gl.loneliness( around, cell ) ).to.deep.equal( cell );

                cell = { live: false };
                
                expect( gl.loneliness( around, cell ) ).to.deep.equal({
                    live: false    
                });
            });



            test('cell overpopulation true do die', function () {
                var around = [
                    { live: true },
                    { live: true },
                    { live: true },
                    { live: true },
                ];    

                var cell = { live: true };

                expect( gl.overpopulation( around, cell ) ).to.deep.equal({
                    live: false    
                });

                cell = { live: false };

                expect(
                    gl.overpopulation( around, cell ) 
                ).to.deep.equal( cell );
            });

            test('cell overpopulation false to die', function () {
                var around = [
                    { live: true },
                    { live: true },
                ];

                var cell = { live: true };

                expect( 
                    gl.overpopulation( around, cell ) 
                ).to.deep.equal( cell );

                cell = { live: false };

                expect(
                    gl.overpopulation( around, cell ) 
                ).to.deep.equal( cell );
            });

            test('cell neighbors accurate true to live', function () {
                var around = [
                    { live: true },
                    { live: true },
                    { live: true },
                ];    

                var cell = { live: false };

                expect(
                    gl.neighborsAccurate( around, cell )
                ).to.deep.equal({
                    live: true
                });

                cell = { live: true };

                expect(
                    gl.neighborsAccurate( around, cell )
                ).to.deep.equal( cell );
            });

            test('cell neighbors accurate false to live', function () {
                var around = [
                    { live: true },
                    { live: true },
                    { live: true },
                    { live: true },
                ];    

                var cell = { live: false };

                expect(
                    gl.neighborsAccurate( around, cell )
                ).to.deep.equal( cell );


                cell = { live: true };

                expect(
                    gl.neighborsAccurate( around, cell )
                ).to.deep.equal( cell );
            }); 

            test(
                'cell remain state, if two neighbors are live', 
                function () {
                    var around = [
                        { live: true },
                        { live: true }
                    ]; 

                    var cell = { live: true };

                    expect( 
                        gl.remainState( around, cell ) 
                    ).to.deep.equal( cell );

                    cell = { live: false };

                    expect( 
                        gl.remainState( around, cell ) 
                    ).to.deep.equal( cell );
                }
            );

            test(
                'cell remain state, if three neighbors are live', 
                function () {
                    var around = [
                        { live: true },
                        { live: true },
                        { live: true }
                    ]; 

                    var cell = { live: true };

                    expect( 
                        gl.remainState( around, cell ) 
                    ).to.deep.equal( cell );

                    cell = { live: false };

                    expect( 
                        gl.remainState( around, cell ) 
                    ).to.deep.equal( cell );
                }
            );

            test(
                'cell remain state, return a empty object' +
                'if not pass conditions',
                function () {
                    var around = [
                        { live: true },
                    ]; 

                    var cell = { live: true };

                    expect( 
                        gl.remainState( around, cell ) 
                    ).to.deep.equal( {} );

                    around = [
                        { live: true },
                        { live: true },
                        { live: true },
                        { live: true },
                        { live: true },
                    ];

                    expect(
                        gl.remainState( around, cell )
                    ).to.deep.equal( {} );
                }
            );
        });
    });    

    suite('Grid', function () {
        suite('slots around of selected', function () {
                
        });
    });
});