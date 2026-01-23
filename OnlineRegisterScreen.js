import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, FontAwesome, Entypo, MaterialIcons, Fontisto, SimpleLineIcons } from '@expo/vector-icons';

const departments = [
  { key: 'cardiology', label: '心臟內科', desc: '高血壓、心臟病', icon: <MaterialCommunityIcons name="heart-pulse" size={40} color="#e74c3c" /> },
  { key: 'internal', label: '一般內科', desc: '感冒、發燒、頭痛', icon: <MaterialCommunityIcons name="hospital-building" size={40} color="#3498db" /> },
  { key: 'orthopedics', label: '骨科', desc: '骨折、關節', icon: <FontAwesome5 name="bone" size={40} color="#8e44ad" /> },
  { key: 'neurology', label: '神經內科', desc: '中風、癲癇', icon: <MaterialCommunityIcons name="brain" size={40} color="#f39c12" /> },
  { key: 'ophthalmology', label: '眼科', desc: '近視、白內障', icon: <Entypo name="eye" size={40} color="#2980b9" /> },
  { key: 'metabolism', label: '新陳代謝科', desc: '糖尿病、甲狀腺', icon: <MaterialIcons name="local-fire-department" size={40} color="#e67e22" /> },
  { key: 'gastro', label: '腸胃科', desc: '胃痛、腸炎', icon: <MaterialCommunityIcons name="food-apple-outline" size={40} color="#27ae60" /> },
  { key: 'urology', label: '泌尿科', desc: '泌尿感染', icon: <Fontisto name="blood-drop" size={40} color="#16a085" /> },
  { key: 'nephrology', label: '腎臟科', desc: '腎臟病', icon: <MaterialCommunityIcons name="water" size={40} color="#2980b9" /> },
  { key: 'chest', label: '胸腔內科', desc: '氣喘、肺炎', icon: <MaterialCommunityIcons name="lungs" size={40} color="#7f8c8d" /> },
  { key: 'rehab', label: '復健科', desc: '物理治療', icon: <SimpleLineIcons name="energy" size={40} color="#b16ee9" /> },
  { key: 'dentistry', label: '牙科', desc: '牙痛、洗牙', icon: <FontAwesome name="medkit" size={40} color="#e17055" /> },
];

const doctors = {
  cardiology: ['王大明', '李小美'],
  internal: ['陳醫師', '林醫師'],
  orthopedics: ['張骨科', '李關節'],
  neurology: ['吳神經', '周癲癇'],
  ophthalmology: ['鄭眼科', '林白內障'],
  metabolism: ['黃新陳', '陳甲狀腺'],
  gastro: ['王腸胃', '李腸炎'],
  urology: ['陳泌尿', '林感染'],
  nephrology: ['張腎臟', '李腎病'],
  chest: ['吳胸腔', '周肺炎'],
  rehab: ['鄭復健', '林物理'],
  dentistry: ['黃牙科', '陳洗牙'],
};

