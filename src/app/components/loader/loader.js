import React from 'react';
import style from './loader.module.css'

export const Loader=()=>{
    return (
        <>
        <div className={`${style.mask}`}></div>
        <img className={`${style.loaderimg}`} src='loading.gif' />
        </>
    )
}