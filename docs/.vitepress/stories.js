const sourceLine = /^(?:\s*(?:🔗|(?:来源|原文)[：:])|.*?\s·\s+\[[^\]]+\]\(https?:\/\/)/
const sourceLink = /\[([^\]]+)\]\((https?:\/\/(?:[^\s()]|\([^()]*\))+)\)/g
const channels = [
  ['models', '模型'],
  ['agents', 'Agent'],
  ['tools', '开发工具'],
  ['research', '研究'],
  ['industry', '行业'],
]

export { channels }

function inferChannel(title, sources) {
  if (/arxiv\.org|openreview\.net|aclanthology\.org/.test(sources)) return 'research'
  if (/融资|收购|上市|诉讼|起诉|法院|监管|任命|芯片许可|调查/.test(title)) return 'industry'
  if (/评测|实验|预印本|论文/.test(title)) return 'research'
  if (/Copilot|前端|开发工具|TypeScript|PostgreSQL|编程|CLI|SDK/i.test(title)) return 'tools'
  if (/API|模型|权重|GPT-|Qwen|Fable|Hydrogen|Carbon|Loop/i.test(title) && /开放|发布|接入|定价|权重|预览/.test(title)) return 'models'
  if (/Agent|Tasks|MCP|Work IQ/i.test(title)) return 'agents'
  return 'industry'
}

export function extractStories(source, date) {
  const uncommented = source.replace(/<!--(?!\s*news:)[\s\S]*?-->/g, '')
  const headings = /^###\s+/m.test(uncommented) ? /^###\s+/m : /^##\s+(?!今日最值得知道)/m
  const sections = uncommented.split(headings).slice(1)
  return sections.flatMap((section, index) => {
    const [heading, ...body] = section.split(/\r?\n/)
    const title = heading.replace(/^本次新增\s*·\s*/, '').trim()
    const credit = body.find(line => sourceLine.test(line))
    const editorial = body.join('\n').match(/<!--\s*news:\s*([a-z]+)\s*-->/)
    const [description, judgment] = body
      .filter(line => !sourceLine.test(line) && !/^\s*(?:##\s|<!--|---\s*$)/.test(line))
      .join('\n').split(/\*\*判断\*\*[：:]?/)
      .map(text => text.replace(/\*\*([^*]+)\*\*/g, '$1').trim())
    const links = [...(credit || '').matchAll(sourceLink)].map(([, label, href]) => ({ label, href }))
    if (!title || !description || !judgment || !links.length) return []
    const explicit = editorial?.[1]
    const channel = channels.some(([id]) => id === explicit) ? explicit : inferChannel(title, credit)
    const sourceName = credit.split(' · ')[0].trim()
    return [{ id: `${date}-${index + 1}`, date, title, channel, description, judgment,
      source: sourceName.includes('](') ? links[0].label : sourceName, links }]
  })
}

export function readingMarkdown(source) {
  return source.split(/\r?\n/).filter(line =>
    !sourceLine.test(line) && !/^\s*\*?(?:本日报由|最后更新[：:]|更新时间[：:])/.test(line)
  ).join('\n').replace(/^(###\s+)本次新增\s*·\s*/gm, '$1')
}
