export async function getContacts() {
    const response = await fetch('http://localhost:3307/contacts');
    if (!response.ok) throw new Error('Erreur API');
    return await response.json();
}
