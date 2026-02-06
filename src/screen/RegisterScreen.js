import React, { useState } from 'react';
import { StyleSheet, Alert, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function RegisterScreen({ goHome }) {
  // Step 狀態
  const [step, setStep] = useState(1);
  // Step 1
  const [cardId, setCardId] = useState('');
  const [name, setName] = useState('');
  // Step 2
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  // Step 3
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  // 模擬緊急聯絡人儲存
  const addContactToEmergency = () => {
    // 這裡可串接全域狀態或API，暫以 Alert 取代
    Alert.alert('已新增聯絡人', `已將 ${contactName} (${contactPhone}) 加入緊急呼叫`);
  };

  // 下一步
  const handleNext = () => {
    if (step === 1) {
      if (!cardId || !name) {
        Alert.alert('請輸入健保卡號與姓名');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!password || !confirmPassword) {
        setPasswordError('請輸入密碼與確認密碼');
        return;
      }
      if (password !== confirmPassword) {
        setPasswordError('兩次密碼不一致');
        return;
      }
      setPasswordError('');
      setStep(3);
    }
  };

  // 送出
  const handleSubmit = () => {
    if (!contactName || !contactPhone) {
      Alert.alert('請輸入家屬姓名與電話號碼');
      return;
    }
    addContactToEmergency();
    // 這裡可串接API送出註冊資料
    Alert.alert('註冊成功', '您的資料已送出！');
    // 跳回 welcome 頁面
    if (typeof goHome === 'function') {
      // 由 App.js 傳入 goHome，需 setPage('welcome')
      goHome('welcome');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>用戶註冊</Text>
      {step === 1 && (
        <>
          <View style={styles.inputGroup}>
            <Image source={require('../assets/icon.png')} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="健保卡號"
               placeholderTextColor="#fff"

              value={cardId}
              onChangeText={setCardId}
            />
          </View>
          <View style={styles.inputGroup}>
            <Image source={require('../assets/icon.png')} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="姓名"
              placeholderTextColor="#fff"
              value={name}
              onChangeText={setName}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>下一步</Text>
          </TouchableOpacity>
        </>
      )}
      {step === 2 && (
        <>
          <View style={styles.inputGroup}>
            <Text style={styles.icon}>***</Text>
            <TextInput
              style={styles.input}
              placeholder="設定密碼"
              placeholderTextColor="#fff"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.icon}>***</Text>
            <TextInput
              style={styles.input}
              placeholder="再次確認密碼"
              placeholderTextColor="#fff"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          {!!passwordError && (
            <Text style={{ color: 'red', marginBottom: 10 }}>{passwordError}</Text>
          )}
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>下一步</Text>
          </TouchableOpacity>
        </>
      )}
      {step === 3 && (
        <>
          <View style={styles.inputGroup}>
            <Image source={require('../assets/icon.png')} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="家屬姓名"
              placeholderTextColor="#fff"
              value={contactName}
              onChangeText={setContactName}
            />
          </View>
          <View style={styles.inputGroup}>
            <Image source={require('../assets/icon.png')} style={styles.icon} />
            <TextInpu
              style={styles.input}
              placeholder="電話號碼"
              placeholderTextColor="#fff"
              keyboardType="phone-pad"
              value={contactPhone}
              onChangeText={setContactPhone}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>確認送出</Text>
          </TouchableOpacity>
        </>
      )}
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f5ee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#888',
    letterSpacing: 6,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#bdbdbd',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 18,
    width: 260,
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 12,
    tintColor: '#fff',
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    color: '#000000ff',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#53b6c3',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 4,
  },
 backBtn: {
    backgroundColor: '#8bbec7',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 48,
    alignItems: 'center',
    marginTop: 10,
  },
  backBtnText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
