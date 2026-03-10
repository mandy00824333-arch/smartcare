# Supabase 串接說明文件

## 架構概覽

```
.env                        ← 存放金鑰（不進版控）
  └─ EXPO_PUBLIC_SUPABASE_URL
  └─ EXPO_PUBLIC_SUPABASE_ANON_KEY
       │
       ▼
src/config/supabase.js      ← 建立並匯出 supabase client（唯一入口）
       │
       ▼
src/screen/HealthEducationScreen.js  ← 各子元件直接 import 使用
```

---

## 一、環境變數設定（`.env`）

位於專案根目錄（與 `package.json` 同層）。

```dotenv
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**重要規則：**
- 前綴必須是 `EXPO_PUBLIC_`，Expo Metro bundler 才會在打包時注入
- 這是 **Expo SDK 49+** 的原生功能，不需要安裝額外 babel 套件
- 只放 **anon（公開）金鑰**，不放 service_role secret key
- 修改 `.env` 後須以 `npx expo start --clear` 重啟，讓 Metro 重新讀取

> `.env` 應加入 `.gitignore`，避免金鑰外洩。參考 `.env.example` 供團隊成員使用。

---

## 二、Supabase Client 設定（`src/config/supabase.js`）

```js
import 'react-native-url-polyfill/auto';   // React Native 環境需要的 URL polyfill
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('缺少 Supabase 環境變數');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,   // 目前不使用登入功能
    persistSession: false,     // 不需要持久化 session
    detectSessionInUrl: false, // React Native 不用 URL-based session
  },
});
```

**為什麼需要 `react-native-url-polyfill`？**  
`@supabase/supabase-js` 內部使用 `URL` 物件，但 React Native 的 JS 環境原生不支援，polyfill 補足這個缺口。此套件已列在 `package.json` 的 `dependencies` 中。

---

## 三、在畫面元件中使用

### 基本用法

在任何畫面元件中，只需一行 import：

```js
import { supabase } from '../config/supabase';
```

路徑依元件所在層級調整（`../` 或 `../../`）。

### 實際範例：健康教育畫面（`HealthEducationScreen.js`）

#### 類別對照表

資料庫中 `category` 欄位儲存的是英文值，UI 顯示中文，透過 `CATEGORY_MAP` 做雙向轉換：

```js
const CATEGORY_MAP = {
  '全部': null,
  '營養飲食': 'nutrition',
  '運動健身': 'exercise',
  '心理健康': 'mental_health',
  '慢性病': 'chronic_disease',
  '預防保健': 'prevention',
  '急救知識': 'first_aid',
};
```

#### 查詢資料

```js
useEffect(() => {
  const loadArticles = async () => {
    // 1. 基本查詢：從 HealthArtical 表取所有欄位，依 id 排序
    let query = supabase
      .from('HealthArtical')
      .select('*')
      .order('id', { ascending: true });

    // 2. 類別篩選：將中文轉成資料庫英文值
    const dbCategory = CATEGORY_MAP[selectedCategory];
    if (dbCategory) {
      query = query.eq('category', dbCategory);
    }

    // 3. 關鍵字搜尋：對 title 欄位做模糊搜尋（不分大小寫）
    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    // 4. 執行查詢
    const { data, error } = await query;

    if (error) {
      setError(error.message);
    } else {
      setArticles(data);
    }
    setLoading(false);
  };

  loadArticles();
}, [selectedCategory, search]); // 類別或搜尋字變動時重新查詢
```

#### 顯示資料

```jsx
{articles.map((article) => (
  <View key={article.id}>
    {/* 標籤：英文 category 反查 CATEGORY_MAP 顯示中文 */}
    <Text>{Object.keys(CATEGORY_MAP).find(k => CATEGORY_MAP[k] === article.category)}</Text>

    {/* 標題：trim() 去除資料庫中多餘換行 */}
    <Text>{article.title?.trim()}</Text>

    {/* 摘要：使用 summay 欄位而非 content（content 是完整 Markdown） */}
    <Text>{article.summay?.trim()}</Text>

    {/* 閱讀時間 */}
    <Text>閱讀時間：{article.read_time} 分鐘</Text>
  </View>
))}
```

---

## 四、資料庫結構（`HealthArtical` 資料表）

| 欄位 | 型別 | 說明 |
|---|---|---|
| `id` | int | 主鍵 |
| `title` | text | 文章標題 |
| `category` | text | 類別（英文值，見 CATEGORY_MAP） |
| `content` | text | 完整文章內容（Markdown 格式） |
| `summay` | text | 摘要（卡片列表顯示用） |
| `image_url` | text | 封面圖片網址 |
| `read_time` | text | 預估閱讀時間（分鐘） |
| `is_featured` | boolean | 是否為精選文章 |

---

## 五、其他畫面接入 Supabase

新畫面要使用 Supabase，依以下步驟操作：

**1. Import supabase client**
```js
import { supabase } from '../config/supabase'; // 調整相對路徑
```

**2. 依需求呼叫 API**
```js
// 查詢
const { data, error } = await supabase.from('your_table').select('*');

// 條件篩選
const { data } = await supabase.from('your_table').select('*').eq('column', value);

// 新增
const { error } = await supabase.from('your_table').insert({ key: value });

// 更新
const { error } = await supabase.from('your_table').update({ key: value }).eq('id', id);
```

**3. 確認 Supabase RLS 權限**  
若查詢回傳空資料或 `permission denied`，至 Supabase Dashboard → `Authentication` → `Policies` 確認該資料表有開放對應的讀取 / 寫入 policy。
