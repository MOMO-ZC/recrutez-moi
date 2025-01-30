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
    body,
    company,
    location,
    skills,
    minSalary,
    maxSalary,
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
        <ThemedText type="title">{title}</ThemedText>
      </TitleContainer>
      <SubtitleContainer>
        <ThemedText type="default">
          {company} | {location}
        </ThemedText>
        <ThemedText type="defaultSemiBold">
          {remote ? 'Remote' : 'On-site'} | {minSalary}€ - {maxSalary}€
        </ThemedText>
      </SubtitleContainer>
      <SkillsSection>
        <ThemedText type="subtitle">Skills</ThemedText>
        <SkillContainer>
          {skills.map((skill, index) => (
            <Skill key={index} skill={skill} />
          ))}
        </SkillContainer>
      </SkillsSection>
      <DescriptionContainer>
        <ThemedText type="subtitle">Description</ThemedText>
        <ThemedText type="default">{body}</ThemedText>
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
