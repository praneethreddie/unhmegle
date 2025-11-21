import React, { useState } from 'react';
import { Video, Users, Zap } from 'lucide-react';
import { ShaderAnimation } from './ui/ShaderAnimation';

const Landing = ({ onStart }) => {
    const [gender, setGender] = useState('male');

    const handleSubmit = (e) => {
        e.preventDefault();
        onStart({ gender });
    };

    return (
        <div className="landing-container">
            <ShaderAnimation />
            <div className="landing-content" style={{ zIndex: 10, position: 'relative' }}>
                <div className="brand-header">
                    <div className="logo-container">
                        <Video className="logo-icon" size={40} />
                    </div>
                    <h1 className="brand-title">unhmegle</h1>
                </div>

                <p className="brand-subtitle">Talk to strangers, make friends.</p>

                <div className="features-grid">
                    <div className="feature-item">
                        <Users size={20} />
                        <span>100k+ Users</span>
                    </div>
                    <div className="feature-item">
                        <Zap size={20} />
                        <span>Fast Connect</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="landing-form">
                    <div className="form-group">
                        <label>I am a</label>
                        <div className="gender-select">
                            <button
                                type="button"
                                className={`gender-btn ${gender === 'male' ? 'active' : ''}`}
                                onClick={() => setGender('male')}
                            >
                                Male
                            </button>
                            <button
                                type="button"
                                className={`gender-btn ${gender === 'female' ? 'active' : ''}`}
                                onClick={() => setGender('female')}
                            >
                                Female
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="start-btn">
                        Start Video Chat
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Landing;
