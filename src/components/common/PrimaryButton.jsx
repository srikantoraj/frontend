import React from 'react';

const PrimaryButton = ({title}) => {
    return (
        <button className="bg-[#36A6C4] px-10 py-3 rounded-[15px] font-[600] tracking-[0.48px] font-inter absolute text-white" type={'submit'}>{title}</button>
    );
};

export default PrimaryButton;