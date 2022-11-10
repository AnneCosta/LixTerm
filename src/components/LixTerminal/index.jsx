import React, { useState } from "react";
import { createRef } from "react";
import Terminal from "react-console-emulator";

export function LixTerminal({ name }) {
   const cont = 0;
   const term = createRef();
   const [prompt, setPrompt] = useState("login@LixTerm:~$ ");
   const [home, setHome] = useState("camin");
   const [dir, setDir] = useState({
      camin: [],
   });

   const styles = {
      default: { width: "100%", maxHeight: 300, overflow: "hidden" },
      inputA: {
         display: "flex",
         alignItems: "center",
         justifyContent: "center",
      },
      inputText: { color: "white" },
      promptL: { color: "#5AA5C9", fontWeight: "bold" },
      msgText: { color: "#A2BDC7", fontWeight: "300" },
   };

   const cmds = {
      clear: {
         description: "Limpa o terminal",
         usage: "clear",
         fn: () => {
            term.current.clearStdout();
         },
      },

      sudo: {
         description: "",
         fn: (args) => {},
      },

      ls: {
         description: "List files in the current directory",
         usage: "ls",
         fn: () => {
            console.log(dir[home]);
            if (dir[home].length === 0) {
               return "nothing here :(\nUse mkdir to create a dir inside this one.";
            } else {
               return dir[home].join("\n");
            }
         },
      },

      cd: {
         description: "Change directory, not really, lol!",
         usage: "cd <directory>",
         fn: (...args) => {
            console.log(dir[home]);
            if (args.length === 1 && args[0] === "..") {
               if (prompt === "login@LixTerm:~$ ") {
                  return "cannot go up";
               } else {
                  setPrompt(
                     prompt.substring(0, prompt.lastIndexOf("/")) + ":~$ "
                  );
                  setHome(
                     prompt.substring(
                        prompt.lastIndexOf("/", prompt.lastIndexOf("/") - 1) +
                           1,
                        prompt.lastIndexOf("/")
                     )
                  );
                  console.log(prompt);
                  console.log(setPrompt);
               }
            } else {
               if (dir[home].includes(args[0])) {
                  setPrompt(
                     `${prompt.slice(0, -4) + "/" + args.join("/") + ":~$ "}`
                  );
                  setHome(args.join("/"));
                  console.log(prompt);
                  console.log(setPrompt);
               } else {
                  return "Não foi possível encontrar o diretório";
               }
            }
         },
      },

      mkdir: {
         description: "Cria um diretório",
         usage: "mkdir <diretório>",
         fn: (...args) => {
            if (args.length === 1) {
               setDir({
                  ...dir,
                  [home]: [...dir[home], args[0]],
                  [args[0]]: [],
               });

               return;
            } else {
               return "Argumento inválido";
            }
         },
      },

      rmdir: {
         description: "",
         fn: (args) => {},
      },

      pwd: {
         description: "",
         fn: () => {
            // let caminho = places[place];
            // if (!caminho) {
            //    return `${place}`;
            // }
				console.log(dir)
            return "waa";
         },
      },

      rm: {
         description: "",
         fn: (args) => {},
      },
      touch: {
         description: "",
         fn: (args) => {},
      },
   };

   return (
      <Terminal
         ref={term}
         commands={{
            // helpTest: {
            // 	description: 'List all available commands',
            // 	usage: 'help',
            // 	fn: () => {
            // 	return `
            // 		${Object.keys(comms).map(cmd => `${cmd}${" ".repeat(12-cmd.length)} | ${comms[cmd].description}${" ".repeat(39-cmds[cmd].description.length)} | ${cmds[cmd].usage}`).join('\n')}
            // 	`
            // 	}
            // },

            ...cmds,
         }}
         promptLabel={prompt}
         autoFocus
         errorText={
            "O comando '[command]' não foi encontrado! Use o comando 'help' para consultar a lista de comandos disponíveis. "
         }
         promptLabelStyle={styles.promptL}
         inputAreaStyle={styles.inputA}
         inputTextStyle={styles.inputText}
         messageStyle={styles.msgText}
         styleEchoBack={"fullInherit"}
         style={styles.default}
         noDefaults
      />
   );
}
