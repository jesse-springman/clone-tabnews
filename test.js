class ValidationError extends Error{
  constructor(message){
    super(message)
  }
}

function kk(input) {

  if(!input){
    throw new ReferenceError('É necessario enviar o `input`')
  }

  if(!input.name){
    throw new ValidationError('Preencha o campo de Nome')
  }


} 

try{
   kk({});
}
catch(error){

  if(error instanceof ReferenceError )
  console.log('SEM NOME');
  
    if(error instanceof ValidationError )
  console.log('CAMPO DE NOME NÃO FOI PREENCHIDO');
  console.log(error.stack);
  

}