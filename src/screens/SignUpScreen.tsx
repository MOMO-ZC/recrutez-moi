import { useSearchParams } from 'expo-router/build/hooks';
import DynamicForm, { FormField } from '../components/ui/DynamicForm';
import GradientBackGround from '../components/GradientBackGround';
import { useWindowDimensions, View } from 'react-native';
import styled from 'styled-components';
import { API } from '../const';
import { ScrollView } from 'react-native-gesture-handler';
import { useAuth } from '../hooks/useAuth';

const CandidateFormField: FormField[] = [
  {
    name: 'email',
    label: 'Adresse email',
    type: 'email',
  },
  {
    name: 'password',
    label: 'Mot de passe',
    type: 'password',
  },
  {
    name: 'firstname',
    label: 'Prénom',
    type: 'text',
  },
  {
    name: 'lastname',
    label: 'Nom',
    type: 'text',
  },
  {
    name: 'phone',
    label: 'Téléphone',
    type: 'text',
  },
  {
    name: 'city',
    label: 'Ville',
    type: 'text',
  },
  {
    name: 'country',
    label: 'Pays',
    type: 'text',
  },
  {
    name: 'birthdate',
    label: 'Date de naissance',
    placeholder: 'JJ/MM/AAAA',
    type: 'text',
  },
];

const CompanyFormField: FormField[] = [
  {
    name: 'email',
    label: 'Adresse email',
    type: 'text',
  },
  {
    name: 'password',
    label: 'Mot de passe',
    type: 'password',
  },
  {
    name: 'name',
    label: "Nom de l'entreprise",
    type: 'text',
  },
];

const SignUpScreen = () => {
  const role = useSearchParams().get('role');
  const { width, height } = useWindowDimensions();
  const { login } = useAuth();

  const handleSignUp = async (formData: { [key: string]: any }) => {
    const data = {
      ...formData,
      role,
      address: `${formData.city}, ${formData.country}`,
    };

    if (role === 'candidate') {
      try {
        const response = await fetch(`${API}/candidates/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          console.log('registered');
          const { token, id, role } = await response.json();
          login(token, id, role);
        } else {
          console.error('Error during registration');
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await fetch(`${API}/companies/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          console.log('registered');
          const { token, id, role } = await response.json();
          login(token, id, role);
        } else {
          console.error('Error during registration');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <GradientBackGround />

      <ScreenContainer width={width} height={height}>
        <ScrollView>
          <Content>
            <DynamicForm
              formStructure={
                role === 'candidate' ? CandidateFormField : CompanyFormField
              }
              label={
                role === 'candidate'
                  ? 'Inscription Candidat'
                  : 'Inscription Entreprise'
              }
              onSubmit={handleSignUp}
            />
          </Content>
        </ScrollView>
      </ScreenContainer>
    </>
  );
};

export default SignUpScreen;

const Content = styled(View)`
  margin-top: 64px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ScreenContainer = styled(View)<{ width: number; height: number }>`
  bottom: 0;
  left: 0;
  height: ${(props) => props.height}px;
  margin-left: 16px;
  position: absolute;
  justify-content: center;
  width: ${(props) => props.width - 32}px;
`;
