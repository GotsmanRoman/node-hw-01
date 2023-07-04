const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  const text = await fs.readFile(contactsPath);
  return JSON.parse(text);
};

const getContactById = async (id) => {
  const contactId = String(id);
  const allContacts = await listContacts();
  const oneContact = allContacts.find((item) => item.id === contactId);
  return oneContact || null;
};
const addContact = async (data) => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 1));
  return newContact;
};
const removeContact = async (id) => {
  const contactId = String(id);
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) return null;
  const [result] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 1));
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
