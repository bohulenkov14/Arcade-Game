var MapConfig = function(rowsNum, colsNum, rowsSprites) {
  this.rowsNum = rowsNum;
  this.colsNum = colsNum;
  this.rowsSprites = rowsSprites;
};

var currentMapConfig = new MapConfig(8, 8, [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/stone-block.png',   // Row 4 of 3 of stone
                'images/stone-block.png',   // Row 5 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ]);