import React, { useState, useEffect } from "react";
import { AsciiRobot } from "../../components/AsciiRobot";
import { createRef } from "react";
import Terminal from "react-console-emulator";
import commands from './Commands/commands'
import tutorial from "./Commands/tutorial";

export function Home() {
   const usrPrompt = "login@/LixTerm:~$ ";
   const term = createRef();
   const comms = commands.commands;
   const [callback, setCallback] = useState('')
   const [prompt, setPrompt] = useState(usrPrompt);
   const [home, setHome] = useState('LixTerm');
   const [dir, setDir] = useState({
      LixTerm: [],
   });


   const styles = {
      default: { width: "100%", height: "350px", overflow: "scroll" },
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
               return "Sistema atualizado."
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

            } else {
               return "Argumento inválido";
            }
         },
      },

      rm: {
         description: "Apaga um diretório",
         usage: "rm <diretório>",
         fn: (args) => {
            // if (args.length === 1) {
            //    setDir({
            //       ...dir,
            //       [home]: [...dir[home], args[0]],
            //       [args[0]]:[],
            //    });

            // } else {
            //    return "Argumento inválido";
            // }
         },
      },

      man: {
         description: "Explica como utilizar um comando",
         usage: "man <comando>",
         fn: (args) => {},
      },
   };


   function Messages({ callback }){
      const [isFinish, setIsFinish] = useState('')

      switch(callback){
         case 'clear':
            console.log(isFinish)
            return ( <span>{ tutorial.msg.clear }</span> )
         case 'sudo':
            console.log(isFinish)
            return ( <span>{ tutorial.msg.sudo }</span> )
         case 'mkdir':
            console.log(isFinish)
            return ( <span>{ tutorial.msg.mkdir }</span> )
         case 'cd':
            console.log(isFinish)
            return ( <span>{ tutorial.msg.cd }</span> )
         case 'ls':
            console.log(isFinish)
            return ( <span>{ tutorial.msg.ls }</span> )
         case 'rm':
            console.log(isFinish)
            return ( <span>{ tutorial.msg.rm }</span> )
         case 'man':
            console.log(isFinish)
            setIsFinish(true)
            console.log(isFinish)
            return ( <span>{ tutorial.msg.man }</span> )
         default:
            return ( <span>{ tutorial.msg.welcome }</span> )
      }
   }

	return (
		<div className="w-full p-5">
			<article className="flex relative inset-y-96">
				<section className="flex-none">
					<AsciiRobot />
				</section>
				<section className="flex-1">
					<p className="message">
                  { 
                     <Messages callback= {callback} />
                  }
               </p>
				</section>
			</article>
			
			<article>
				<section className="absolute inset-x-0 bottom-0 p-5">
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
                  commandCallback={ event => setCallback(event.command)}
               />
				</section>
			</article>
		</div>
	)
}