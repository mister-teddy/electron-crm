// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
import App from "./src/components/App.js";

Object.keys(React).forEach((key) => (window[key] = React[key]));
Object.keys(antd).forEach((key) => (window[key] = nojsx(antd[key])));
ReactDOM.render(App(), document.querySelector("#app"));
