import { ScrollView } from 'react-native-gesture-handler';
import HeaderContainer from '../../components/ui/HeaderContainer';
import ScreenContainer from '../common/ScreenContainer';
import JobOfferDisplayer from '@/src/components/Offer/OfferDisplayer';
import { jobOffers } from '@/src/mock/jobOffers';
import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { getJobOffers } from '@/src/api/jobOffers';

const LikedScreen = () => {
  const [offers, setOffers] = useState(jobOffers);

  useFocusEffect(
    useCallback(() => {
      const loadOffers = async () => {
        const offersData = await getJobOffers();
        setOffers(offersData);
      };
      loadOffers();
      console.log(offers);
    }, [])
  );

  return (
    <ScreenContainer>
      <HeaderContainer title="Liked Screen" />
      <ScrollView>
        <JobOfferDisplayer context="candidate" offers={offers} />
      </ScrollView>
    </ScreenContainer>
  );
};

export default LikedScreen;
