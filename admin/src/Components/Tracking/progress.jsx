import React from 'react';
import './progress.css';

const Progress = ({ status }) => {
    return (
        <>
            <div className="view2">
                <div className={`step ${status >= 1 ? 'active' : ''}`}>
                    <i className="fa-solid fa-box"></i>
                </div>
                <div className={`connector ${status >= 2 ? 'active' : ''}`}></div>
                <div className={`step ${status >= 2 ? 'active' : ''}`}>
                    <i className="fa-solid fa-bowl-food"></i>
                </div>
                <div className={`connector ${status >= 3 ? 'active' : ''}`}></div>
                <div className={`step ${status >= 3 ? 'active' : ''}`}>
                    <i className="fa-solid fa-utensils"></i>
                </div>
                <div className={`connector ${status >= 4 ? 'active' : ''}`}></div>
                <div className={`step ${status >= 4 ? 'active' : ''}`}>
                    <i className="fa-solid fa-check-to-slot"></i>
                </div>
            </div>
            <div className="view3">
                <div className="status">Ordered</div>
                <div className="status">Preparing</div>
                <div className="status">Ready</div>
                <div className="status">Picked Up</div>
            </div>
        </>
    );
};

export default Progress;
