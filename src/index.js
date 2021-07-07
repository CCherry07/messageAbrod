import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";

import "moment/locale/zh-cn";

import { Provider } from "react-redux";

import App from "./messageBroad/App";

ReactDOM.render(<App />, document.getElementById("root"));
