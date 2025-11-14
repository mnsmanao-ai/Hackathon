const API_URL = 'https://jkgsgkgos8w0o4cwwoowg0go.lucieblr.com/agent/analyze';

/** Récupère la liste des contacts */
export async function agentAnalyze() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erreur API lors de l\'appelle de l\'agent');
    return await response.json();
}
