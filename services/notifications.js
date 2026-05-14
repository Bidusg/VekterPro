// Push-varsler via expo-notifications (lokale, ikke server-baserte).
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function sjekkOgBeOmTillatelse() {
  try {
    const { status: eks } = await Notifications.getPermissionsAsync();
    if (eks === 'granted') return true;
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  } catch (e) {
    console.error('[notif] permission feil:', e.message);
    return false;
  }
}

const DAGLIG_VARSEL_ID = 'daglig-utfordring-09';

export async function planleggDagligVarsel() {
  try {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('daglig', {
        name: 'Daglig utfordring',
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }
    // Fjern tidligere planlagt varsel for å unngå duplikater
    const planlagte = await Notifications.getAllScheduledNotificationsAsync();
    for (const v of planlagte) {
      if (v.identifier === DAGLIG_VARSEL_ID) {
        await Notifications.cancelScheduledNotificationAsync(v.identifier);
      }
    }
    await Notifications.scheduleNotificationAsync({
      identifier: DAGLIG_VARSEL_ID,
      content: {
        title: '🎯 Dagens utfordring er klar!',
        body: 'Øv 10 spørsmål nå – det tar bare 5 minutter.',
        sound: 'default',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: 9,
        minute: 0,
        channelId: Platform.OS === 'android' ? 'daglig' : undefined,
      },
    });
    console.log('[notif] daglig varsel planlagt 09:00');
  } catch (e) {
    console.error('[notif] planlegg feil:', e.message);
  }
}

export async function avbrytAlleVarsler() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
