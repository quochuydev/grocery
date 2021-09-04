import React, { useState } from "react";
import Router from "next/router";

export default function SearchBox() {
  const [keyword, setKeyword] = useState("");

  const search = (q) => {
    Router.push(`/search/?q=${q}`);
  };

  return (
    <div className="search-box-container">
      <input
        type="text"
        name="q"
        id="search-box"
        placeholder="search here..."
        onChange={(e) => setKeyword(e.target.value)}
      />
      <a onClick={() => search(keyword)} className="fas fa-search" />
    </div>
  );
}
