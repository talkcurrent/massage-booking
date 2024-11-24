"use client"

import React, { useContext } from 'react';
import { CommonContext } from '../index/CommonContext';

const useCreatables = (prop) => {
    const { authUser, creatables } = useContext(CommonContext);

    return { authUser, creatables };//arrays of auth user models
};

export default useCreatables;
