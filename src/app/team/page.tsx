'use client';

import { TeamCarouselComp } from '@/components/TeamCarouselComp';
import siteData from '@/data/site-data';

export default function Page() {
    return <TeamCarouselComp members={siteData.teamMembers || []} />;
}
