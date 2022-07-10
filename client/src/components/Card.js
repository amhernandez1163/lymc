import React from "react";
import { Link } from "react-router-dom";

export default function Card({ id, thumbnail, name }) {
	return (
		<Link to={`/${id}`}>
			<div>
				<img src={thumbnail} alt="thumbnail" />
				<h1>{name}</h1>
			</div>
		</Link>
	);
}
