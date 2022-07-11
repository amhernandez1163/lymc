import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { fetchHero } from "../utils/utils";

export default function HeroDetails() {
  const { id } = useParams();

  console.log("id from url", id);

  const [hero, setHero] = useState();

  useEffect(() => {
    fetchHero(id)
      .then((data) => {
        console.log(data);
        setHero(data.data.results[0]);
      })
      .catch((err) => console.error(err));
  }, []);


  // Updated return statement to have more than empty return startemnt
  // react doesnt like empty returns, it had just a console log
  if (!hero) 
    return (
      <h1>Hero Not Found</h1>
    ); // If hero is null, undefined, or falsy, return
  console.log("hero", hero);

  return (
    <div className="container large">
      <div className="hero_details-container">
        <img
          src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
          alt="hero image full size"
        />
        <div className="hero_details">
          <h4>Name</h4>
          <p>{hero.name}</p>
          {hero.description ? (
            <>
              <h4>Description</h4>
              <p>{hero.description}</p>
            </>
          ) : null}
          <div>
            <h4>Series</h4>
            <ul>
              {hero.series.items.map((s) => (
                <li key={Math.random() * 1000}>{s.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
