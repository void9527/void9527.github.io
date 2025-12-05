---
outline: deep
---

####  Hugging Face

#### Webhook
- Webhook 是一种高效、实时的通信机制，它通过“事件驱动”的方式，实现了应用程序之间的自动化数据流。 它是构建现代、松耦合、可扩展的微服务架构和自动化工作流的关键技术。

#### [NLP](https://developer.aliyun.com/article/1530343)
1. 文本预处理
  分词 (Tokenization)：将文本分割成词或子词单位。市面上大模型按Token计费，就是按照这个分词为单位。
  词形还原 (`Lemmatization`) 与词干提取 (Stemming)：将单词还原到其基本形式。
  停用词过滤 (Stop Words Removal)：去除常见但无意义的词（如 "and", "the" 等）。
  词向量化 (Word Vectorization)：将文本表示成计算机可处理的数值形式，如词袋模型 (Bag-of-Words, BoW)、词嵌入 (Word Embeddings) 等。
2. 语言模型
  n-gram 模型：基于固定长度的词序列（n-gram）预测词的概率。
  神经网络语言模型：使用深度学习模型，如 `RNN`、`LSTM`、`Transformer` 等来捕捉语言的复杂模式。
  预训练语言模型：如 BERT、GPT 等，通过在大规模文本数据上预训练，然后在特定任务上进行微调。
3. 文本分类
  情感分析 (Sentiment Analysis)：识别和分类文本中的情感，如正面、负面、中性。
  主题建模 (Topic Modeling)：发现文档集中隐藏的主题，例如 LDA (Latent Dirichlet Allocation)。
  垃圾邮件检测：判断邮件是否为垃圾邮件。
4. 信息提取
  命名实体识别 (Named Entity Recognition, NER)：识别文本中的实体，如人名、地名、组织等。
  关系抽取：识别实体间的关系。
  事件抽取：从文本中提取特定事件的信息。
5. 机器翻译
  统计机器翻译 (Statistical Machine Translation, `SMT`)：基于统计模型的翻译方法。
  神经机器翻译 (Neural Machine Translation, `NMT`)：基于神经网络的翻译方法，如 `Seq2Seq`、`Transformer`。
6. 生成任务
  文本生成：如文本摘要、自动写作、对话系统。
  图像描述生成：根据图像生成描述性文字。