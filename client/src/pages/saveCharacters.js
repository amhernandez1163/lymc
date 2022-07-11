import React, { useState, useEffect } from 'react';
import { GET_ME } from '../utils/queries';
import{ REMOVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { useMutation, useQuery } from '@apollo/client';

const SaveBook = () => {
  const [removebook] = useMutation (REMOVE_BOOK)
  const {data} = useQuery (GET_ME)
  const userData = data?.me || {}
  console.log (data, userData)
  const userDataLenght = Object.keys(userData).length;

  const handleDeleteCharaters = async (characterId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    
    try {
      const {data} = await removeBook ({
        variables: {bookId: bookId}        
      })

      removeBookId(bookId);
    }catch (err) {
      console.error(err);
    }
  }; 
}