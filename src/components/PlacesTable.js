import React from "react";
import "../css/PlaceTable.css";

const PlacesTable = ({ places }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Place Name</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {places.length > 0 ? (
          places.map((place, index) => (
            <tr key={place.id}>
              <td>{index + 1}</td>
              <td>{place.name}</td>
              <td>
                {place.country}
                <img
                  src={`https://flagsapi.com/${place.countryCode}/flat/32.png`}
                  alt={place.country}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">Start searching</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default PlacesTable;
