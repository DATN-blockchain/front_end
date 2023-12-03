'use client';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import './globals.css';
type Props = {
  children: React.ReactNode;
};

import { Providers } from '@/providers';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { SWRConfig, useSWRConfig } from 'swr';
import StyledComponentsRegistry from '../lib/AntdRegistry';

library.add(fas);

export default function RootLayout({ children }: Props) {
  const { mutate } = useSWRConfig();
  useEffect(() => {
    AOS.init();
  });

  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateOnMount: false,
      }}
    >
      <Providers>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </Providers>
    </SWRConfig>
  );
}
