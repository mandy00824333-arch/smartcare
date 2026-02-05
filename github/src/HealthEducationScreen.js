
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function HealthEducationScreen({ goHome }) {
  const categories = [
    '全部', '營養飲食', '運動健身', '心理健康', '慢性病', '預防保健', '急救知識'
  ];
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [search, setSearch] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticles = async () => {
      let query = supabase.from('articles').select('*').order('created_at', { ascending: false });
      if (selectedCategory !== '全部') {
        query = query.eq('category', selectedCategory);
      }
      if (search) {
        query = query.ilike('title', `%${search}%`);
      }
      const { data, error } = await query;
      if (error) {
        setError(error.message);
      } else {
        setArticles(data);
      }
      setLoading(false);
    };
    loadArticles();
  }, [selectedCategory, search]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.iconBox}>
          <View style={styles.iconCircle}>
            <Ionicons name="book" size={32} color="#fff" />
          </View>
        </View>
        <View style={styles.titleTextBox}>
          <Text style={styles.titleText}>健康教育</Text>
          <Text style={styles.subtitleText}>掌握最新健康知識</Text>
        </View>
      </View>
      <View style={styles.searchBox}>
        <Ionicons name="search" size={22} color="#aaa" style={{marginRight:8}} />
        <TextInput
          style={styles.searchInput}
          placeholder="搜尋文章..."
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <View style={styles.categoryRow}>
        {categories.map(cat => (
          <Pressable
            key={cat}
            style={[styles.categoryBtn, selectedCategory === cat && styles.categoryBtnActive]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>{cat}</Text>
          </Pressable>
        ))}
      </View>
      {loading && <Text style={{marginTop:20}}>載入中...</Text>}
      {error && <Text style={{color:'red',marginTop:20}}>錯誤：{error}</Text>}
      {articles.map((article) => (
        <View key={article.id} style={styles.articleCard}>
          {article.image_url && (
            <View style={styles.articleImageBox}>
              <Image source={{uri: article.image_url}} style={styles.articleImage} />
            </View>
          )}
          <View style={styles.articleContentBox}>
            <View style={styles.articleTagBox}>
              <Text style={styles.articleTag}>{article.category}</Text>
            </View>
            <Text style={styles.articleTitle}>{article.title}</Text>
            <Text style={styles.articleDesc}>{article.content}</Text>
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.backBtn} onPress={goHome}>
        <Text style={styles.backBtnText}>返回主畫面</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ...移除未使用的 loadArticles ...

import { TextInput, Image } from 'react-native';
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: '#f7f5ee', paddingTop: 60 },
  titleRow: {
    flexDirection: 'row', alignItems: 'center', marginTop: 24, marginBottom: 20, marginLeft: 18, alignSelf: 'flex-start',
  },
  iconBox: { marginRight: 16 },
  iconCircle: {
    width: 56, height: 56, borderRadius: 16, backgroundColor: '#2980b9', alignItems: 'center', justifyContent: 'center',
  },
  titleTextBox: { flexDirection: 'column', justifyContent: 'center' },
  titleText: { fontSize: 28, fontWeight: 'bold', color: '#222', letterSpacing: 2, marginBottom: 2 },
  subtitleText: { fontSize: 16, color: '#666', letterSpacing: 1 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 8, marginBottom: 12, width: '90%', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  searchInput: {
    flex: 1, fontSize: 16, color: '#222', backgroundColor: 'transparent', borderWidth: 0,
  },
  categoryRow: {
    flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 18, width: '95%',
  },
  categoryBtn: {
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: '#fff', margin: 4,
  },
  categoryBtnActive: {
    backgroundColor: '#2980b9',
  },
  categoryText: {
    fontSize: 15, color: '#2980b9', fontWeight: 'bold',
  },
  categoryTextActive: {
    color: '#fff',
  },
  articleCard: {
    flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, marginVertical: 8, width: '92%', shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 6, elevation: 2,
  },
  articleImageBox: {
    width: 100, height: 100, borderTopLeftRadius: 16, borderBottomLeftRadius: 16, overflow: 'hidden',
  },
  articleImage: {
    width: '100%', height: '100%', resizeMode: 'cover',
  },
  articleContentBox: {
    flex: 1, padding: 12, justifyContent: 'center',
  },
  articleTagBox: {
    alignSelf: 'flex-start', backgroundColor: '#ffe6a0', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2, marginBottom: 6,
  },
  articleTag: {
    color: '#a67c00', fontWeight: 'bold', fontSize: 13,
  },
  articleTitle: {
    fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 4,
  },
  articleDesc: {
    fontSize: 15, color: '#444',
  },
  backBtn: { backgroundColor: '#8bbec7', borderRadius: 20, paddingVertical: 16, paddingHorizontal: 48, marginTop: 24, marginBottom: 32 },
  backBtnText: { color: '#fff', fontSize: 22, fontWeight: 'bold', letterSpacing: 2 },
});
