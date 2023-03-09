import Header from '@/components/Header';
import Layout from '@/components/Layout';
import React, {PropsWithChildren} from 'react';

const ClanDetail: React.FC<PropsWithChildren> = () => {
  return (
    <Layout>
      <Header title="Details" canGoBack />
    </Layout>
  );
};

export default ClanDetail;
