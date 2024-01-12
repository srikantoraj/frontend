import React from 'react';
const SecondaryButton = ({title}) => {
    return (
        <button className="bg-gradient-to-r from-[#36A6C4] to-[#9110A8] px-12 py-3 rounded-xl font-[600] tracking-[0.48px] font-inter text-white">{title}</button>
    );
};

export default SecondaryButton;