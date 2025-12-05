// 定义一个ts类型约束，如果 arg.type 选择 text 那么arg内必须要传递text参数 且不能传递 image 参数，如果arg.type选择imageimage  那么arg内必须要传递image类型

type ArgType = { type: 'text'; text: string } | { type: 'image'; image: string }

function a(arg: ArgType) {
  if (arg.type === 'text') {
    // 这里 arg.text 是可用的
    console.log(arg.text)
  } else {
    // 这里 arg.image 是可用的
    console.log(arg.image)
  }
}

a({ type: 'image', image: '' })

a({ type: 'text', text: '' })
