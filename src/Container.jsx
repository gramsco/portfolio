import React, { useState, useEffect } from "react";
let axios = require("axios");

let logos = {
  react: "fab fa-react",
  js: "fab fa-js-square",
  javascript: "fab fa-js-square",
  html: "fab fa-html5",
  node: "fab fa-node",
  css: "fab fa-css3-alt"
};

export default function Container() {
  let websites = require("./sites");
  console.log(websites);

  const [search, setSearch] = useState("");
  const [sites, setSites] = useState([]);
  const [counter, setCounter] = useState(0);
  const [loading,setLoading] = useState(false)
  console.log(sites);

  useEffect(() => {
    console.log(counter < websites.length);
    console.log("yolo");
    if (counter === websites.length) setLoading(false)
      if (counter < websites.length) {
      setLoading(true)
      axios
        .get(
          `https://api.github.com/repos/gramsco/${websites[counter].github_name}`
        )
        .then(res => {
          websites[counter].github_infos = res.data;
          axios
            .get(
              `https://api.github.com/repos/gramsco/${websites[counter].github_name}/commits`
            )
            .then(res => {
              websites[counter].github_commits = res.data;
              setSites([...sites, websites[counter]]);
              setCounter(counter + 1);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  }, [counter]);

  let filteredSites = sites.filter(filteur).sort(sortByDate);

  function filteur(e) {
    return (
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.year === Number(search) ||
      e.keywords.includes(search.toLowerCase())
    );
  }

  function sortByDate(a, b) {
    if (b.github_infos.updated_at < a.github_infos.updated_at) return -1;
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
      {loading && "loading..."}
      <div className="Container">
        {sites &&
          filteredSites.map(e => (
            <div className="Container__Element">
              <h1 key={e.id}>{e.name}</h1>
              <img
                className="Container__Element__Image"
                src={"/imgs/" + e.img}
                alt={e.name}
              />
              <div className="Github">
                <div>Last updated : {e.github_infos.updated_at}</div>
                <div>Commits : {e.github_commits.length}</div>
                <div>
                  See more{" "}
                  <a
                    href={`http://github.com/gramsco/${e.github_name}`}
                    target="_blank"
                  >
                    <i class="fab fa-github"></i>
                  </a>
                </div>
              </div>
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
