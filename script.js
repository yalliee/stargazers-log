/**
 * Fetch and render starred repositories
 */

async function loadRepositories() {
  const container = document.getElementById('repositories-container');

  try {
    // Show loading message
    container.innerHTML = '<div class="loading">Loading repositories...</div>';

    // Fetch the events.json file
    const response = await fetch('events.json');

    if (!response.ok) {
      throw new Error(`Failed to load repositories: ${response.statusText}`);
    }

    const repositories = await response.json();

    // Render the repositories
    renderRepositories(repositories);
  } catch (error) {
    console.error('Error loading repositories:', error);
    container.innerHTML = `<div class="error">Error loading repositories: ${error.message}</div>`;
  }
}

/**
 * Render repositories as an HTML list
 * @param {Array} repositories - Array of repository objects
 */
function renderRepositories(repositories) {
  const container = document.getElementById('repositories-container');

  if (repositories.length === 0) {
    container.innerHTML = '<p>No repositories found.</p>';
    return;
  }

  const list = document.createElement('ul');
  list.className = 'repo-list';

  repositories.forEach((repo) => {
    const item = document.createElement('li');
    item.className = 'repo-item';

    const starredDate = new Date(repo.starred_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    item.innerHTML = `
      <div class="repo-header">
        <h2 class="repo-name">
          <a href="${repo.url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
          <span class="repo-owner">by ${repo.owner}</span>
        </h2>
        <span class="repo-stars">⭐ ${repo.stars.toLocaleString()}</span>
      </div>
      <p class="repo-description">${repo.description}</p>
      <div class="repo-footer">
        <span class="repo-language">${repo.language}</span>
        <span class="repo-date">Starred on ${starredDate}</span>
      </div>
    `;

    list.appendChild(item);
  });

  container.innerHTML = '';
  container.appendChild(list);
}

// Load repositories when the page loads
document.addEventListener('DOMContentLoaded', loadRepositories);
