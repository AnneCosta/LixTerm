import React, { useState } from "react";
import { createRef } from "react";
import Terminal from "react-console-emulator";
import commands from '../../pages/Home/Commands/commands.js'

export function LixTerminal({ name }) {
   const usrPrompt = name + "@/LixTerm:~$ "
   const term = createRef();
   const comms = commands.commands
   const [prompt, setPrompt] = useState(usrPrompt);
   const [home, setHome] = useState('LixTerm');
   const [dir, setDir] = useState({
      LixTerm: [],
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

   const sudoCommands = [
      "sudo -l - Lista os comandos com privilégios root \n", 
      "sudo su - Entra no ambiente root \n", 
      "sudo -h - Lista de ajuda para comandos \n", 
      "sudo update - Atualiza o sistema \n", 
      "sudo (programa) - Executa o programa como super usuario\n"
   ]

   const updating = [
      "Baixando atualizações..."
   ]

   const cmds = {
      clear: {
         description: "Limpa o terminal",
         usage: "clear",
         fn: () => {
            term.current.clearStdout();
         },
      },

      sudo: {
         description: "Permite executar comandos em modo de superusuário.",
         usage: "sudo <argumentos>",
         fn: (args) => {
            if (args == "update"){
               return (
                  updating.forEach(() => {})
               )
               
            }

            if (args == "-l"){
               return sudoCommands.map((coms) => coms)
               
            }
            
            return 'Argumento inválido'
         },
      },

      ls: {
         description: "Lista arquivos no diretório atual",
         usage: "ls",
         fn: () => {
            if (dir[home].length === 0) {
               return 'Nada aqui :(\nUse mkdir para criar uma pasta dentro desta.';
            } else {
               return dir[home].join('\n');
            }
         },
      },

      cd: {
         description: "Muda de diretório",
         usage: "cd <directory>",
         fn: (...args) => {
            if (args.length===1 && args[0]==='..') {
               if (prompt === usrPrompt) {
                  return "Não é mais possível ir um nível acima";
               } else {
                  setPrompt(
                     prompt.substring(0, prompt.lastIndexOf("/")) + ":~$ "
                  );
                  setHome(
                     prompt.substring(
                        prompt.lastIndexOf("/", prompt.lastIndexOf("/") - 1)+1,
                        prompt.lastIndexOf("/")
                     )
                  );
                  return;
               }
            } else {
               if (dir[home].includes(args[0])) {
                  setPrompt(
                     `${prompt.slice(0, -4) + "/" + args.join('/') + ":~$ "}`
                  );
                  setHome(args.join("/"));
                  return
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
                  [args[0]]:[],
               });

               return
            } else {
               return "Argumento inválido";
            }
         },
      },

      rmdir: {
         description: "",
         fn: (args) => {},
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

   function Teste(cmdExec) {
      return console.log(cmdExec)
   }

   return (
      <Terminal
         ref={term}
         commands = {{
            help: {
               description: 'List all available commands',
          	   usage: 'help',
            	fn: () => { 
                  return ` 
                     ${Object.keys(comms).map(cmd => `${cmd}${" "} (${comms[cmd].usage}) - ${comms[cmd].description}${" "}`).join('\n')}

                     ${Object.keys(cmds).map(cmd => `${cmd}${" "} (${cmds[cmd].usage}) - ${cmds[cmd].description}${" "}`).join('\n')} 
                  ` 
               }
               
            },

            ...cmds
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
         commandCallback={ event => { return Teste(event.command) } }
      />
   );
}
