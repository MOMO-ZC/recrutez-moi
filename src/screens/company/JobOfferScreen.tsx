import { useThemeColor } from '@/src/hooks/useThemeColor';
import { MenuOption } from '@/src/types';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import HeaderContainer from '../../components/ui/HeaderContainer';
import ScreenContainer from '../common/ScreenContainer';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '@/src/hooks/useAuth';
import styled from 'styled-components';
import JobOfferDisplayer from '@/src/components/Offer/OfferDisplayer';
import { jobOffers } from '@/src/mock/jobOffers';
import { ScrollView } from 'react-native-gesture-handler';
import { getJobOffers } from '@/src/api/companies';

const OfferScreen = () => {
  const iconColor = useThemeColor({}, 'text');
  const { logout, id } = useAuth();

  const [offers, setOffers] = React.useState(jobOffers);

  useFocusEffect(
    useCallback(() => {
      const loadOffers = async () => {
        if (id) {
          const offersData = await getJobOffers(id);
          setOffers(offersData);
        }
      };

      loadOffers();
    }, [id])
  );

  const menuOptions: MenuOption[] = [
    {
      name: 'logout',
      icon: () => {
        return <Icon name="log-out" size={14} color={iconColor} />;
      },
      onPress: () => {
        logout();
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
        <JobOfferDisplayer offers={offers} />
      </ScrollView>
    </ScreenContainer>
  );
};

export default OfferScreen;

const Icon = styled(Feather)`
  margin-right: 8px;
`;
