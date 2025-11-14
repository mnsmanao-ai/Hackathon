const API_URL = 'https://jkgsgkgos8w0o4cwwoowg0go.lucieblr.com/agent/analyze';

/** Appelle l'agent IA */
export async function agentAnalyze(message) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
    });

    if (!response.ok) {
        throw new Error("Erreur API lors de l'appel à l'agent");
    }

    return await response.json();
}
