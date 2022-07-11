import React, { useState, useEffect } from 'react';
import { GET_ME } from '../utils/queries';
import{ REMOVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { useMutation, useQuery } from '@apollo/client';

