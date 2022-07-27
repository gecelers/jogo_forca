//seletores e variaveis

var palavras = ['ALURA','ORACLE','HTML','JAVASCRIPT','CSS'];
var tabuleiro = document.getElementById("forca").getContext("2d");
var letras = [];
var palavraCorreta = "";
var erros = 9;


function escolherPalavraSecreta () {
	var palavra = palavras[Math.floor(Math.random()*palavras.length)]
	// math.floor = nao permite números em dízia e arredonda pra baixo
	//math.random =  
	palavraSecreta = palavra
	console.log(palavra)
	return palavra
}

// desenhando os traços com Canvas
function tracos() {
	tabuleiro.lineWidth = 6; // grossura do traço
	tabuleiro.lineCap = "round" // cantos arredondados
	tabuleiro.lineJoin = "round" 
	tabuleiro.strokeStyle = "#0A3871"
	tabuleiro.beginPath()

	var eixo = 600/palavraSecreta.length

	for(let i = 0; i < palavraSecreta.length;i++)
	{
		tabuleiro.moveTo(500+(eixo*i),640)
		tabuleiro.lineTo(550+(eixo*i),640)
	}
	tabuleiro.stroke()
	tabuleiro.closePath()
}

tracos(escolherPalavraSecreta())

function letrasCertas(index){
	tabuleiro.font	= "bold 52px"
	tabuleiro.lineWidth = 6; // grossura do traço
	tabuleiro.lineCap = "round" // cantos arredondados
	tabuleiro.lineJoin = "round" 
	tabuleiro.strokeStyle = "#0A3871"
	
	var eixo = 600/palavraSecreta.length

	tabuleiro.fillText(palavraSecreta[index],505+(eixo*index),620)
	tabuleiro.stroke()	

}

function letrasErradas(letra, errorsLeft){ 
	tabuleiro.font	= "bold 40px"
	tabuleiro.lineWidth = 6; // grossura do traço
	tabuleiro.lineCap = "round" // cantos arredondados
	tabuleiro.lineJoin = "round" 
	tabuleiro.strokeStyle = "#0A3871"
	tabuleiro.fillText(letra,535+(40*(10-errorsLeft)),710,40)
	tabuleiro.stroke()	

}

function verificarLetrasCorretas(key) {
	if (letras.length <1 || letras.indexOf(key) < 0) {
		console.log(key)
		letras.push(key)
		// variavel para garantir que qdo entrar na funcao de novo ela esteja zerada
		return false
	}
	else {
		letras.push(key.toUpperCase())
		return true
	}

}

function adicionarLetraCorreta(i){ 
	palavraCorreta+= palavraSecreta[i].toUpperCase()
}

function adicionarLetraIncorreta(i){
	if(palavraSecreta.indexOf(i)<=0){
		erros-=1
	}
}

// metodo que escuta tecla digitada
document.onkeydown = (e) => 
{
	var letra = e.key.toUpperCase()
	
	if(!verificarLetrasCorretas(e.key) )
	{
		if(palavraSecreta.includes(letra))
		{ 
			adicionarLetraCorreta(palavraSecreta.indexOf(letra))
			for(let i=0; i < palavraSecreta.length;i++) 
			{
				if(palavraSecreta[i]==letra) 
				{
					letrasCertas(i)
				}
			}
			console.log("certa")
		}
		else{
			// letra incorreta
			console.log("incorreta")
			if (!verificarLetrasCorretas(e.key))
			return
			adicionarLetraIncorreta(letra)
			letrasErradas(letra,erros)

			//letrasErradas(letra,erros)
			
		}
	
	}
	
}