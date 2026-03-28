import React from 'react';
import { COLORS, TYPOGRAPHY } from '@/lib/constants';

// Layout modular do Sistema de Gestão Vobi/Toggl style
export default function ManagementLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ background: COLORS.bgSecondary, minHeight: '100vh', fontFamily: TYPOGRAPHY.fontMain }}>
            <header style={{ background: COLORS.bgPrimary, borderBottom: `1px solid ${COLORS.border}`, padding: '1rem 2rem' }}>
                <h2 style={{ color: COLORS.textPrimary }}>Sistema de Gestão & Tempo</h2>
            </header>
            <main style={{ padding: '2rem' }}>
                {children}
            </main>
        </div>
    );
}
