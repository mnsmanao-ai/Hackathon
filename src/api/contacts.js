// src/api/contacts.js
import { apiFetch } from './apiFetch'

export function getContacts() {
    return apiFetch('https://jkgsgkgos8w0o4cwwoowg0go.lucieblr.com/contacts')
}

export function getContactById(id) {
    return apiFetch(`https://jkgsgkgos8w0o4cwwoowg0go.lucieblr.com/contacts/${id}`)
}

export function createContact(data) {
    return apiFetch('https://jkgsgkgos8w0o4cwwoowg0go.lucieblr.com/contacts', {
        method: 'POST',
        body: JSON.stringify(data)
    })
}