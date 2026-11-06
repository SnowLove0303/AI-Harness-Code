---
name: ui-ux-design-engineering
description: "基于 Anthropic 官方 Frontend Design 规范 (10,000+ Stars) 与 VoltAgent/Bergside 现代设计系统 (4,300+ Stars)。确立工业级前端程序设计与 UI/UX 界面工程标准。覆盖少字原则与极简微文案 (Radical Text Economy)、高辨识度品牌审美、Design Tokens 设计令牌体系 (语义调色板/字阶排版/间距)、Anti-AI-Slop 界面工程硬防线 (消除廉价紫黑渐变、文本说明堆砌与千篇一律卡片)、WCAG 2.2 AA 无障碍对比度、响应式几何布局与微交互人体工程学。触发词：ui设计/ux设计/前端设计/界面设计/页面排版/frontend design/设计规范/设计系统/现代化界面/配色方案/组件库设计/少字原则/微文案"
---

# 🎨 现代前端程序设计与 UI/UX 工业级界面工程规范 (Modern Frontend Programming & UI/UX Design Engineering)

> **技术血统与前沿背书**：本规范深度提炼自 **Anthropic 官方 Frontend-Design 规范 (10,000+ ⭐)** 与社区领先的 **VoltAgent / Bergside Design Systems (4,300+ ⭐)**。为 AI 智能体确立一流的交互审美与工程严谨性，彻底消灭“千篇一律的廉价 AI 口水界面与文本堆砌”，打造具备工业级质感、品牌独特性、自明性几何美学与极致人体工程学的用户界面。

---

## 🚫 一、 Anti-AI-Slop 界面工程最高禁令 (Anti-AI Clichés & Invariants)

任何 Agent 在设计或重构界面时，必须严格禁止以下“廉价 AI 生成味”特征：

```text
┌──────────────────────────────────────────────────────────────────┐
│                   ❌ 严禁出现的 AI-Slop 反模式                    │
├──────────────────────────────────────────────────────────────────┤
│ 1. 滥用千篇一律的深黑底色 + 霓虹紫/品蓝渐变 (Purple Glow Slop)   │
│ 2. 居中大标题 + 毫无主次的无脑 3 列卡片网格 (Boring 3-Card Grid) │
│ 3. 缺乏内容关联的生硬圆角与无节制的大模糊毛玻璃 (Blur Abuse)     │
│ 4. 模棱两可的模糊按钮文案（如 "Submit", "Click Here"）           │
│ 5. 缺乏 hover / focus / active / disabled 的交互死木头界面       │
│ 6. 忽略极端长文本截断、空状态与错误重试边缘的“晴天假界面”         │
│ 7. 文本说明泛滥与卡片解释堆砌 (Explanatory Bloat & Prose Pollution)│
└──────────────────────────────────────────────────────────────────┘
```

---

## 📐 二、 Design Tokens 核心设计令牌体系

设计必须建立在严格的**令牌化几何尺度 (Design Tokens)** 之上，杜绝随手手写随意数值：

### 1. 语义化调色系统 (Semantic Palette)
```css
:root {
  /* 基础中性底色 (Neutral Canvas) */
  --color-canvas-subtle: #f8fafc;
  --color-canvas-default: #ffffff;
  --color-canvas-elevated: #ffffff;

  /* 文字分层对比 (Typography Contrast) */
  --color-fg-primary: #0f172a;    /* 900: 主要标题与正文 */
  --color-fg-secondary: #475569;  /* 600: 次要信息与元数据 */
  --color-fg-muted: #94a3b8;      /* 400: 占位符与禁用态 */

  /* 品牌与交互意图 (Accent & Semantic Intent) */
  --color-brand-primary: #0284c7; /* 专业克制的天蓝/海蓝 */
  --color-brand-hover: #0369a1;
  --color-brand-subtle: #e0f2fe;

  --color-intent-success: #16a34a;
  --color-intent-warning: #d97706;
  --color-intent-danger: #dc2626;

  /* 结构边框与分割 (Borders & Dividers) */
  --color-border-subtle: #f1f5f9;
  --color-border-default: #e2e8f0;
  --color-border-emphasis: #cbd5e1;
}
```

### 2. 严格字阶排版尺度 (Typographic Scale)
字阶比例严格采用 1.250 (Major Third) 或 1.200 (Minor Third) 经典比例，行高必须与字号严格咬合：
- **Display 1**：`32px` (2rem) / 行高 `1.2` / 字重 `700` —— 仅限顶级主仪表盘标头
- **Heading 1**：`24px` (1.5rem) / 行高 `1.3` / 字重 `600` —— 页面主要模块标题
- **Heading 2**：`18px` (1.125rem) / 行高 `1.4` / 字重 `600` —— 分组与面板标题
- **Body Regular**：`14px` (0.875rem) / 行高 `1.5` / 字重 `400` —— 标准正文阅读文本
- **Body Small / Caption**：`12px` (0.75rem) / 行高 `1.4` / 字重 `500` —— 标签、元数据与时间戳

### 3. 8pt 空间网格节奏 (Spacing Grid Rhythm)
所有内边距、外边距、组件间距必须是 4px / 8px 的倍数：
- `space-1`: `4px` | `space-2`: `8px` | `space-3`: `12px`
- `space-4`: `16px` | `space-6`: `24px` | `space-8`: `32px` | `space-12`: `48px`

---

## 🧩 三、 高级交互与组件设计哲学 (Ergonomics & States)

### 1. 按钮与操作行为层级 (Action Hierarchy)
一个视口内**严格只能有 1 个主操作按钮（Primary Button）**，其他必须降级为次要或虚线按钮：
```text
[  Primary: 保存并发布  ]  ──> 强烈主视觉吸引力 (Solid Fill)
[  Secondary: 存为草稿  ]  ──> 中性边框 (Outlined / Subdued)
[      取消放弃        ]  ──> 纯文字幽灵按钮 (Ghost / Text-only)
```

