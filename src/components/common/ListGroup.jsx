import React from "react";

const ListGroup = (props) => {
  const { genres, onItemSelect } = props;
  return (
    <ul className="list-group">
      <li className="list-group-item active">All Genres</li>
      {genres.map((g) => (
        <li
          key={g._id}
          onClick={() => onItemSelect(g.name)}
          className="list-group-item"
        >
          {g.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
