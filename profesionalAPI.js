const { response, request } = require('express');
let express=require ('express');
let app= new express()

app.use(express.urlencoded({extended:false}));
app.use(express.json())


class Professional{   
    constructor(name,age,gender,weight,height,hairColor,eyeColor,isRetired,nationality,oscarNumber,proffesion){
            this.name = name;
            this.age = age;
            this.gender = gender;
            this.weight = weight;
            this.height= height;
            this.hairColor = hairColor;
            this.eyeColor = eyeColor;
            this.isRetired = isRetired;
            this.nationality = nationality;
            this.oscarNumber = oscarNumber;
            this.proffesion = proffesion;
    }
   toString(){
       let string=`<p>
            *  Name: ${this.name}\n
            *  Age: ${this.age}\n
            *  Gender: ${this.gender}\n
            *  Weight: ${this.weight}\n
            *  Height: ${this.height}\n
            *  Hair Color: ${this.hairColor}\n
            *  Eye Color: ${this.eyeColor}\n
            *  is Retired?: ${this.isRetired}\n
            *  Nationality: ${this.nationality}\n
            *  Oscar Numbers: ${this.oscarNumber}\n
            *  Profession:  ${this.proffesion} </p>`;
       return string;
   }
}

let profesional=null;


//Llamadas sin ruta específica:
app.all('/',(request,response,next)=>{
    console.log('petición recibida desde inicio');
    let respuesta={error:true, code:200, message:'Punto de inicio'};
    response.send(respuesta);
    next();
})

//Llamadas a profesional
app.get('/profesional',(request,response)=>{
    let respuesta;
    if(profesional!=null){
        respuesta=profesional;
    }else{
        respuesta={error:true, code:200, message:'El profesional no existe'}
    }
    response.send(respuesta)
})


app.post('/profesional',(request,response)=>{
    let respuesta;
    if(profesional===null){
        profesional=new Professional(request.body.name,request.body.age,request.body.gender,request.body.weight,request.body.height,
            request.body.hairColor,request.body.eyeColor,request.body.isRetired,request.body.nationality,request.body.oscarNumber,request.body.proffesion)
        respuesta={error:false, code:200, message:'Profesional creado', resultado: profesional}
    }else{
        respuesta={error:true, code:200, message:'Profesional ya existe', resultado: null}
    }
    response.send(respuesta);

})


app.put('/profesional',(request,response)=>{
    let respuesta;
    if(profesional!=null){
        let modifiedProfesional=new Professional(request.body.name,request.body.age,request.body.gender,request.body.weight,request.body.height,
            request.body.hairColor,request.body.eyeColor,request.body.isRetired,request.body.nationality,request.body.oscarNumber,request.body.proffesion)
            console.log(modifiedProfesional)
        let atributos=Object.keys(modifiedProfesional)
        for(let i=0;i<atributos.length;i++){
        if(modifiedProfesional[atributos[i]]!=null){
            profesional[atributos[i]]=modifiedProfesional[atributos[i]]
            }
        }
        respuesta={error:false, code:200, message:'Profesional modificado', resultado: profesional}
    }else{
        respuesta={error:true, code:200, message:'Profesional no existe'}
    }
    
    response.send(respuesta);

})


app.delete('/profesional',(request,response)=>{
    profesional=null;
    let respuesta={error:false, code:200, message:'Profesional eliminado', resultado: profesional};
    response.send(respuesta);

})







app.listen(3000)