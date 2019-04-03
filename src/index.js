import Button from 'react-bootstrap/Button';
import React from 'react';
import {hydrate} from 'react-dom';
import style from "./assets/index.scss";
import {Hud} from "./components/Hud";
import {Game} from "./components/Game";

hydrate(
	<React.Fragment>
		<Game/>
		<Hud/>
	</React.Fragment>
	, document.getElementById('root')
);


