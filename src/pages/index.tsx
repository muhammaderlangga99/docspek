import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '../components/HomepageFeatures';
import { DotPattern } from '/components/ui/dot-pattern';
// import Heading from '@theme/Heading';

import styles from './index.module.css';
import { cn } from '/lib/utils';
import { Codesandbox } from 'lucide-react';

function DocHeroSection() {
  return (
    <div className="relative overflow-hidden font-intrument">
      {/* Container utama dengan padding atas-bawah */}
      {/* <div className=""></div> */}
      {<DotPattern
        className={`${cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        )} absolute left-1/2 top-0 -z-10 w-full h-full -translate-x-1/2 transform-gpu stroke-slate-300/20 dark:stroke-slate-700/20`}
      />}
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-24 text-center sm:py-32 lg:px-8">
        <ChangelogBanner />
        
        {/* 1. Judul Utama (Headline) */}
        <h1 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className='text-blue-800'>Cash</span><span className='text-green-800'>UP</span> Service API Documentation
        </h1>

        {/* 2. Sub-Headline */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300 md:text-xl">
          Integrasikan servis kami dengan mudah. Akses semua{' '}
          <strong className="font-medium text-gray-800 dark:text-gray-100">
            endpoint
          </strong>
          , lihat{' '}
          <strong className="font-medium text-gray-800 dark:text-gray-100">
            model data
          </strong>
          , dan mulai bangun dalam hitungan menit.
        </p>

        {/* 3. Tombol Call to Action (CTA) */}
        <div className="mt-10 flex items-center font-sans justify-center gap-2 flex-row">
          <Link
            href="/docs/getting-started" // Arahkan ke quickstart
            className="flex h-11 hover:no-underline items-center justify-center rounded-xl bg-green-700 px-6 text-base font-medium text-white shadow-sm hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
            Get Started
          </Link>
          <Link
            href="/" // Arahkan ke referensi API
            className="flex h-11 items-center justify-center border border-gray-300 px-6 text-base font-medium text-gray-800 focus:outline-none dark:border-gray-700 dark:text-gray-200">
            Sand Box <Codesandbox className='ml-2 size-5'/>
          </Link>
        </div>

       
      </div>
    </div>
  );
}

function ChangelogBanner() {
  return (
    <div className="relative sm:w-8/12 m-auto sm:h-8 hidden bg-white/10 backdrop-blur-sm dark:bg-gray-950/75 mb-8 sm:flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full px-4 text-center">
      
      {/* 1. Badge "Latest" */}
      <span className="rounded-full bg-sky-100 px-3 py-0.5 text-xs font-medium text-sky-800 dark:bg-sky-900 dark:text-sky-200">
        Latest
      </span>

      {/* 2. Teks Pengumuman */}
      <p className="text-sm items-center my-auto text-gray-800 dark:text-gray-200">
        API v2.1.0 is now live. We've added new webhook events.
      </p>

      {/* 3. Link "Badge" (CTA) */}
      <a
        href="/changelog" // Arahkan ke halaman changelog
        className="flex shrink-0 items-center text-sm font-medium text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300">
        Read the changelog
        <span className="ml-1.5">&rarr;</span>
      </a>
    </div>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      {/* <HomepageHeader /> */}
      <DocHeroSection />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
