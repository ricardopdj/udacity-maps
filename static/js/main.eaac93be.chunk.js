(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{36:function(e,t,n){e.exports=n(71)},41:function(e,t,n){},45:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},46:function(e,t,n){},71:function(e,t,n){"use strict";n.r(t);var o=n(1),a=n.n(o),r=n(31),s=n.n(r),i=(n(41),n(43),n(6)),c=n(7),u=n(9),l=n(8),p=n(10),m=(n(45),n(46),n(75)),f=n(76),d=n(77),h=(o.Component,n(16)),g=n.n(h),v=window.google,w=function(e){function t(){var e,n;Object(i.a)(this,t);for(var o=arguments.length,a=new Array(o),r=0;r<o;r++)a[r]=arguments[r];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(a)))).state={mapLoaded:!1},n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"getGoogleMaps",value:function(){return this.googleMapsPromise||(this.googleMapsPromise=new Promise(function(e){window.resolveGoogleMapsPromise=function(){e(v),delete window.resolveGoogleMapsPromise};var t=document.createElement("script");t.src="https://maps.googleapis.com/maps/api/js?key=".concat("AIzaSyC0FRwnvyqQbxEaU8JOuCojITxhb3bxdCQ","&callback=resolveGoogleMapsPromise"),t.async=!0,document.body.appendChild(t)})),this.googleMapsPromise}},{key:"componentWillMount",value:function(){this.getGoogleMaps()}},{key:"componentDidMount",value:function(){var e=this;this.getGoogleMaps().then(function(t){e.createMap()})}},{key:"createMap",value:function(){var e=new window.google.maps.Map(document.getElementById("map"),{zoom:15,center:{lat:-30.0331,lng:-51.23}});this.props.onCreate(e)}},{key:"render",value:function(){return a.a.createElement("div",{id:"map",className:"h-100"})}}]),t}(o.Component),b=n(32),y=n(72),E=n(78),k=n(73),M=n(74),O=function(e){function t(){var e,n;Object(i.a)(this,t);for(var o=arguments.length,a=new Array(o),r=0;r<o;r++)a[r]=arguments[r];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(a)))).updateQuery=function(e){n.props.onSearch(e)},n.openInfo=function(e){n.props.onOpenInfo(e)},n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.props.venues;return a.a.createElement("aside",{className:"py-2"},a.a.createElement("h1",null,"Porto Alegre Sights"),a.a.createElement(y.a,{className:"my-4"},a.a.createElement(b.Debounce,{time:"400",handler:"onChange"},a.a.createElement(E.a,{placeholder:"Filtrar",onChange:function(t){return e.updateQuery(t.target.value)}}))),a.a.createElement(k.a,null,t.length>0&&t.map(function(t,n){return a.a.createElement(M.a,{tag:"button",key:n,onClick:function(){return e.openInfo(t)}},t.name)})))}}]),t}(o.Component),j="?client_id=".concat("PNOZ54G0GD1T1N4MKUX2CXIRA3BF34R3BAKVZPRHX40GBYLK","&client_secret=").concat("H0LKKTR4QAXQEL2V42D123TKQ31CZQE0LULYNLLNZEBIJTBS","&v=20180323&limit=").concat(10,"&ll=").concat("-30.0346471, -51.2176584","&section=").concat("sights"),C="".concat("https://api.foursquare.com/v2/venues/explore").concat(j),I=function(e){return fetch("https://api.foursquare.com/v2/venues/".concat(e,"/photos").concat(j)).then(function(e){return e.json()}).then(function(e){return e.response.photos.items[0]}).then(function(e){return"".concat(e.prefix,"/height100/").concat(e.suffix)}).catch(function(e){return console.log("Erro ao consultar a api do Foursquare",e)})},P=function(e){function t(){var e,n;Object(i.a)(this,t);for(var o=arguments.length,a=new Array(o),r=0;r<o;r++)a[r]=arguments[r];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(a)))).state={venues:[],visibleVenues:[],map:null,infoWindow:null,bounds:null,markers:[]},n.getPhoto=function(e){I(e).then(function(e){return console.log(e),e})},n.setMap=function(e){console.log("map created"),n.setState({map:e,infoWindow:new window.google.maps.InfoWindow,bounds:new window.google.maps.LatLngBounds});var t=n.createMarkers(e);n.setState({markers:t})},n.createMarkers=function(e){return n.state.venues.map(function(t){var o=new window.google.maps.Marker({position:t.location,map:e});return o.id=t.id,o.name=t.name,o.addListener("click",function(){return n.openInfo(t)}),n.fitBounds(o.position),o})},n.updateQuery=function(e){var t=new RegExp(g()(e),"i");n.setState({visibleVenues:n.state.venues.filter(function(e){return t.test(e.name)})}),n.state.infoWindow&&n.state.infoWindow.close(),n.state.markers.map(function(e){e.setVisible(t.test(e.name))})},n.openInfo=function(e){if(!e.img){var t=n.getPhoto(e.id);console.log(t)}n.state.infoWindow.setContent("<h4>".concat(e.name,"</h4><p>").concat(e.location.address,"</p>"));var o=n.state.markers.find(function(t){return t.id==e.id});n.state.infoWindow.open(n.state.map,o),n.state.map.panTo(o.getPosition()),o.setAnimation(window.google.maps.Animation.DROP)},n.fitBounds=function(e){n.state.bounds.extend(e),n.state.map.fitBounds(n.state.bounds)},n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch(C).then(function(e){return e.json()}).then(function(e){return e.response.groups[0].items}).then(function(e){return e.map(function(e){return e.venue})}).catch(function(e){return console.log("Erro ao consultar a api do Foursquare",e)}).then(function(t){e.setState({venues:t,visibleVenues:t}),console.log("venues loaded",t)})}},{key:"render",value:function(){return a.a.createElement(m.a,{fluid:!0,className:"h-100"},this.state.venues.length>0&&a.a.createElement(f.a,{className:"h-100"},a.a.createElement(d.a,{xs:"12",lg:"4"},a.a.createElement(O,{venues:this.state.visibleVenues,onSearch:this.updateQuery,onOpenInfo:this.openInfo})),a.a.createElement(d.a,{xs:"12",lg:"8"},a.a.createElement(w,{onCreate:this.setMap,venues:this.state.visibleVenues,query:this.state.query}))),this.state.venues.length>0&&a.a.createElement(f.a,null,a.a.createElement(d.a,null,a.a.createElement("div",{className:"text-center py-3"},"Made with ",a.a.createElement("a",{href:"https://developer.foursquare.com"},"Foursquare API")," and ",a.a.createElement("a",{href:"https://cloud.google.com/maps-platform"},"Google Maps API")))))}}]),t}(o.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(a.a.createElement(P,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[36,2,1]]]);
//# sourceMappingURL=main.eaac93be.chunk.js.map