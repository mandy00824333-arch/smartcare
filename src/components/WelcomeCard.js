import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WelcomeCard = ({ name, cardWidth, cardPadding }) => {
  return (
    <View style={[styles.cardWrap, {
      width: typeof cardWidth === 'number' ? cardWidth : '92%',
      padding: typeof cardPadding === 'number' ? cardPadding : 22,
    }]}
    >
      <View style={styles.row}>
        <Ionicons name="heart-outline" size={28} color="#fff" style={styles.icon} />
        <Text style={styles.title}>護你同在</Text>
      </View>
      <Text style={styles.helloText}>{name}，您好！</Text>
      <Text style={styles.desc}>您的健康夥伴，隨時守護您</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrap: {
    width: '92%',
    alignSelf: 'center',
    backgroundColor: 'linear-gradient(90deg, #4f8cff 0%, #1ec8e7 100%)',
    backgroundColor: '#4f8cff', // fallback for RN, gradient需用第三方
    borderRadius: 22,
    padding: 22,
    marginVertical: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  helloText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 4,
    letterSpacing: 1,
  },
  desc: {
    color: '#eaf6ff',
    fontSize: 16,
    marginTop: 2,
    letterSpacing: 1,
  },
});

export default WelcomeCard;
