import React, { useState } from "react";

let sites = require("./sites");
let logos = {
  react: "fab fa-react",
  js: "fab fa-js-square",
  javascript:"fab fa-js-square",
  html: "fab fa-html5",
  node: "fab fa-node",
  css: "fab fa-css3-alt"
};

export default function Container() {

  const [search, setSearch] = useState("");

  function filteur(e) {
    return (
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.year === Number(search) ||
      e.keywords.includes(search.toLowerCase())
    );
  }

  return (
    <div className="All">
      <div>
        <h1>Many things!</h1>
        <input
          placeholder="search by name, tech, year..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <span>{" " + sites.filter(filteur).length + " result(s)"}</span>
      </div>
      <div className="Container">
        {sites &&
          sites.filter(filteur).map((e, i) => (
            <div className="Container__Element">
              <h1 key={i}>{e.name}</h1>
              <img
                className="Container__Element__Image"
                src={"/imgs/" + e.img}
                alt={e.name}
              />
              <hr />
              <div className="Container__Element__Stacks">
                {e.techs.map((e, i) => (
                  <span style={{ fontSize: "20px" }}>
                    {!logos[e] && e}
                    <i class={logos[e]}></i>
                  </span>
                ))}
              </div>
              <div>{e.resume}</div>
              <hr />
            </div>
          ))}
      </div>
    </div>
  );
}