### 2. 五态完备性铁律 (The 5 States of UI Components)
每个组件必须完整定义以下五种交互状态，绝不呈现未定义状态：
1. **Default (默认态)**：清晰可读、边界明确；
2. **Hover (悬停态)**：微小的明度变化或微妙阴影上浮（例如 `transform: translateY(-1px)`）；
3. **Focus-Visible (键盘聚焦态)**：高对比度、清晰的外边框光晕（`outline: 2px solid var(--color-brand-primary)`），满足无障碍操作；
4. **Active/Pressed (按下态)**：即时触觉反馈，轻微内凹或背景加深；
5. **Disabled (禁用态)**：明确降低透明度（0.4~0.5）且鼠标为 `cursor: not-allowed`，提供 Tooltip 说明禁用原因。

### 3. 边界与韧性设计 (Resilience Design)
- **长文本截断**：所有单行文本必须配备 `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` 并提供原生 `title` 悬停提示；
- **空状态 (Empty State)**：绝不留出大片白板，必须提供富有指引性的插画/图标、提示文案以及“立即创建”的一键主入口；
- **加载状态 (Loading State)**：长耗时优先采用骨架屏（Skeleton Shimmer），杜绝全屏生硬遮罩转圈。

---

## ♿ 四、 无障碍访问硬指标 (WCAG 2.2 AA Compliance)

1. **色彩对比度充要条件**：
   - 常规正文文本与背景的对比度必须 $\ge 4.5:1$；
   - 大文本（$\ge 18\text{pt}$ 或粗体 $\ge 14\text{pt}$）与背景对比度必须 $\ge 3:1$；
   - 严禁仅靠颜色单一维度传达状态（例如错误提示必须带有红色文字 + 警示图标 + 明确错误文案）。
2. **全键盘可导航**：用户仅通过 Tab / Shift+Tab / Space / Enter 即可流畅完成所有核心交互。

---

## 🛠️ 五、 工业级工程落地实现配方 (Tailwind / CSS Variables)

```html
<!-- 符合本规范的精美卡片组件示例 (体现少字原则与数据自明性) -->
<article class="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
        <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
        就绪
      </span>
      <span class="text-xs font-mono text-slate-400">10m ago</span>
    </div>
    <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 transition-colors">
      计算服务拓扑
    </h3>
    <div class="grid grid-cols-2 gap-2 pt-1">
      <div class="rounded-lg bg-slate-50 p-2 dark:bg-slate-800/50">
        <div class="text-[11px] text-slate-400">延迟</div>
        <div class="text-sm font-semibold font-mono text-slate-800 dark:text-slate-200">1.2ms</div>
      </div>
      <div class="rounded-lg bg-slate-50 p-2 dark:bg-slate-800/50">
        <div class="text-[11px] text-slate-400">吞吐</div>
        <div class="text-sm font-semibold font-mono text-slate-800 dark:text-slate-200">48k/s</div>
      </div>
    </div>
  </div>
  <div class="mt-4 flex items-center justify-end pt-3 border-t border-slate-100 dark:border-slate-800">
    <button type="button" class="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded px-1.5 py-0.5">
      详情 &rarr;
    </button>
  </div>
</article>
```

---

## 🤫 六、 少字原则与极致微文案法定防线 (Radical Text Economy & Microcopy Minimalism)

> **最高法定公理 (`RADICAL_TEXT_ECONOMY_AXIOM`)**：  
> **“宁可不写字，也要避免产生过多的文本说明影响视觉”**。界面的首要语言是几何、间距、对比、图标与隐喻；文字仅作为最高必要的信息锚点。坚决杜绝依赖“文字拐杖 (Textual Crutches)”来补救视觉表达力的缺陷。

### 1. 视觉自明性优先准则 (Visual Affordance First)
- **状态自解释**：运行中、离线、告警等状态优先采用状态指示点（Status Dot）、边框色阶与语义 Badge 自明，严禁在状态旁挂载长句解释。
- **关系自解释**：通过 8pt 空间网格间距与字阶层级（Font Weight / Size）表达归属关系，禁止使用“以下为...列表”等冗余引导文本。
- **交互自解释**：操作行为优先通过标准化认知图标（Lucide / Heroicons）结合极简标签呈现，严禁使用“点击此处执行...”等废话。

### 2. 极简微文案硬性指标 (Microcopy Minimalism Limits)
- **操作标签极精简（1~3 词/字）**：所有按钮与操作标签严格限制在 1~3 个汉字或英文单词（例如：“运行”、“导出”、“保存”、“重试”、“连接”；严禁写成“点击保存当前配置列表”）。
- **业务卡片零废话公理 (Zero-Prose in Operational Cards)**：操作面板与功能卡片内部**严禁默认嵌入说明性正文段落（Prose Paragraphs）**。卡片仅展示【标题】+【核心指标/状态 Badge】+【动作入口】，消除任何 AI 习惯性生成的“功能简介副标题”。
- **表单无冗余说明**：表单字段严格依赖精准的 Label 与高信息量占位符（Placeholder），除非涉及高危破坏性不可逆操作，严禁在输入框下方常驻两行以上的“字段用途解释”。

### 3. 反 AI-Slop 文本污染机检红线 (Anti-Textual-AI-Slop Gate)
- **一票否决门禁**：在日常业务 UI 审查中，若发现任何非数据类、纯静态解释性说明文案超过 **2 行**，或卡片中含有“用于对...进行集中配置与管理的...”等模版套话，直接判定为 `AI_SLOP_PROSE_VIOLATION`，打回重构。
