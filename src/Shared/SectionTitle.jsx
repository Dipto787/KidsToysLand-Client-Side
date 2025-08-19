import React from 'react';

const SectionTitle = ({ title, subtitle }) => {
    return (
        <div className="text-center max-w-2xl mx-auto my-10">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 relative inline-block">
                {title}
                <span className="absolute left-1/2 -bottom-1 w-16 h-1 bg-blue-500 rounded transform -translate-x-1/2"></span>
            </h2>
            <p className="text-gray-600 mt-4 text-base md:text-lg">
                {subtitle}
            </p>
        </div>
    );
};

export default SectionTitle;