import React from 'react';
import '../styles/App.css';

interface StatsCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => (
    <div className="stats-card">
        <div className="stats-card-content">
            <div className="stats-card-icon">{icon}</div>
            <div className="stats-card-text">
                <p className="stats-card-title">{title}</p>
                <p className="stats-card-value">{value}</p>
            </div>
        </div>
    </div>
);