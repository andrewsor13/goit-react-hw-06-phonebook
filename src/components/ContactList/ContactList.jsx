import React from 'react';
import PropTypes from 'prop-types';
import ContactItem from '../ContactItem/ContactItem';
import styles from './ContactList.module.css';
import { useDispatch } from 'react-redux';

export default function ContactList({ contacts, filter, onDeleteContact }) {
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().startsWith(filter && filter.toLowerCase())
  );

  const dispatch = useDispatch();

  return (
    <ul className={styles.contact_list}>
      {filteredContacts.map(contact => (
        <li key={contact.id}>
          <ContactItem contact={contact} />
          <button
            className={styles.button}
            onClick={() => dispatch(onDeleteContact(contact.id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
