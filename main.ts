#! /usr/bin/env node
import inquirer from "inquirer"

import chalk from "chalk";

console.log(chalk.italic.bold.rgb(135, 206, 250)(
`\n\t\t\t^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
\n\t\t\t\t~~~~~~~~~~~~~~~ WELCOME BACK TO MY BANK ~~~~~~~~~~~~~~~ \n\t\t\t
\n\t\t\t\t~~~~~~~~~~~~~~~   MADE BY HADIQA GOHAR ~~~~~~~~~~~~~~~ \n\t\t\t
\n\t\t\t\t     To access your account, please provide information. \n\t\t\t
\n\t\t\t^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n`));

///customer
class Customer {
  fullName: string;
  age: number;
  gender: string;
  mobNumber: number;
  accoNumber: string;
  balance: number;

  constructor(
    a: string,
    b: number,
    c: string,
    d: number,
    e: string,
    f: number
  ) {
    this.fullName = a;
    this.age = b;
    this.gender = c;
    this.mobNumber = d;
    this.accoNumber = e;
    this.balance = f;
  }
}


class myBank {
  customers: Customer[] = [];

  async createAcc() {
    const {
      fullName,
      Age,
      Gender,
      mobilenumber,
      accountNumber,
      Balance,
    } = await inquirer.prompt([
      {
        name: "fullName",
        type: "input",
        message: chalk.italic.bold.blueBright("Enter your fullName :"),
      },
      {
        name: "Age",
        type: "input",
        message: chalk.italic.bold.blueBright("Enter your age :"),
      },
      {
        name: "Gender",
        type: "input",
        message: chalk.italic.bold.blueBright("Enter your Gender :"),
      },
      {
        name: "mobilenumber",
        type: "input",
        message: chalk.italic.bold.blueBright("Enter your mobile Number :"),
      },
      {
        name: "accountNumber",
        type: "input",
        message: chalk.italic.bold.blueBright(
          "Enter your new account number :"
        ),
      },
      {
        name: "Balance",
        type: "input",
        message: chalk.italic.bold.blueBright("Add initial balance :"),
      },
    ]);
    const cus = new Customer(
      fullName,
      Age,
      Gender,
      mobilenumber,
      accountNumber,
      parseFloat(Balance)
    );
    this.customers.push(cus);

    console.log(
      chalk.italic.bold.yellow(
       ` \n Congratulations ${cus.fullName}, your account has been created successfully.\n`
      )
    );
  }

  // Details //
  async details() {
    const { AccountNumber } = await inquirer.prompt({
      name: "AccountNumber",
      type: "input",
      message: "Enter your account number:",
    });

    const cus = this.customers.find((x) => x.accoNumber == AccountNumber);
    if (cus) {
      console.log(
        chalk.italic.bold.yellowBright(`Account Details :
            Name: ${cus.fullName} 
            Age: ${cus.age}
            Gender: ${cus.gender}
            MobileNo: ${cus.mobNumber}
            AccountNumber: ${cus.accoNumber}
            Balance: ${cus.balance}`)
      );
    } else {
      console.log(chalk.italic.bold.red("Account Not Found !"));
    }
  }

  // Deposit Amount //
  async debit() {
    const { accountNumber, amount } = await inquirer.prompt([
      {
        type: "input",
        name: "accountNumber",
        message: chalk.bold.magenta("Enter your account number:"),
      },
      {
        type: "input",
        name: "amount",
        message: chalk.bold.magenta("Enter amount to debit:"),
      },
    ]);
    const cus = this.customers.find((z) => z.accoNumber === accountNumber);
    if (cus) {
      if (cus.balance >= parseFloat(amount)) {
        cus.balance -= parseFloat(amount);
        console.log(
          chalk.bold.italic.green(
            `\n Debited ${amount} from account ${accountNumber}. New balance: ${cus.balance} \n `
          )
        );
      } else {
        console.log(chalk.bold.red("Insufficient balance"));
      }
    } else {
      console.log(chalk.red.bold("Account not found:"));
    }
  }
  //// Add Amount  ///
  async credit() {
    const { accountNumber, amount } = await inquirer.prompt([
      {
        name: "accountNumber",
        type: "input",
        message: "Enter your account Number :",
      },
      {
        name: "amount",
        type: "input",
        message: "Enter amount to credit:",
      },
    ]);
    const cus = this.customers.find((z) => z.accoNumber == accountNumber);
    if (cus) {
      cus.balance += parseFloat(amount);
      console.log(
        chalk.bold.italic.magenta(
         ` \n Credited ${amount} to account ${accountNumber}. New balance: ${cus.balance} \n`
        )
      );
    } else {
      console.log(chalk.italic.bold.red("Account Not Found !"));
    }
  }
  async start() {
    while (true) {
      const { Choices } = await inquirer.prompt({
        name: "Choices",
        type: "list",
        message: "Select an option",
        choices: [
          "Create Account",
          "View Account Details",
          "Debit",
          "Credit",
          "Exit",
        ],
      });
      if (Choices === "Create Account") {
        await this.createAcc();
      } 
      else if (Choices === "View Account Details") {
        await this.details();
      } 
      else if (Choices === "Debit") {
        await this.debit();
      } 
      else if (Choices === "Credit") {
        await this.credit();
      } 
      else if ("Exit") {
        console.log(chalk.magentaBright.bold.italic("Thank you..."));
        console.log(chalk.cyanBright.bold.underline.italic("Author : 'Hadiqa Gohar'"))
        process.exit();
      }
    }
  }
}

const a = new myBank();
a.start();