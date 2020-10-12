import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    const time = Date.now().toString();

    const repository = {
      title: `New repository ${time}`,
      url: `http://repo${time}.url`,
      techs: ["Angular, React, Vue"]
    }

    const response = await api.post('repositories', repository);
    const { data } = response;

    setRepositories([ ...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex(repo => repo.id === id);

    const response = await api.delete(`repositories/${id}`);

    if (response.status === 204) {
      setRepositories(repositories.filter(repository => repository.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
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
