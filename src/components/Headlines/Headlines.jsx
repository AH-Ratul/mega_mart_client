import React from 'react';
import './headlines.css';

const Headlines = ({headlines}) => {
    return (
        <div className='relative overflow-hidden w-64'>
            <div className='headline-ticker inline-flex whitespace-nowrap'>
                {[...headlines, ...headlines].map ((headline, index) => (
                    <span key={index} className='inline-block pr-1 text-sm text-primary'>
                        {headline}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Headlines;