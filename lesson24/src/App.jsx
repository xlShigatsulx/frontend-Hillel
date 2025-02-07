import React from "react";

export class App extends React.Component {
  render() {
    const data = `{
  "name": "Luke Skywalker",
  "height": "172",
  "mass": "77",
  "hair_color": "blond",
  "skin_color": "fair",
  "eye_color": "blue",
  "birth_year": "19BBY",
  "gender": "male",
  "homeworld": "https://swapi.dev/api/planets/1/",
  "films": [
    "https://swapi.dev/api/films/1/",
    "https://swapi.dev/api/films/2/",
    "https://swapi.dev/api/films/3/",
    "https://swapi.dev/api/films/6/"
  ],
  "species": [],
  "vehicles": [
    "https://swapi.dev/api/vehicles/14/",
    "https://swapi.dev/api/vehicles/30/"
  ],
  "starships": [
    "https://swapi.dev/api/starships/12/",
    "https://swapi.dev/api/starships/22/"
  ],
  "created": "2014-12-09T13:50:51.644000Z",
  "edited": "2014-12-20T21:17:56.891000Z",
  "url": "https://swapi.dev/api/people/1/"
}`;
    return (
      <>
        <div className="container">
          <h1>SWAPI</h1>
          <div className="input-group mb-3">
            <span className="input-group-text">https://swapi.dev/api/</span>
            <input
              type="text"
              className="form-control"
              placeholder="people/1/"
            />
            <button className="btn btn-outline-secondary">Get info</button>
          </div>

          <div className="card">
            <div className="card-body">
              <span className="badge bg-secondary me-2">people</span>
              <span className="badge bg-secondary">1</span>
              <pre>{data}</pre>
            </div>
          </div>
        </div>
      </>
    );
  }
}
