import { useThemeColor } from '@/src/hooks/useThemeColor';
import { MenuOption } from '@/src/types';
import { router } from 'expo-router';
import React from 'react';
import HeaderContainer from '../../components/ui/HeaderContainer';
import ScreenContainer from '../common/ScreenContainer';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '@/src/hooks/useAuth';
import styled from 'styled-components';
import JobOfferDisplayer from '@/src/components/Offer/OfferDisplayer';
import { jobOffers } from '@/src/mock/jobOffers';
import { ScrollView } from 'react-native-gesture-handler';

const OfferScreen = () => {
  const iconColor = useThemeColor({}, 'text');
  const { logout } = useAuth();

  const menuOptions: MenuOption[] = [
    {
      name: 'logout',
      icon: () => {
        return <Icon name="log-out" size={14} color={iconColor} />;
      },
      onPress: () => {
        logout();
        router.push('/(auth)');
      },
    },
  ];

  return (
    <ScreenContainer>
      <HeaderContainer
        title="Offer Screen"
        cantGoBack
        menu
        menuOptions={menuOptions}
      />
      <ScrollView>
        <JobOfferDisplayer offers={jobOffers} />
      </ScrollView>
    </ScreenContainer>
  );
};

export default OfferScreen;

const Icon = styled(Feather)`
  margin-right: 8px;
`;
