'use client';
import './globals.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'react-horizontal-scrolling-menu/dist/styles.css';
type Props = {
  children: React.ReactNode;
};

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { SWRConfig, useSWRConfig } from 'swr';
import instanceAxios from '@/api/instanceAxios';
import { getCookie } from 'cookies-next';
import Pusher from 'pusher-js';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '../lib/AntdRegistry';
import { Providers } from '@/providers';
import { App } from 'antd';

// export const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY || '', {
//   cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || '', // Replace with 'cluster' from dashboard
// });
library.add(fas);
// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  const { mutate } = useSWRConfig();
  useEffect(() => {
    AOS.init();
  });
  // useEffect(() => {
  //   const channel = pusher.subscribe('general-channel');
  //   channel.bind('general-channel', (data: any) => {
  //     console.log('Pusherrrrr', data);

  // try {
  // if (data?.type === 'MESSENGER') {
  //   mutate(`/messenger/${data?.sender_id}/list_messenger_detail`);
  // }
  // } catch (error) {
  //   console.log('Pusherrrrr', error);
  // }
  // });

  //   return () => {
  //     pusher.unsubscribe('general-channel');
  //   };
  // }, []);

  return (
    <SWRConfig
      value={{
        // refreshInterval: 3000,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateOnMount: false,
      }}
    >
      <Providers>
        {/* <App> */}
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        {/* </App> */}
      </Providers>
    </SWRConfig>
  );
}
