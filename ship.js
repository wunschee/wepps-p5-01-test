function Ship() {
    this.locations = [0, 0, 0];
    this.hits = ['', '', ''];
    this.x = 25;
    this.y = 25;
    this.size = 30;
    this.shift = 40;

    this.show = function(locations) {
        fill(220);
        // square(25, 25, 30);
        square(locations[0].charAt(1)*this.shift+this.x, locations[0].charAt(0)*this.shift+this.y, this.size);
        square(locations[1].charAt(1)*this.shift+this.x, locations[1].charAt(0)*this.shift+this.y, this.size);
        square(locations[2].charAt(1)*this.shift+this.x, locations[2].charAt(0)*this.shift+this.y, this.size);
    }
}