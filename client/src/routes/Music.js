import React from "react";
import Iframe from "react-iframe";

export default function Music() {
	return (
		<Iframe
			// style="border-radius:12px"
			src="https://open.spotify.com/embed/playlist/37i9dQZF1DX5pOp62IUR81?utm_source=generator"
			width="100%"
			height="80"
			frameBorder="0"
			allowfullscreen=""
			allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
		/>
	);
}
