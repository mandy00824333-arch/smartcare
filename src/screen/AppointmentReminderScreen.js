import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useWindowDimensions } from 'react-native';
import TitleSection from '../components/TitleSection';
import BackButton from '../components/BackButton';


export default function AppointmentReminderScreen({ goHome }) {
  const { width, height } = useWindowDimensions();
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f7f5ee',
      alignItems: 'center',
      paddingTop: height * 0.02,
      paddingHorizontal: width * 0.05,
    },
  });

  return (
    <ScrollView contentContainerStyle={dynamicStyles.container}>
      {/* 標題區塊改用共用元件 */}
      <TitleSection iconName="calendar" title="線上掛號" subtitle="輕鬆預約您的門診" />
      {/* 其餘內容可依需求擴充 */}
      <BackButton onPress={goHome} />
    </ScrollView>
  );
}

// 其餘樣式如有需要可保留，container 已移除，改用 dynamicStyles
