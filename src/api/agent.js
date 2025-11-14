const API_URL = 'https://jkgsgkgos8w0o4cwwoowg0go.lucieblr.com/agent/analyze';

export async function agentAnalyze(message) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: "fait l'analyze du prospect dont les données sont : " + String(message) })
    });

    if (!response.ok) throw new Error("Erreur API");

    return await response.json();
}
