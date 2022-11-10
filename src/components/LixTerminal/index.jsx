import React, { useState } from 'react'
import { createRef } from 'react'
import Terminal from 'react-console-emulator'
import { Commands } from './Commands'

export function LixTerminal({ name }) {
  const cont = 0
  const term = createRef()
  const comms = Commands.commands
  const [prompt, setPrompt] = useState(() => {
    ( cont > 0 ? name : 'login' ) + `@Lixterm:~$` 
  })
  const [home, setHome] = useState('camin')
  const [dir, setDir] = useState({
    'camin': []
  })

  const styles = {
		default: { width: '100%', maxHeight: 300, overflow: 'hidden' },
    inputA: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
    inputText: { color: 'white' },
    promptL: { color: '#5AA5C9', fontWeight: 'bold' },
    msgText: { color: '#A2BDC7', fontWeight: '300' }
	};
  
  const cmds = {
    clear: {
			description: 'Limpa o terminal',
      usage: 'clear' ,
			fn: () => { 
				 term.current.clearStdout()
			 }
		 },
    
		sudo: {
			description: "",
			fn: args => {}
		},
		ls: {
			description: "",
			fn: () => {
				return Object.getOwnPropertyNames(places).join("\n")
			}
		},
		cd: {
			description: "",
			fn: args => {}
		},
		mkdir: {
			description: "Cria um diretório",
			usage: 'mkdir <diretório>',
			fn: (...args) => {
				if(args.length === 1) {
					setDir({
						...dir,
            [home]: [...dir[home], args[0]],
            [args[0]]: []
					})

          return
				}
        else {
          return 'Argumento inválido'
        }
			}
		},
		rmdir: {
			description: "",
			fn: args => {}
		},
		pwd: {
			description: "",
			fn: () => {
				let caminho = places[place]
				if(!caminho) {
				return `${place}`;
				}
				return 'waa'
			}
		},
		rm: {
			description: "",
			fn: args => {}
		},
		touch: {
			description: "",
			fn: args => {}
		},
  }

  return (
    <Terminal
      ref={term}
		commands={{
			helpTest: {
				description: 'List all available commands',
				usage: 'help',
				fn: () => {
				return `
					${Object.keys(comms).map(cmd => `${cmd}${" ".repeat(12-cmd.length)} | ${comms[cmd].description}${" ".repeat(39-cmds[cmd].description.length)} | ${cmds[cmd].usage}`).join('\n')}
				`
				}
			},
			...cmds
		}}
		promptLabel={prompt}
		autoFocus
		errorText={'O comando \'[command]\' não foi encontrado! Use o comando \'help\' para consultar a lista de comandos disponíveis. '}
		promptLabelStyle={styles.promptL}
		inputAreaStyle={styles.inputA}
		inputTextStyle={styles.inputText}
		messageStyle={styles.msgText}
		styleEchoBack={'fullInherit'}
		style={styles.default}
	/>
  )
}