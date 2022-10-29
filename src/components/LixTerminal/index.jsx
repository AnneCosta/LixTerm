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
		}
	}

  return (
    <Terminal
				commands={commands}
				promptLabel={ ( cont > 0 ? name : 'login' ) + `@Lixterm:~$`}
        errorText={'O comando \'[command]\' não foi encontado! Use o comando \'help\' para consultar a lista de comandos disponíveis. '}
        ignoreCommandCase={false}
        promptLabelStyle={styles.promptL}
				inputAreaStyle={styles.inputA}
        inputTextStyle={styles.inputText}
        messageStyle={styles.msgText}
        styleEchoBack={'fullInherit'}
				style={styles.default}
			/>
  )
}