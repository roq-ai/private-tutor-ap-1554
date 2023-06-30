import axios from 'axios';
import queryString from 'query-string';
import { TutorInterface, TutorGetQueryInterface } from 'interfaces/tutor';
import { GetQueryInterface } from '../../interfaces';

export const getTutors = async (query?: TutorGetQueryInterface) => {
  const response = await axios.get(`/api/tutors${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTutor = async (tutor: TutorInterface) => {
  const response = await axios.post('/api/tutors', tutor);
  return response.data;
};

export const updateTutorById = async (id: string, tutor: TutorInterface) => {
  const response = await axios.put(`/api/tutors/${id}`, tutor);
  return response.data;
};

export const getTutorById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/tutors/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTutorById = async (id: string) => {
  const response = await axios.delete(`/api/tutors/${id}`);
  return response.data;
};
