import { Metadata } from 'next';
import siteData from '@/data/site-data';

export const metadata: Metadata = {
    title: siteData.personal.name,
    description: siteData.personal.title,
};
