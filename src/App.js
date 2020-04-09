import React, { useState, useEffect } from "react";
import api from "./services/api"

import "./styles.css";

function App() {

  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(res => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const repo = await api.post('/repositories', {
      title: `repo ${Date.now()}`,
      url: `http://github.com/${Date.now()}`,
      techs: ["Node", "React", "React Native"],
    });

    setRepositories([ ...repositories, repo.data ]);
  }

  async function handleRemoveRepository(id) {
    const del = await api.delete(`/repositories/${id}`);

    if(del.status === 204){
      setRepositories(repositories.filter(repo => repo.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>{repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
