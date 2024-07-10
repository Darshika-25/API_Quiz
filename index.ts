#! /usr/bin/env node

import inquirer from "inquirer";

import chalk from "chalk";

const apiLink: string =
  "https://opentdb.com/api.php?amount=15&category=9&difficulty=easy&type=multiple";

let fetchLink = async (data: string) => {
  let fetchQuiz: any = await fetch(apiLink);
  let outcome = await fetchQuiz.json();
  return outcome.results;
};

let data = await fetchLink(apiLink);
let startQuiz = async () => {
  let score: number = 0;

  //for username
  let name = await inquirer.prompt({
    type: "input",
    name: "uName",
    message: "What is your name?",
  });

  for (let i = 0; i < 15; i++) {
    let answers = [...data[i].incorrect_answers, data[i].correct_answer];

    let ans = await inquirer.prompt({
      type: "list",
      name: "quiz",
      message: data[i].question,
      choices: answers.map((val: any) => val),
    });

    if (ans.quiz == data[i].correct_answer) {
      ++score;
      console.log(chalk.bold.italic.cyanBright("Correct"));
    } else {
      console.log(
        `correct answer is ${chalk.bold.italic.blueBright(
          data[i].correct_answer
        )}`
      );
    }
  }
  console.log(`Dear ${chalk.magentaBright.bold(name.uName)}
       your score is ${chalk.green.bold(score)} out of ${chalk.green.bold(
    data.length
  )}`);
};

startQuiz();
