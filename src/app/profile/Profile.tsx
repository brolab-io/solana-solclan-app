import Header from '@/components/Header';
import Layout from '@/components/Layout';
import UserInfo from '@/components/UserInfo';
import { ScrollView, VStack } from 'native-base';
import React, { PropsWithChildren } from 'react';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

const bottomEdge: Edge[] = ['bottom'];

const userData = {
  avatar:
    'https://img.freepik.com/free-vector/gradient-liquid-abstract-background_23-2148916599.jpg?t=st=1678333832~exp=1678334432~hmac=f21042037b2f420a4a0622f622a7f471eadbb21578d453c4e5c44b9bc07bbf82',
  name: 'Tronginc',
  nick_name: '@tronginc',
  clan_number: 20,
  deposit: '14K',
  proposal: 120,
  description: 'Hello world I’m a Hot boyz, I’m from Viet Nam and love to invest on a good stuff',
};

const ProfileScreen: React.FC<PropsWithChildren> = () => {
  return (
    <Layout>
      <VStack h="100%" pb="24" backgroundColor="transparent">
        <Header title="My account" isIconTitle={false} />
        <ScrollView>
          <SafeAreaView edges={bottomEdge}>
            <UserInfo data={userData} />
          </SafeAreaView>
        </ScrollView>
      </VStack>
    </Layout>
  );
};

export default ProfileScreen;
