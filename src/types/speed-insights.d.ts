declare module '@vercel/speed-insights/next' {
    import React from 'react';

    interface SpeedInsightsProps {
        route?: string;
    }

    export const SpeedInsights: React.FC<SpeedInsightsProps>;
}
