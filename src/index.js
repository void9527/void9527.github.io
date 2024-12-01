import inquirer from "inquirer";
// 自定义指令
const customList = async () => {
  const { shell } = await inquirer.prompt([
    {
      type: "input",
      name: "shell",
      message: "输入指令",
    },
  ]);
  console.log(shell);
};
// 预设指令
const presetInstruction = async () => {
  const { shell } = await inquirer.prompt([
    {
      type: "list",
      name: "shell",
      message: "请选择指令",
      choices: ["npm install", "npm run dev", "npm run build"],
    },
  ]);
  console.log(shell);
};

try {
  const { type } = await inquirer.prompt([
    {
      type: "list",
      name: "type",
      message: "What is your name?",
      default: "预设指令",
      choices: ["预设指令", "shell命令"],
    },
  ]);
  if (type === "shell命令") {
    customList();
  } else {
    presetInstruction();
  }
} catch (error) {
  console.log(error);
}
