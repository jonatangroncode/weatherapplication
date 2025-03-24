import React from "react";

const FavoriteList = ({ favorites, handleFavoriteSeach }) => {
  return (
    <article className="card">
      <h2>
        Dina favoriter : <hr />
        <ul>
          {favorites.map((fav) => (
            <li key={fav.id}>
              <button
                className="favoritebuttons"
                onClick={() => handleFavoriteSeach(fav.name)}
              >
                {fav.name}
              </button>
            </li>
          ))}
        </ul>
      </h2>
    </article>
  );
};

export default FavoriteList;
