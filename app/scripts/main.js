import ReactDOM from 'react-dom';
import routes from './routes';
let injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

ReactDOM.render(routes, document.getElementById('app'));
