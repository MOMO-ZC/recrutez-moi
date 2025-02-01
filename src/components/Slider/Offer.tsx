import type { JobOffer, Skill as SkillType } from '@/src/types';
import { Image, Text, View } from 'react-native';
import styled from 'styled-components';
import Skill from '../ui/Skill';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedText } from '../ThemedText';
import Experience from '../ui/Experience';
import { JOBIMAGE } from '@/src/constants/const';

interface OfferProps {
  jobOffer: JobOffer;
}

const Offer = (props: OfferProps) => {
  const { jobOffer } = props;
  const {
    image,
    title,
    body,
    company_name,
    address,
    skills,
    experiences,
    education,
    min_salary,
    max_salary,
    location_type,
    date,
  } = jobOffer;

  return (
    <ScrollableContainer>
      <Illustration>
        <Image
          style={{ width: 260, height: 260, borderRadius: 32 }}
          source={{ uri: image ? image : JOBIMAGE }}
        />
        )
      </Illustration>
      <TitleContainer>
        <ThemedText type="title">{title}</ThemedText>
      </TitleContainer>
      <SubtitleContainer>
        <ThemedText type="defaultSemiBold">
          {company_name} | {address}
        </ThemedText>
        <ThemedText type="defaultSemiBold">
          {location_type} | {min_salary}€ - {max_salary}€
        </ThemedText>
        {experiences && experiences.length > 0 && (
          <ThemedText type="default">
            {experiences.map((experience) => experience.name).join(', ')}
          </ThemedText>
        )}
      </SubtitleContainer>
      <SkillsSection>
        <ThemedText type="subtitle">Skills</ThemedText>
        <SkillContainer>
          {skills.map((skill, index) => (
            <Skill key={index} skill={skill} />
          ))}
        </SkillContainer>
      </SkillsSection>
      <EducationSection>
        <ThemedText type="subtitle">Diploma</ThemedText>
        {education &&
          education.map((diploma, index) => (
            <ThemedText key={index} type="default">
              {diploma.domain} | {diploma.diploma}
            </ThemedText>
          ))}
      </EducationSection>
      <ExperienceSection>
        <ThemedText type="subtitle">Experiences</ThemedText>
        <SkillContainer>
          {experiences &&
            experiences.map((experience, index) => (
              <Experience key={index} experience={experience} />
            ))}
        </SkillContainer>
      </ExperienceSection>
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
    paddingBottom: 20,
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

const EducationSection = styled(View)`
  margin-top: 20px;
  margin-left: 48px;
`;

const ExperienceSection = styled(View)`
  margin-top: 20px;
  margin-left: 48px;
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
