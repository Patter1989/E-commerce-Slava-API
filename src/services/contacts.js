import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;


  const contactsQuery = ContactsCollection.find({ ...filter, userId });

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.countDocuments({ ...filter, userId }), 
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async (payload, userId) => {
  const contact = await ContactsCollection.create({ ...payload, userId });
  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });

  return contact;
};


export const updateContact = async (
  contactId,
  payload,
  userId,
  options = {},
) => {
  const updatedContact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      ...options,
    },
  );

  if (!updatedContact) return null;

  return updatedContact;
};