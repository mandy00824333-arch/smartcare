import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ChatScreen({ goHome }) {
  const [tab, setTab] = useState('family');
  // 聊天機器人狀態
  const [messages, setMessages] = useState([
    { from: 'bot', text: '您好，我是智慧助手，有什麼可以幫您？' },
  ]);
  const [input, setInput] = useState('');

  // 處理送出訊息
  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    // 模擬機器人回覆
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', text: '收到您的訊息：「' + userMsg.text + '」' }]);
    }, 800);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.titleRow}>
          <View style={styles.iconBox}>
            <View style={styles.iconCircle}>
              <Ionicons name="chatbubble" size={32} color="#fff" />
            </View>
          </View>
          <View style={styles.titleTextBox}>
            <Text style={styles.titleText}>聊天室</Text>
            <Text style={styles.subtitleText}>聯繫家人、智慧助手</Text>
          </View>
        </View>

        {/* 切換按鈕區塊 */}
        <View style={styles.tabRow}>
          <Pressable
            style={[styles.tabBtn, tab === 'family' && styles.tabBtnActive]}
            onPress={() => setTab('family')}
          >
            <Ionicons name="person" size={22} color={tab === 'family' ? '#8e44ad' : '#888'} style={{ marginRight: 8 }} />
            <Text style={[styles.tabBtnText, tab === 'family' && styles.tabBtnTextActive]}>家人聯繫</Text>
          </Pressable>
          <Pressable
            style={[styles.tabBtn, tab === 'assistant' && styles.tabBtnActive]}
            onPress={() => setTab('assistant')}
          >
            <MaterialCommunityIcons name="robot-outline" size={22} color={tab === 'assistant' ? '#8e44ad' : '#888'} style={{ marginRight: 8 }} />
            <Text style={[styles.tabBtnText, tab === 'assistant' && styles.tabBtnTextActive]}>智慧助手</Text>
          </Pressable>
        </View>

        {/* 內容區塊 */}
        <View style={styles.tabContent}>
          {tab === 'family' ? (
            <View style={styles.tabPanel}><Text style={styles.tabPanelText}>這裡是家人聯繫頁面內容</Text></View>
          ) : (
            <View style={[styles.tabPanel, { flex: 1, alignSelf: 'stretch', width: '100%' }]}> 
              <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ paddingBottom: 12 }}>
                {/* 第一則訊息特別樣式（大氣泡+icon） */}
                {messages.length > 0 && (
                  <View style={styles.assistantWelcomeRow}>
                    <View style={styles.assistantWelcomeIconBox}>
                      <MaterialCommunityIcons name="robot-outline" size={28} color="#8e44ad" />
                    </View>
                    <View style={styles.assistantWelcomeBubble}>
                      <Text style={styles.assistantWelcomeText}>
                        您好！我是護你同在的智慧助手，有什麼可以幫助您的嗎？您可以問我任何健康相關的問題。
                      </Text>
                    </View>
                  </View>
                )}
                {/* 其他訊息 */}
                {messages.slice(1).map((msg, idx) => (
                  <View key={idx} style={[styles.msgRow, msg.from === 'user' ? styles.msgRowUser : styles.msgRowBot]}>
                    <View style={[styles.msgBubble, msg.from === 'user' ? styles.msgBubbleUser : styles.msgBubbleBot]}>
                      <Text style={styles.msgText}>{msg.text}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.inputBox}
                  value={input}
                  onChangeText={setInput}
                  placeholder="請輸入訊息..."
                  returnKeyType="send"
                  onSubmitEditing={handleSend}
                />
                <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
                  <Ionicons name="send" size={22} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.backBtn} onPress={goHome}>
          <Text style={styles.backBtnText}>返回主畫面</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
    msgRow: {
      flexDirection: 'row',
      marginVertical: 4,
      width: '100%',
    },
    msgRowUser: {
      justifyContent: 'flex-end',
    },
    msgRowBot: {
      justifyContent: 'flex-start',
    },
    msgBubble: {
      maxWidth: '80%',
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 16,
    },
    msgBubbleUser: {
      backgroundColor: '#8e44ad',
      borderTopRightRadius: 4,
      marginRight: 8,
    },
    msgBubbleBot: {
      backgroundColor: '#eee',
      borderTopLeftRadius: 4,
      marginLeft: 8,
    },
    msgText: {
      fontSize: 18,
      color: '#222',
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
      backgroundColor: '#f5f5f5',
      borderRadius: 12,
      padding: 6,
      width: '100%',
    },
    inputBox: {
      flex: 1,
      fontSize: 18,
      backgroundColor: '#fff',
      borderRadius: 8,
      paddingHorizontal: 14,
      paddingVertical: 8,
      marginRight: 8,
      borderWidth: 1,
      borderColor: '#eee',
    },
    sendBtn: {
      backgroundColor: '#8e44ad',
      borderRadius: 8,
      padding: 10,
    },
    assistantWelcomeRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 12,
      marginTop: 2,
      width: '100%',
    },
    assistantWelcomeIconBox: {
      width: 38,
      height: 38,
      borderRadius: 12,
      backgroundColor: '#f3eaff',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
      marginLeft: 2,
      marginTop: 2,
    },
    assistantWelcomeBubble: {
      backgroundColor: '#f3f3f7',
      borderRadius: 16,
      paddingVertical: 16,
      paddingHorizontal: 18,
      maxWidth: '80%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 2,
      elevation: 1,
    },
    assistantWelcomeText: {
      fontSize: 20,
      color: '#444',
      lineHeight: 30,
      fontWeight: '400',
      letterSpacing: 1,
    },
  container: { flex: 1, alignItems: 'center', backgroundColor: '#f7f5ee', paddingTop: 16 },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    marginLeft: 18,
    alignSelf: 'flex-start',
  },
  iconBox: { marginRight: 16 },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#8e44ad',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextBox: { flexDirection: 'column', justifyContent: 'center' },
  titleText: { fontSize: 28, fontWeight: 'bold', color: '#222', letterSpacing: 2, marginBottom: 2 },
  subtitleText: { fontSize: 16, color: '#666', letterSpacing: 1 },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 4,
    marginBottom: 12,
    marginTop: 8,
    alignSelf: 'stretch',
    marginHorizontal: 18,
    justifyContent: 'center',
  },
  tabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 10,
    backgroundColor: 'transparent',
    marginHorizontal: 2,
  },
  tabBtnActive: {
    backgroundColor: '#fff',
    shadowColor: '#8e44ad',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  tabBtnText: {
    fontSize: 18,
    color: '#888',
    fontWeight: 'bold',
  },
  tabBtnTextActive: {
    color: '#8e44ad',
  },
  tabContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginHorizontal: 18,
    marginBottom: 18,
    alignSelf: 'stretch',
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  tabPanel: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: 600,
    paddingBottom: 40,
  },
  tabPanelText: {
    fontSize: 20,
    color: '#444',
    fontWeight: '500',
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
