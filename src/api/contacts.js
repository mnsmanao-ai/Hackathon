// @/api/contacts.js

const API_URL = 'https://jkgsgkgos8w0o4cwwoowg0go.lucieblr.com/contacts';

/** Récupère la liste des contacts */
export async function getContacts() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erreur API lors de la récupération des contacts');
    return await response.json();
}

export async function getContactById(contactId) {
    const response = await fetch(`${API_URL}/${contactId}`);
    if (!response.ok) throw new Error(`Erreur API lors de la récupération du contact ID ${contactId}`);
    return await response.json();
}

/** Crée un nouveau contact dans l'API */
export async function createContact(contactData) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            // Assurez-vous que l'API accepte les données JSON
            'Content-Type': 'application/json',
            // Ajoutez ici d'autres headers si nécessaire (ex: Authorization)
        },
        // Envoie les données du nouveau contact au format JSON
        body: JSON.stringify(contactData),
    });

    // Si la réponse n'est pas OK (statut 2xx), lance une erreur
    if (!response.ok) {
        // Tente de récupérer un message d'erreur plus précis si l'API en retourne un
        let errorBody = await response.text();
        try {
            errorBody = JSON.parse(errorBody);
            throw new Error(errorBody.message || `Erreur API : ${response.status} ${response.statusText}`);
        } catch {
            throw new Error(`Erreur API : ${response.status} ${response.statusText}`);
        }
    }

    // L'API devrait retourner le nouveau contact créé (y compris son ID final)
    return await response.json();
}