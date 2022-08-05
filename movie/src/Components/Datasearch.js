import React from 'react';
import { atom, selector } from "recoil";
export const Datasearch = atom({
    key:'search',
    default:false
})
export const GetDatasearch = atom({
    key:'datasearch',
    default:''
})