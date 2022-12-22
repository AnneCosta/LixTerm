import React, { useState } from "react";
import { AsciiRobot } from "../../components/AsciiRobot";
import { createRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import Terminal from "react-console-emulator";
import commands from './Commands/commands'
import { Carousel } from '../../components/Carousel'
import "./css/styles.css"

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
      default: { 
         width: "100%", 
         height: "350px", 
         overflowX: "scroll"
      },
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
         description: "Permite executar comandos em modo de superusuário.",
         usage: "sudo <argumentos>",
         fn: (args) => {
            if (args == "update"){
               return "Sistema atualizado."
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

      // rm: {
      //    description: "Apaga um diretório",
      //    usage: "rm <diretório>",
      //    fn: (args) => {
      //       // if (args.length === 1) {
      //       //    setDir({
      //       //       ...dir,
      //       //       [home]: [...dir[home], args[0]],
      //       //       [args[0]]:[],
      //       //    });

      //       // } else {
      //       //    return "Argumento inválido";
      //       // }
      //    },
      // },

      man: {
         description: "Explica como utilizar um comando",
         usage: "man <comando>",
         fn: (args) => {
            if (args == "ls"){
               return ( 
                  <div>
                     <span><strong>NOME</strong></span>
                     <p>&nbsp;&nbsp;&nbsp;&nbsp;ls - listar conteúdo do diretório</p>
                     <span><strong>DESCRIÇÃO</strong></span>
                     <p>&nbsp;&nbsp;&nbsp;&nbsp;Lista informações sobre os arquivos do diretório atual. </p>
                  </div>
               )
            }
            if (args == "mkdir"){
               return ( 
                  <div>
                     <span><strong>NOME</strong></span>
                     <p>&nbsp;&nbsp;&nbsp;&nbsp;mkdir - criar diretórios</p>
                     <span><strong>DESCRIÇÃO</strong></span>
                     <p>&nbsp;&nbsp;&nbsp;&nbsp;Cria diretórios, caso eles não existam.</p>
                  </div>
               )
            }
            if (args == "clear"){
               return ( 
                  <div>
                     <span><strong>NOME</strong></span>
                     <p>&nbsp;&nbsp;&nbsp;&nbsp;clear - limpa a tela do terminal</p>
                     <span><strong>DESCRIÇÃO</strong></span>
                     <p>&nbsp;&nbsp;&nbsp;&nbsp;Limpa a janela do terminal, incluindo os comandos anteriormente digitados na seção.</p>
                  </div>
               )
            }
            if (args == "sudo"){
               return ( 
                  <div>
                     <span><strong>NOME</strong></span>
                     <p>&nbsp;&nbsp;&nbsp;&nbsp;sudo - executa o comando como superusuário</p>
                     <span><strong>DESCRIÇÃO</strong></span>
                     <p>&nbsp;&nbsp;&nbsp;&nbsp; Permite executar comandos como superusuário, como é especificado pela política de segurança.</p>
                  </div>
               )
            }
            if (args == "cd"){
               return ( 
                  <div>
                     <span><strong>NOME</strong></span>
                     <p>&nbsp;&nbsp;&nbsp;&nbsp;cd - muda o diretório de trabalho</p>
                     <span><strong>DESCRIÇÃO</strong></span>
                     <p>&nbsp;&nbsp;&nbsp;&nbsp;O utilitário cd muda o diretório de trabalho do atual ambiente de execução.</p>
                  </div>
               )
            }
            if (args == "man"){
               return ( 
                  <div>
                     <span><strong>NOME</strong></span>
                     <p>&nbsp;&nbsp;&nbsp;&nbsp;man - uma interface para os manuais de referência do sistema</p>
                     <span><strong>DESCRIÇÃO</strong></span>
                     <p>&nbsp;&nbsp;&nbsp;&nbsp;É a página de manual do sistema. Cada argumento de página dado a man é, normalmente, o nome de um programa, utilitário ou função.</p>
                  </div>
               )
            }
         },
      },
   };

   return(
      <div className="w-full p-5">
         <section className="flex justify-between">
            <h1 className="text-lg" >
               <strong>LixTerm</strong>
            </h1>
            <section>
               <a href="https://github.com/AnneCosta/LixTerm" >
                  <FontAwesomeIcon className="text-lg" icon={faGithub} /> Repositório
               </a>
            </section>
         </section>
         <article className="flex relative inset-y-80">
            <section className="flex-none">
               <AsciiRobot />
            </section>
            <section className="flex-1">
               <article className="max-w-screen-sm">
                  <Carousel />
               </article>
            </section>
         </article>
         <article>
            <section className="absolute inset-x-0 bottom-0 p-5">
               <Terminal
                  ref={term}
                  commands = {{
                     help: {
                        description: 'Lista todos os comandos',
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