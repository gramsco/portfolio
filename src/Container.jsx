import React, { useState, useEffect } from "react";
let axios = require("axios");

//dictionnaire des logos 

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
              `https://api.github.com/repos/gramsco/${websites[counter].github_name}/stats/contributors`
            )
            .then(res => {
              res = res.data.filter((e) => e.author.login === "gramsco")[0].total
              console.log(res)
              websites[counter].github_commits = res;
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
      <div className="All_Header">
        <h1>Some projects of mine!</h1>
        <input
          placeholder="search by name, tech, year..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <span>
          {(loading && "Loading infos from github...") ||
            " " + sites.filter(filteur).length + " result(s)"}
        </span>
      </div>
      <div className="Container">
        {sites &&
          filteredSites.map(e => (
            <div className="Container__Element">
              <h2 className="Container__Element__Title" key={e.id}>
                {e.name}
              </h2>
              <img
                className="Container__Element__Image"
                src={"/imgs/" + e.img}
                alt={e.name}
              />
              <div className="Container__Element__Resume">
                {e.resume || e.github_infos.description}
              </div>

              <div className="Github">
                <div>Last updated : {e.github_infos.updated_at}</div>
                <div>My commits on this project : {e.github_commits}</div>
                <div>
                  <a
                    href={`http://github.com/gramsco/${e.github_name}`}
                    target="_blank"
                  >
                    See the code <i class="fab fa-github"></i>
                  </a>
                  {e.github_infos.homepage && (
                    <a
                      href={`http://github.com/gramsco/${e.github_infos.homepage}`}
                      target="_blank"
                    >
                      {" "}
                      See the result <i class="fas fa-grimace"></i>
                    </a>
                  )}
                </div>
              </div>
              <div className="Container__Element__Stacks">
                {e.techs.map((e, i) => (
                  <span style={{ fontSize: "20px" }}>
                    {!logos[e] && e}
                    <i class={logos[e]}></i>
                  </span>
                ))}
              </div>
              {/* <div className="Container__Border__Bottom__Container"> */}
                <div className="Container__Border__Bottom"></div>
              {/* </div> */}
            </div>
          ))}
      </div>
    </div>
  );
}
