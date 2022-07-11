import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { fetchCharacter } from "../utils/utils";

export default function CharacterDetails() {
	const { id } = useParams();
	console.log("id from url", id);
	const [character, setCharacter] = useState();

	const getData = async () => {
		if (id) {
			fetchCharacter(id)
				.then(async (data) => {
					console.log("api data response ===", data);
					await setCharacter(data.data.results[0]);
				})
				.catch((err) => console.error(err));
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			{character ? (
				<div className="container large">
					<div className="hero_details-container">
						<img
							src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
							alt="Marvel Character"
						/>
						<div className="hero_details">
							<h4>Name</h4>
							<p>{character.name}</p>
							{character.description ? (
								<>
									<h4>Description</h4>
									<p>{character.description}</p>
								</>
							) : null}
							<div>
								<h4>Series</h4>
								<ul>
									{character.series.items.map((s) => (
										<li key={Math.random() * 1000}>{s.name}</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	);
}
