import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useShowToast from './useShowToast';
import { useAxiosInstance } from '../../api/axios';
import useAuth from './useAuth';

const useGetUserProfile = () => {
  const [users, setUsers] = useState(null);
  const axiosInstance = useAxiosInstance()
  const [loading, setLoading] = useState(true);
  const { _id, username } = useAuth()
  const { query } = useParams();
  const showToast = useShowToast();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axiosInstance.get(`/users/${_id}`);
        const data = res.data;

        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        console.log(data);

        setUsers(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, [query, showToast]);

  return { loading, users };
};

export default useGetUserProfile;
