const api = "https://api.foursquare.com/v2/venues/explore?";
const clientId = 'PNOZ54G0GD1T1N4MKUX2CXIRA3BF34R3BAKVZPRHX40GBYLK';
const clientSecret = 'H0LKKTR4QAXQEL2V42D123TKQ31CZQE0LULYNLLNZEBIJTBS'
const limit = 10;
const ll = '-30.0346471, -51.2176584';
const section = 'food';

const fetchUrl = `${api}client_id=${clientId}&client_secret=${clientSecret}&v=20180323&limit=${limit}&ll=${ll}&section=${section}`;
console.log(fetchUrl);


export const getAll = () =>
  fetch(fetchUrl)
    .then(res => res.json())
    .then(data => data.response.groups[0].items)
    .then(res => {
      const venues = res.map(item => item.venue);
      return venues;
    })
    .catch(err => console.log("Erro ao consultar a api do Foursquare", err));

