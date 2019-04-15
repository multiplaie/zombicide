import {Streetmap} from "./components/Streetmap";
import React from 'react';
import {render} from 'react-dom';
import style from "./assets/main.scss";

render(
	<Streetmap />,
	document.getElementById('root')
);
