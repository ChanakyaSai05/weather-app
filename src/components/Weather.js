import React from "react";

function Weather({ datalist }) {
  return (
    <div>
      <img
        src={`http://openweathermap.org/img/wn/${datalist?.weather[0].icon}@4x.png`}
      />
    </div>
  );
}

export default Weather;
