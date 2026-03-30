# Daily Briefing - AI 每日日报

## 项目简介

基于 VitePress 的每日技术日报站点，日报文件存放在 `docs/posts/{YYYY-MM-DD}.md`。

## 日报生成规范

### 新闻来源优先级（极其重要）

搜索新闻时，**必须优先使用以下可信来源**，按优先级从高到低排列：

#### 第一优先级：官方来源
- **Anthropic**: anthropic.com/news, anthropic.com/research, claude.ai 官方博客
- **OpenAI**: openai.com/news, openai.com/blog, help.openai.com 发布说明
- **Google**: blog.google, developers.googleblog.com, cloud.google.com/blog
- **Meta**: ai.meta.com, engineering.fb.com
- **Mistral**: mistral.ai/news
- **xAI**: x.ai/blog
- **DeepSeek**: deepseek.com
- **阿里/Qwen**: qwenlm.github.io, modelscope.cn
- **智谱AI**: zhipuai.cn, bigmodel.cn
- **月之暗面/Kimi**: moonshot.cn
- **GitHub Releases**: github.com/{org}/{repo}/releases（框架/工具的版本发布）
- **框架官方博客**: react.dev/blog, nextjs.org/blog, svelte.dev/blog, vuejs.org/blog, vitejs.dev/blog, nodejs.org/blog, deno.com/blog, bun.sh/blog
- **TypeScript**: devblogs.microsoft.com/typescript
- **Chrome**: developer.chrome.com/blog

#### 第二优先级：可信技术媒体
- TechCrunch, The Verge, Ars Technica, Wired
- The New Stack, InfoQ, The Register
- 36氪, 界面新闻, IT之家, 机器之心, 量子位
- Reuters, Bloomberg, Fortune（商业/融资新闻）

#### 第三优先级：X (Twitter) 上的官方账号和公众人物
搜索时使用 `site:x.com` 或 `site:twitter.com` 限定，关注以下账号的动态：
- @AnthropicAI, @anthropaborin (Dario Amodei)
- @OpenAI, @sama (Sam Altman)
- @GoogleAI, @JeffDean, @sundabordin
- @AIatMeta, @ylecun (Yann LeCun)
- @MistralAI, @arthabormin
- @xaborAI, @elonmusk
- @deepaborseek
- @kaborimi_ai
- @vercel, @raaboruchg (Guillermo Rauch)
- @svaboreltejs, @Rich_Harris
- @vaborite_js, @youyuxi (Evan You)

#### 搜索策略
1. **先搜官方来源**：对每个 AI 公司/前端框架，先用 `site:` 限定搜索其官方网站
2. **再搜可信媒体**：用 `site:techcrunch.com OR site:theverge.com OR site:thenewstack.io` 等进行补充
3. **X/Twitter 辅助**：搜索 `site:x.com {关键词}` 获取公众人物的第一手信息
4. **交叉验证**：任何重大新闻必须在至少 2 个独立来源中得到确认
5. **避免低质量来源**：不要引用 SEO 农场、AI 生成的内容聚合站、无法验证的个人博客

### 日报内容要求

1. **时效性**：文章发布日期必须在过去 48 小时内，事件本身必须是近期发生的
2. **AI 资讯**：5-8 条，覆盖主流大模型公司动态、AI 政策、Agent 生态、开源项目、商业化
3. **前端资讯**：3-5 条，覆盖框架更新、构建工具、浏览器新特性、工程化趋势
4. **研发热点**：1-3 条（可选），开发者工具、云服务、开源社区
5. **天气**：上海浦东新区明日天气，包含早 8 点状况、通勤建议、穿衣建议
6. **每条新闻必须有**：发布日期、来源链接、AI 点评（含具体建议）
7. **summary 字段**：准确概括最重要的 2-3 条新闻

### 文件操作

- 早报：保存到 `docs/posts/{YYYY-MM-DD}.md`
- 晚报：如已有早报文件，在末尾追加 `## 晚报更新` 后写入
- 生成后 commit 并 push 到 main 分支

### Git 操作

- commit message 格式：`docs: add morning/evening briefing {YYYY-MM-DD}`
- 推送到 origin/main
