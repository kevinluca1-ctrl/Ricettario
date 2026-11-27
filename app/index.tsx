import { Link } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { spacing } from '@/theme';

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium">{t('home.welcome')}</Text>
      <Text variant="titleMedium" style={styles.tagline}>
        {t('app.tagline')}
      </Text>
      <Card mode="contained" style={styles.card}>
        <Card.Content>
          <Text variant="bodyLarge">{t('home.intro')}</Text>
        </Card.Content>
      </Card>
      <Link href="/settings" asChild>
        <Button mode="contained" icon="cog-outline" testID="open-settings">
          {t('home.openSettings')}
        </Button>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    gap: spacing.md,
  },
  tagline: {
    opacity: 0.8,
  },
  card: {
    marginVertical: spacing.sm,
  },
});
