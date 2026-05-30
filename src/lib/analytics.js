import ReactGA from "react-ga4";

ReactGA.initialize("G-431WYSNWJG");

ReactGA.send({
  hitType: "pageview",
  page: window.location.pathname + window.location.search,
});
