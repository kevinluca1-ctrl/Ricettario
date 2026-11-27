import { ScrollView, StyleSheet } from 'react-native';
import { List, RadioButton } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import {
  detectLanguage,
  deviceLanguageTags,
  isLanguagePreference,
  LANGUAGE_PREFERENCES,
} from '@/i18n';
import { useLanguage } from '@/i18n/LanguageProvider';
import { spacing } from '@/theme';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { preference, setPreference } = useLanguage();
  const systemLanguage = detectLanguage(deviceLanguageTags());

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <List.Section>
        <List.Subheader>{t('settings.language.title')}</List.Subheader>
        <List.Item
          title={t('settings.language.description')}
          titleNumberOfLines={3}
          titleStyle={styles.description}
        />
        <RadioButton.Group
          value={preference}
          onValueChange={(value) => {
            if (isLanguagePreference(value)) void setPreference(value);
          }}
        >
          {LANGUAGE_PREFERENCES.map((option) => (
            <RadioButton.Item
              key={option}
              value={option}
              testID={`language-${option}`}
              label={
                option === 'system'
                  ? t('settings.language.systemCurrent', {
                      language: t(`language.${systemLanguage}`),
                    })
                  : t(`language.${option}`)
              }
            />
          ))}
        </RadioButton.Group>
      </List.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
  },
  description: {
    opacity: 0.75,
  },
});