export default function OnlineRegisterScreen({ goHome }) {
  const [step, setStep] = useState(1);
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');

  // 步驟進度條
  const renderStepBar = () => (
    <View style={styles.stepBar}>
      {[1,2,3].map(i => (
        <View key={i} style={[styles.stepCircle, step === i && styles.stepCircleActive]}>
          <Text style={[styles.stepNum, step === i && styles.stepNumActive]}>{i}</Text>
        </View>
      ))}
      <View style={styles.stepLine} />
      <View style={styles.stepLine} />
    </View>
  );

  // 步驟一：選科別
  const renderHeader = (stepTitle) => (
    <View style={styles.titleRow}>
      <View style={styles.titleTextBoxRow}>
        <View style={styles.iconBoxLeft}>
          <View style={styles.iconCircle}>
            <Ionicons name="calendar" size={32} color="#fff" />
          </View>
        </View>
        <View style={styles.titleTextCol}>
          <Text style={styles.titleText}>線上掛號</Text>
          <Text style={styles.subtitleText}>輕鬆預約您的門診</Text>
        </View>
      </View>
      <Text style={styles.stepTitle}>{stepTitle}</Text>
      {renderStepBar()}
    </View>
  );

  const renderStep1 = () => (
    <ScrollView>
      {renderHeader('1. 請選擇科別')}
      <View style={styles.deptGrid}>
        {departments.map(dept => (
          <TouchableOpacity
            key={dept.key}
            style={[styles.deptCard, selectedDept === dept.key && styles.selectedCard]}
            onPress={() => setSelectedDept(dept.key)}
          >
            {dept.icon}
            <Text style={styles.deptLabel}>{dept.label}</Text>
            <Text style={styles.deptDesc}>{dept.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ButtonBar>
        <TouchableOpacity style={[styles.nextBtn, !selectedDept && styles.disabledBtn]} onPress={() => selectedDept && setStep(2)} disabled={!selectedDept}>
          <Text style={styles.nextBtnText}>下一步</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backBtn} onPress={goHome}>
          <Text style={styles.backBtnText}>返回主畫面</Text>
        </TouchableOpacity>
      </ButtonBar>
    </ScrollView>
  );

  // 步驟二：選醫師
  const renderStep2 = () => (
    <ScrollView>
      {renderHeader('2. 請選擇醫師')}
      <View style={styles.doctorGrid}>
        {(doctors[selectedDept] || []).map(name => (
          <TouchableOpacity
            key={name}
            style={[styles.doctorCard, selectedDoctor === name && styles.selectedCard]}
            onPress={() => setSelectedDoctor(name)}
          >
            <Text style={styles.doctorName}>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ButtonBar>
        <TouchableOpacity style={[styles.nextBtn, !selectedDoctor && styles.disabledBtn]} onPress={() => selectedDoctor && setStep(3)} disabled={!selectedDoctor}>
          <Text style={styles.nextBtnText}>下一步</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backBtn} onPress={() => setStep(1)}>
          <Text style={styles.backBtnText}>上一步</Text>
        </TouchableOpacity>
      </ButtonBar>
    </ScrollView>
  );

  // 步驟三：選日期、時間、備註
  const renderStep3 = () => (
    <ScrollView>
      {renderHeader('3. 選擇日期、時間及備註')}
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="請輸入日期 (如 2025-01-01)"
          value={date}
          onChangeText={setDate}
        />
        <TextInput
          style={styles.input}
          placeholder="請輸入時間 (如 09:00)"
          value={time}
          onChangeText={setTime}
        />
        <TextInput
          style={styles.input}
          placeholder="給醫生的備註"
          value={note}
          onChangeText={setNote}
          multiline
        />
      </View>
      <ButtonBar>
        <TouchableOpacity style={[styles.nextBtn, (!date || !time) && styles.disabledBtn]} onPress={() => {/* 送出邏輯 */}} disabled={!date || !time}>
          <Text style={styles.nextBtnText}>送出掛號</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backBtn} onPress={() => setStep(2)}>
          <Text style={styles.backBtnText}>上一步</Text>
        </TouchableOpacity>
      </ButtonBar>
    </ScrollView>
  );

  // ButtonBar 元件
  function ButtonBar({ children }) {
    return <View style={styles.buttonBar}>{children}</View>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f7f5ee' }}>
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </View>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 8,
    marginBottom: 16,
    marginLeft: 18,
    alignSelf: 'flex-start',
  },
  titleTextBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  titleTextCol: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  iconBoxLeft: {
    marginRight: 12,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#b16ee9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextBox: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    letterSpacing: 2,
    marginBottom: 2,
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    letterSpacing: 1,
    marginBottom: 2,
  },
  stepTitle: {
    fontSize: 18,
    color: '#b16ee9',
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    letterSpacing: 1,
    marginBottom: 8,
  },
  stepBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    justifyContent: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  stepCircleActive: {
    backgroundColor: '#b16ee9',
  },
  stepNum: {
    color: '#888',
    fontWeight: 'bold',
    fontSize: 18,
  },
  stepNumActive: {
    color: '#fff',
  },
  stepLine: {
    width: 24,
    height: 2,
    backgroundColor: '#ccc',
    marginHorizontal: -2,
  },
  deptGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  deptCard: {
    width: 140,
    margin: 8,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedCard: {
    borderColor: '#b16ee9',
    borderWidth: 2,
  },
  deptLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#222',
  },
  deptDesc: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  doctorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  doctorCard: {
    width: 120,
    margin: 8,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  doctorName: {
    fontSize: 18,
    color: '#222',
  },
  inputGroup: {
    margin: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
    gap: 16,
  },
  nextBtn: {
    backgroundColor: '#b16ee9',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  disabledBtn: {
    backgroundColor: '#ccc',
  },
  backBtn: {
    backgroundColor: '#8bbec7',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  backBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});