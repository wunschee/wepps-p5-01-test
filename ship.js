function Ship(cellNr) {
    // ship init settings
    this.color = random(255);
    this.cellNr = cellNr;
    this.locations = [];
    this.hits = [];
    
    for (i = 0; i < this.cellNr; i++) {
        this.locations.push(0);
        this.hits.push('');
    }

    this.x = 25;
    this.y = 25;
    this.size = 30;
    this.shift = 40;

    this.show = function(locations) {
        fill(this.color);

        for (i = 0; i < this.cellNr; i++) {
            square(locations[i].charAt(0)*this.shift+this.x, locations[i].charAt(1)*this.shift+this.y, this.size);
        }
    }
}