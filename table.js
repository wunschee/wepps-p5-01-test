function Table(colNumX, colNumY) {
    // table init settings
    this.colNumX = colNumX;
    this.colNumY = colNumY;
    // cell init pos and settings
    this.x = 20;
    this.y = 20;
    this.size = 40;
    this.shift = 40;

    this.show = function() {
        fill(255);
        for (rowNum = 0; rowNum < this.colNumY; rowNum++) {
            for (colNum = 0; colNum < this.colNumX; colNum++) {
                square(colNum*this.shift+this.x, rowNum*this.shift+this.y, this.size);
            }
        }
    }
}