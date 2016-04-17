class LngLat {
  constructor(private lng: number, private lat: number) {
    if (lng > 180 || lng < -180) throw new Error('Invalid longitude');
    if (lat > 90  || lat < -90)  throw new Error('Invalid latitude');
  }
  toArray() {
    return [ this.lng, this.lat ]
  }
}

class BadLngLat {
  constructor(private lng: number, private lat: number) {
  }
  toArray() {
    return [ this.lng, this.lat ]
  }
}

// var x : LngLat = { lng: 123, lat: 3123 };    // Type error
// var x : LngLat = new BadLngLat(12312, 3123); // Type error
// var x : LngLat = new LngLat(132, 1000);      // *Runtime* error
var x : LngLat = new LngLat(82, 80);
