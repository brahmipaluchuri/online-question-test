import React from 'react';
import Styles from './header.module.css'

export const Header=()=>{
    return (
        <>
        <div className={`bg-success text-white text-center ${Styles.header}`}>Online Test Question Paper</div>
        </>
    )
}