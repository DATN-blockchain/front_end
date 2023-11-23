'use client';
import { NextIntlClientProvider } from 'next-intl';
import { notFound, useRouter } from 'next/navigation';
import type { Metadata } from 'next';
import { Providers } from '@/providers';
import Header from '@/components/Header';
import { ReactNode, useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import { useAppSelector } from '@/hooks';
import { Skeleton, message } from 'antd';
import { useSWRConfig } from 'swr';
import Footer from '@/components/Footer';
import { getCookie } from 'cookies-next';
import dynamic from 'next/dynamic';
// export function generateStaticParams() {
//   return [{ locale: 'en' }, { locale: 'vi' }];
// }
// const Header = dynamic(() => import('@/components/Header'),{loading:()=><Skeleton/>});
// const Footer = dynamic(() => import('@/components/Footer'));

interface NotificationType {
  message: string;
  params: {
    marketplace_id: string;
    notification_type: string;
  };
  data: {
    created_at: number;
    unread: string;
    notification_id: string;
  };
}

export const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY || '', {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || '', // Replace with 'cluster' from dashboard
});

export default function LocaleLayout({ children }: { children: ReactNode }) {
  const currentUser = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const { mutate } = useSWRConfig();
  const cookie = getCookie('access_token');
  const route = useRouter();
  useEffect(() => {
    const channel = pusher.subscribe('general-channel');
    channel.bind(currentUser.user.id || '', (data: NotificationType) => {
      message.info('Bạn vừa có thông báo mới');
      if (data.params.notification_type === 'COMMENT_NOTIFICATION') {
        mutate(`comments/list?marketplace_id=${data.params.marketplace_id}`);
      }
      mutate('notifications/list');
      console.log(data);
    });

    return () => {
      pusher.unsubscribe('general-channel');
    };
  }, [currentUser, mutate]);
  useEffect(() => {
    if (!cookie) {
      route.push('/');
    }
    setLoading(false);
  }, [cookie, route]);
  return (
    <>
      {!loading && (
        <div>
          <Header />
          <div className="min-h-[600px]">{children}</div>
          <Footer />
        </div>
      )}
    </>
  );
}
