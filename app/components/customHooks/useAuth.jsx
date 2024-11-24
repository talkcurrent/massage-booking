"use client"
import React, { useContext } from 'react';
import { CommonContext } from '../index/CommonContext';

const useAuth = (props) => {
    const { authUser, authAdmin, gettingAuthUser } = useContext(CommonContext);
    return { authUser, authAdmin, gettingAuthUser };
};

export default useAuth;
