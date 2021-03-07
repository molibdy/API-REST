const { response, request } = require('express');
let express=require ('express');
let app= new express()
let fs=require('fs');

app.use(express.urlencoded({extended:false}));
app.use(express.json())



class Professional{   
    constructor(name,age,gender,weight,height,hairColor,eyeColor,isRetired,nationality,oscarNumber,profession){
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
            this.profession = profession;
    }
}

function getProfessionals(){
    return JSON.parse(fs.readFileSync('profesionales.json'));
}

function saveProfessionals(profesionales){
    fs.writeFileSync('profesionales.json',JSON.stringify(profesionales))
}

//Llamadas a profesional

app.get('/profesionales',(request,response)=>{
    let profesionales= getProfessionals();
    let id=request.query.id;
    let respuesta;
    if(profesionales.length>0){
        if(id!=null){
            console.log(`petición get con id ${id}`)
            if(profesionales.length>id){
                respuesta=profesionales[id];
                console.log(profesionales[id])
            }else{
                respuesta={error:true, code:200, message:`Profesional con id ${id} no existe`}
            }
        }else{
            console.log(`petición get sin id`)
            console.log(profesionales)
            respuesta=profesionales;
        }
    }else{
        respuesta={error:true, code:200, message:'No hay profesionales'}
    }
    response.send(respuesta)
})


app.post('/profesionales',(request,response)=>{
    console.log(`petición post`)
    let profesionales= getProfessionals();
    let respuesta;
    let profesional=new Professional(request.body.name,request.body.age,request.body.gender,request.body.weight,request.body.height,
        request.body.hairColor,request.body.eyeColor,request.body.isRetired,request.body.nationality,request.body.oscarNumber,request.body.profession)
    if(profesionales.includes(profesional)){
        respuesta={error:true, code:200, message:'Profesional ya existe', resultado: null}
    }else{
        profesionales.push(profesional)
        respuesta={error:false, code:200, message:'Profesional añadido', resultado: profesional}
    }
    saveProfessionals(profesionales)
    response.send(respuesta);
})


app.put('/profesionales',(request,response)=>{
    let profesionales= getProfessionals();
    let respuesta;
    let id=request.body.id;
    console.log(`petición put con id ${id}`)
    if(profesionales.length>0){
        if(id!=null){
            if(profesionales.length>id){
                let modifiedProfesional=new Professional(request.body.name,request.body.age,request.body.gender,request.body.weight,request.body.height,
                    request.body.hairColor,request.body.eyeColor,request.body.isRetired,request.body.nationality,request.body.oscarNumber,request.body.profession)
                    //console.log(modifiedProfesional)
                let atributos=Object.keys(modifiedProfesional)
                for(let i=0;i<atributos.length;i++){
                    if(modifiedProfesional[atributos[i]]!=null){
                        profesionales[id][atributos[i]]=modifiedProfesional[atributos[i]]
                    }
                }
                respuesta={error:false, code:200, message:'Profesional modificado', resultado: profesionales[id]}
            }else{
                respuesta={error:true, code:200, message:'Profesional no existe'}
            }
        }else{
            respuesta={error:true, code:200, message:'Id del profesional no especificado'}
        }
    }else{
        respuesta={error:true, code:200, message:'No hay profesionales'}
    }
    saveProfessionals(profesionales)
    response.send(respuesta);
})


app.delete('/profesionales',(request,response)=>{
    let profesionales= getProfessionals();
    let id=request.body.id;
    let respuesta;
    if(profesionales.length>0){
        if(id!=null){
            console.log(`petición delete con id ${id}`)
            if(profesionales.length>id){
                profesionales.splice(id,1);
                respuesta={error:false, code:200, message:'Profesional eliminado', resultado: profesionales};
            }else{
                respuesta={error:true, code:200, message:'Profesional no existe'}
            }
        }else{
            console.log(`petición delete sin id`)
            respuesta={error:true, code:200, message:'Id del profesional no especificado'}
        }
    }else{
        respuesta={error:true, code:200, message:'No hay profesionales'}
    }
    saveProfessionals(profesionales)
    response.send(respuesta);

})

//Llamadas sin ruta específica:
app.use((request,response,next)=>{
    console.log('petición recibida');
    next();
})
app.all('/',(request,response,next)=>{
    console.log('petición recibida desde inicio');
    let respuesta={error:true, code:200, message:'Punto de inicio'};
    response.send(respuesta);
    next();
})

app.listen(3000)