import type { JobOffer as JobOfferType } from '@/src/types';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import { ThemedText } from '../ThemedText';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import RoundedButton from '../ui/RoundedButton';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useJobOffer } from '@/src/hooks/useJobOffer';

interface JobOfferDisplayerProps {
  offers: JobOfferType[];
}

const JobOfferDisplayer = (props: JobOfferDisplayerProps) => {
  const { offers } = props;
  const itemColor = useThemeColor({}, 'ui-items');
  const iconColor = useThemeColor({}, 'text');
  const buttonColor = useThemeColor({}, 'ui-buttons');
  const openColor = useThemeColor({}, 'success');
  const closedColor = useThemeColor({}, 'danger');

  const router = useRouter();
  const { setJobOffer } = useJobOffer();

  const handleEdit = (offer?: JobOfferType) => {
    console.log(offer);
    if (offer) setJobOffer(offer);
    else setJobOffer();
    router.push('/(company)/(jobOffer)/edit-jobOffer');
  };

  return (
    <JobOfferContainer>
      {offers.map((offer) => {
        return (
            <JobOfferButton key={offer.id} onPress={() => console.log(offer)}>
          <JobOfferItem
            color={offer.status === 'open' ? openColor : closedColor}
          >
            <InfoContainer>
              <ThemedText type="defaultSemiBold">{offer.title}</ThemedText>
              <ThemedText type="default">
                {offer.status} | applicants : {offer.numberOfApplicants}{' '}
              </ThemedText>
              <ThemedText type="default">{offer.date}</ThemedText>
            </InfoContainer>
            <EditButtonContainer>
              <RoundedButton
                size={32}
                color={buttonColor}
                icon={<Feather name="edit-3" size={16} color={iconColor} />}
                onPress={() => handleEdit(offer)}
              />
            </EditButtonContainer>
          </JobOfferItem>
            </JobOfferButton>
        );
      })}
      <ButtonContainer>
        <RoundedButton
          size={40}
          color={itemColor}
          icon={<Feather name="plus" size={24} color={iconColor} />}
          onPress={() => handleEdit()}
        />
      </ButtonContainer>
    </JobOfferContainer>
  );
};

export default JobOfferDisplayer;

const ButtonContainer = styled(View)`
  margin-top: 16px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: {
    width: 0;
    height: 2;
  }
  shadow-opacity: 0.25;
  shadow-radius: 4;
  elevation: 5;
`;

const JobOfferContainer = styled(View)`
  margin-left: 12px;
  margin-right: 12px;
`;

const JobOfferItem = styled(View)<{ color: string }>`
  background-color: ${(props) => props.color};
  margin-top: 8px;
  padding: 8px;
  border-radius: 8px;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: {
    width: 0;
    height: 4;
  }
  shadow-opacity: 0.25;
  shadow-radius: 4;
  flex-direction: row;
  align-items: center;
`;

const JobOfferButton = styled(TouchableOpacity)`
`;

const InfoContainer = styled(View)``;

const EditButtonContainer = styled(View)`
  position: absolute;
  right: 16;
`;
