import React, { useState, useEffect } from "react";
let axios = require("axios");

let websites = require("./sites");



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
  const [sites, setSites] = useState([])
  console.log(sites)
  useEffect(() => {

    for (let website of websites) {
    
      axios
        .get(`https://api.github.com/repos/gramsco/${website.github_name}`)
        .then((res) => {
          website.github_infos = res.data
          axios
            .get(`https://api.github.com/repos/gramsco/${website.github_name}/commits`)
            .then(res => {
              website.github_commits = res.data
              let to_push = sites.concat(website)
              setSites(to_push)
            })
            .catch(err => console.log(err))
          
        })
        .catch(err => console.log(err))


    }
  },[])
  

  

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
              <div>Last updated : {e.github_infos.updated_at}</div>
              <div>Commits :  {e.github_commits.length}</div>
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
