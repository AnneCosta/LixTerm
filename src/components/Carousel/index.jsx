import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';

export class Carousel extends Component {
  render(){
      let reactSwipeEl;

      return (
         <div>
            <ReactSwipe
            className="carousel"
            swipeOptions={{ 
               startSlide: 0,
               continuous: true,
               stopPropagation: false,
               widthOfSiblingSlidePreview: 0
            }}
            ref={el => (reactSwipeEl = el)}
            >
            <div>
               Bem vindos ao <strong>LixTerm</strong>, o terminal interativo na web! <br/> É aqui que você aprenderá um pouco mais sobre os comandos básicos do Terminal Linux. <br/><br/>
               Para começarmos, digite <strong>help</strong> para ver todos os comandos disponíveis neste terminal. 
               <br/>
               <span className='text-sm'>
                  Clique na seta ({'>'}) para prosseguir.
               </span>
            </div>
            <div>
               Agora vamos utilizar os comandos que vimos no comando <strong>help</strong>. <br/>
               Para termos maior visualização dos comandos e suas respostas, sem maiores obstruções, podemos usar o comando <strong>clear</strong> para limpar os retornos anteriores. <br/> <br/>
               Vamos testar! Digite <strong>clear</strong> no terminal para entender o que acontecerá.
               <br/>
               <span className='text-sm'>
                  Clique na seta ({'>'}) para prosseguir.
               </span>
            </div>
            <div>
               O próximo comando que testaremos é o <strong>sudo</strong>. <br />
               Este comando tem o objetivo de executar comandos em modo root (superusuário). <br /> Neste terminal de teste, utilizaremos o comando de <strong>update</strong> para simular uma atualização de sistema. <br /> <br />
               Então, diga <strong>sudo update</strong> para ver seu retorno.
               <br/>
               <span className='text-sm'>
                  Clique na seta ({'>'}) para prosseguir.
               </span>
            </div>
            <div>
               Para listar os itens do diretório onde estamos, podemos usar o comando <strong>ls</strong>.
               <br />
               Com ele, podemos identificar qual arquivo ou pasta gostaríamos de acessar sem necessitar buscar em um gerenciador de arquivos.
               <br/><br/>
               Teste utilizar o comando <strong>ls</strong> no terminal! 
               <br/>
               <span className='text-sm'>
                  Clique na seta ({'>'}) para prosseguir.
               </span>
            </div>
            <div>
               O comando <strong>mkdir</strong>, citado no terminal após executarmos o ls, tem o objetivo de criar um diretório. A partir dele, podemos criar pastas para guardar os nosso arquivos. <br />
               Vamos testar!
               <br /> <br />
               Digite no terminal o comando <strong>mkdir</strong> seguido do nome desejado com um espaço.
               <br />
               Por exemplo: <strong>mkdir teste</strong>
               <br/>
               <span className='text-sm'>
                  Clique na seta ({'>'}) para prosseguir.
               </span>
            </div>
            <div>
               Criada a nossa pasta, vamos acessá-la! <br /> Com o comando <strong>cd</strong>, podemos mudar o diretório e acessar o que acabamos de criar.
              <br />
               Digite no terminal o comando <strong>cd</strong> seguido do nome da pasta que acabou de criar.
               <br />
               Por exemplo: <strong>cd teste</strong>
               <br/> <br />
               Para retornar ao diretório anterior, use <strong>cd ..</strong> <br />
               <span className='text-sm'>
                  Clique na seta ({'>'}) para prosseguir.
               </span>
            </div>
            <div>
               Para obtermos mais informações sobre os comandos, utilizamos o <strong>man</strong>. <br />
               Com ele, podemos saber a função do comando e uma breve descrição sobre eles.
               <br />
               Vamos testar! <br /> <br />
               Digite <strong>man</strong> seguido de um dos comandos que temos no nosso terminal. <br />
               Por exemplo: <strong>man ls</strong> 
               <br/>
               <span className='text-sm'>
                  Clique na seta ({'>'}) para prosseguir.
               </span>
            </div>
            <div>
               Isso é tudo! <br /> 
               Sinta-se livre para explorar os comandos e testar combinações. <br /> Caso possua dúvidas ou se esqueça de algum comando, clique na seta ({'>'}) para recomeçar ou diga <strong>help</strong> para listar todos os comandos disponíveis novamente.
               <br/> <br />
               Bons estudos! 📚😊
            </div>
            </ReactSwipe>
            <div className='mt-2'>
               <button onClick={() => reactSwipeEl.prev()}>  
                  <strong> &#60; </strong>
               </button>
               <span>&nbsp;&nbsp;  &nbsp;&nbsp;</span>
               <button onClick={() => reactSwipeEl.next()}>
                  <strong>&#62;</strong>
               </button>
            </div>
            
         </div>
      );
   } 
};