const sampleData = require('./testData1.json')['documents'];

const newData = sampleData.map(s => {
  const n = {};
  n.cafeId = s.id;
  n.phone = s.phone;
  n.cafeName = s.place_name;
  n.address = s.road_address_name;
  n.latitude = s.x;
  n.longitude = s.y;
  n.open24Hour = 1;
  n.priceIceAmericano = 4100;
  n.enoughOutlets = 'NORMAL';
  return n;
});
console.log(newData);
