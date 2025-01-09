import type { JobOffer, Skill as SkillType } from '@/src/types';
import { Image, Text, View } from 'react-native';
import styled from 'styled-components';
import Skill from '../ui/Skill';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedText } from '../ThemedText';
import { useEffect, useState } from 'react';

interface OfferProps {
  jobOffer: JobOffer;
}

const Offer = (props: OfferProps) => {
  const { jobOffer } = props;
  const {
    id,
    image,
    title,
    description,
    company,
    location,
    skills,
    salary,
    remote,
    date,
  } = jobOffer;

  return (
    <ScrollableContainer>
      <Illustration>
        {image && (
          <Image
            style={{ width: 260, height: 260, borderRadius: 32 }}
            source={image}
          />
        )}
      </Illustration>
      <TitleContainer>
        <ThemedText darkColor="222222" type="title">
          {title}
        </ThemedText>
      </TitleContainer>
      <SubtitleContainer>
        <ThemedText darkColor="222222" type="default">
          {company} | {location}
        </ThemedText>
        <ThemedText darkColor="222222" type="defaultSemiBold">
          {remote ? 'Remote' : 'On-site'} | {salary}€
        </ThemedText>
      </SubtitleContainer>
      <SkillsSection>
        <ThemedText darkColor="222222" type="subtitle">
          Skills
        </ThemedText>
        <SkillContainer>
          {skills.map((skill, index) => (
            <Skill key={index} skill={skill} />
          ))}
        </SkillContainer>
      </SkillsSection>
      <DescriptionContainer>
        <ThemedText darkColor="222222" type="subtitle">
          Description
        </ThemedText>
        <ThemedText darkColor="222222" type="default">
          {description}
        </ThemedText>
      </DescriptionContainer>
    </ScrollableContainer>
  );
};

export default Offer;

const ScrollableContainer = styled(ScrollView).attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 20, // Prevent cutoff at the bottom
  },
}))`
  flex: 1;
`;

const Illustration = styled(View)`
  margin-top: 120px;
  background-color: #ffffff90;
  width: 260px;
  height: 260px;
  align-self: center;
  border-radius: 32px;
`;

const TitleContainer = styled(View)`
  margin-top: 20px;
  margin-left: 48px;
  margin-bottom: 20px;
`;

const SubtitleContainer = styled(View)`
  margin-left: 48px;
`;

const SkillsSection = styled(View)`
  margin-top: 20px;
  margin-left: 48px;
`;

const SkillContainer = styled(View)`
  flex-direction: row;
  width: 300px;
  flex-wrap: wrap;
`;

const DescriptionContainer = styled(View)`
  margin-top: 20px;
  margin-left: 48px;
  margin-right: 48px;
  margin-bottom: 128px;
`;
