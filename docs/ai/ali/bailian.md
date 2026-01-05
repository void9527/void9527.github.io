---
outline: deep
---

## [文生文 Prompt 指南](https://help.aliyun.com/zh/model-studio/prompt-engineering-guide?spm=a2c4g.11186623.0.0.24855e97HhbaEX)

## 参数

| 参数名                | 参数描述                                                  |
|:-------------------|:------------------------------------------------------|
| temperature        | 温度参数，取值范围[0,1]，越小生成结果越 deterministc，越小生成速度越快。         |
| top_p              | top_p参数，取值范围[0,1]，越小生成结果越 deterministc，越小生成速度越快。      |
| max_tokens         | 最大生成长度，取值范围[1,1024]。                                  |
| stop_sequences     | 停止生成序列，取值范围[1,1024]。                                  |
| seed               | 随机数种子，取值范围[0,4294967295]。                             |
| repetition_penalty | 重复惩罚参数，取值范围[0,1]，越小生成结果越 deterministc，越小生成速度越快。       |
| top_k              | top_k参数，取值范围[0,1024]，越小生成结果越 deterministc，越小生成速度越快。   |
| presence_penalty   | 存在惩罚参数，取值范围[0,1]，越小生成结果越 deterministc，越小生成速度越快。       |
| frequency_penalty  | 频率惩罚参数，取值范围[0,1]，越小生成结果越 deterministc，越小生成速度越快。       |
| logit_bias         | logit_bias参数，取值范围[0,1]，越小生成结果越 deterministc，越小生成速度越快。 |
| return_full_text   | 是否返回完整文本，取值范围[true,false]。                            |
| stream             | 是否流式返回，取值范围[true,false]。                              |
| enable_thinking    | 是否启用思考模式，取值范围[true,false]。                            |
