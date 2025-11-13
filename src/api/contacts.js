export async function getContacts() {
    const response = await fetch('https://jkgsgkgos8w0o4cwwoowg0go.lucieblr.com/contacts');
    if (!response.ok) throw new Error('Erreur API');
    return await response.json();
}
