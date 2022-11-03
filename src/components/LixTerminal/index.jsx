import React from 'react'
import Terminal from 'react-console-emulator'

export function LixTerminal({ name }) {
  const cont = 0

  const styles = {
		default: { width: '100%', maxHeight: 300, overflow: 'hidden' },
    inputA: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
    inputText: { color: 'white' },
    promptL: { color: '#5AA5C9', fontWeight: 'bold' },
    msgText: { color: '#A2BDC7', fontWeight: '300' }
	};

  const commands = {
		informacao: {
		  description: 'Apenas um teste.',
		  fn: () => {
				return 'Alô'
			}
		},
    sudo: {
      description: "",
      fn: args => {}
    },
    ls: {
      description: "",
      fn: () => {
        return
      }
    },
    cd: {
      description: "",
      fn: args => {}
    },
    mkdir: {
      description: "",
      fn: args => {}
    },
    rmdir: {
      description: "",
      fn: args => {}
    },
    pwd: {
      description: "",
      fn: () => {
        return
      }
    },
    rm: {
      description: "",
      fn: args => {}
    },
    touch: {
      description: "",
      fn: args => {}
    }
	}

  return (
    <Terminal
				commands={commands}
				promptLabel={ ( cont > 0 ? name : 'login' ) + `@Lixterm:~$`}
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