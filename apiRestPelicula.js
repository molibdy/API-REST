const { response, request } = require('express');
let express=require ('express');
let app= new express()
let fs=require('fs');

app.use(express.urlencoded({extended:false}));
app.use(express.json())



class Movie{
    constructor(title, releaseYear, nationality, genre,director,writer,language,isMCU,mainCharacterName,producer,distributor,actor){
        this.title=title;
        this.releaseYear=releaseYear;
        this.nationality=nationality;
        this.genre=genre;
        this.actor=actor;
        this.director=director;
        this.writer=writer;
        this.language=language;
        this.isMCU=isMCU;
        this.mainCharacterName=mainCharacterName;
        this.producer=producer;
        this.distributor=distributor;
        
    }
}

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
}


function getPelicula(){
    return JSON.parse(fs.readFileSync('pelicula.json'));
}

function savePelicula(pelicula){
    fs.writeFileSync('pelicula.json',JSON.stringify(pelicula))
}



app.get('/pelicula',(request,response)=>{
    let pelicula=getPelicula();
    let respuesta;
    if(pelicula!=null){
        respuesta={error:false, code:200, message: 'mostrando pelicula', resultado: pelicula};
    }else{
        respuesta={error:true, code:200, message:'Pelicula inexistente'};
    }
    response.send(respuesta);
})

app.post('/pelicula',(request,response)=>{
    let pelicula=getPelicula();
    let respuesta;
    if(pelicula===null){
        let director;
        let writer;
        let actor1;
        let actor2;
        let actors=[];
        if(request.body.director!=null){
            director=new Professional(request.body.director.name,request.body.director.age,request.body.director.gender,request.body.director.weight,
                request.body.director.height,request.body.director.hairColor,request.body.director.eyeColor,request.body.director.isRetired,
                request.body.director.nationality,request.body.director.oscarNumber,request.body.director.profession);
        }
        if(request.body.writer!=null){
            writer=new Professional(request.body.writer.name,request.body.writer.age,request.body.writer.gender,request.body.writer.weight,
                request.body.writer.height,request.body.writer.hairColor,request.body.writer.eyeColor,request.body.writer.isRetired,
                request.body.writer.nationality,request.body.writer.oscarNumber,request.body.writer.profession);
        }
        if(request.body.actor1!=null){
            actor1=new Professional(request.body.actor1.name,request.body.actor1.age,request.body.actor1.gender,request.body.actor1.weight,
                request.body.actor1.height,request.body.actor1.hairColor,request.body.actor1.eyeColor,request.body.actor1.isRetired,
                request.body.actor1.nationality,request.body.actor1.oscarNumber,request.body.actor1.profession);
            actors.push(actor1);
        }
        if(request.body.actor2!=null){
            actor2=new Professional(request.body.actor2.name,request.body.actor2.age,request.body.actor2.gender,request.body.actor2.weight,
                request.body.actor2.height,request.body.actor2.hairColor,request.body.actor2.eyeColor,request.body.actor2.isRetired,
                request.body.actor2.nationality,request.body.actor2.oscarNumber,request.body.actor2.profession);
                actors.push(actor2);
        }
        if(request.body.actor3!=null){
            actor3=new Professional(request.body.actor3.name,request.body.actor3.age,request.body.actor3.gender,request.body.actor3.weight,
                request.body.actor3.height,request.body.actor3.hairColor,request.body.actor3.eyeColor,request.body.actor3.isRetired,
                request.body.actor3.nationality,request.body.actor3.oscarNumber,request.body.actor3.profession);
                actors.push(actor3);
        }
        pelicula=new Movie(request.body.title,request.body.releaseYear,request.body.nationality,
                request.body.genre,director,writer,request.body.language,request.body.isMCU,
                request.body.mainCharacterName,request.body.producer,request.body.distributor,actors);
        respuesta={error:false, code:200, message:'Película añadida', resultado: pelicula};
    }else{
        respuesta={error:true, code:200, message:'Película ya existente'};
    }
    savePelicula(pelicula);
    response.send(respuesta)
})


app.put('/pelicula',(request,response)=>{
    let pelicula=getPelicula();
    let respuesta;
    if(pelicula!=null){
        let director;
        let writer;
        let actor1;
        let actor2;
        let actors=[];
        if(request.body.director!=null){
            director=new Professional(request.body.director.name,request.body.director.age,request.body.director.gender,request.body.director.weight,
                request.body.director.height,request.body.director.hairColor,request.body.director.eyeColor,request.body.director.isRetired,
                request.body.director.nationality,request.body.director.oscarNumber,request.body.director.profession);
        }
        if(request.body.writer!=null){
            writer=new Professional(request.body.writer.name,request.body.writer.age,request.body.writer.gender,request.body.writer.weight,
                request.body.writer.height,request.body.writer.hairColor,request.body.writer.eyeColor,request.body.writer.isRetired,
                request.body.writer.nationality,request.body.writer.oscarNumber,request.body.writer.profession);
        }
        if(request.body.actor1!=null){
            actor1=new Professional(request.body.actor1.name,request.body.actor1.age,request.body.actor1.gender,request.body.actor1.weight,
                request.body.actor1.height,request.body.actor1.hairColor,request.body.actor1.eyeColor,request.body.actor1.isRetired,
                request.body.actor1.nationality,request.body.actor1.oscarNumber,request.body.actor1.profession);
            actors.push(actor1);
        }
        if(request.body.actor2!=null){
            actor2=new Professional(request.body.actor2.name,request.body.actor2.age,request.body.actor2.gender,request.body.actor2.weight,
                request.body.actor2.height,request.body.actor2.hairColor,request.body.actor2.eyeColor,request.body.actor2.isRetired,
                request.body.actor2.nationality,request.body.actor2.oscarNumber,request.body.actor2.profession);
                actors.push(actor2);
        }
        if(request.body.actor3!=null){
            actor3=new Professional(request.body.actor3.name,request.body.actor3.age,request.body.actor3.gender,request.body.actor3.weight,
                request.body.actor3.height,request.body.actor3.hairColor,request.body.actor3.eyeColor,request.body.actor3.isRetired,
                request.body.actor3.nationality,request.body.actor3.oscarNumber,request.body.actor3.profession);
                actors.push(actor3);
        }
        if(actors.length===0){
            actors=pelicula.actor
        }
        let modifiedPelicula=new Movie(request.body.title,request.body.releaseYear,request.body.nationality,
                request.body.genre,director,writer,request.body.language,request.body.isMCU,
                request.body.mainCharacterName,request.body.producer,request.body.distributor,actors);
                
        let atributos=Object.keys(modifiedPelicula);
        for(let i=0;i<atributos.length;i++){
            if(modifiedPelicula[atributos[i]]!=null){
                pelicula[atributos[i]]=modifiedPelicula[atributos[i]];
            }
        }
        respuesta={error:false, code:200, message:'Película modificada', resultado: pelicula};
    }else{
        respuesta={error:true, code:200, message:'Película inexistente'};
    }
    savePelicula(pelicula);
    response.send(respuesta);          
})



app.delete('/pelicula',(request,response)=>{
    let pelicula=getPelicula();
    let respuesta;
    if(pelicula!=null){
        pelicula=null;
        respuesta={error:false, code:200, message: 'Pelicula eliminada', resultado: pelicula};
    }else{
        respuesta={error:true, code:200, message:'Pelicula inexistente'};
    }
    savePelicula(pelicula)
    response.send(respuesta);
})


app.get('/pelicula/actor',(request,response)=>{
    let pelicula=getPelicula();
    let id=request.query.id;
    let respuesta;
    if(pelicula!=null){
        if(id!=null){
            console.log(`petición get /actor con id ${id}`)
            if(pelicula.actor.length>id){
                respuesta=pelicula.actor[id];
                //console.log(pelicula.actor[id])
            }else{
                respuesta={error:true, code:200, message:`actor con id ${id} no existe`};
                //console.log("hola")
            }
        }else{
            console.log(`petición get /actor sin id`)
            if(pelicula.actor.length>0){
                respuesta=pelicula.actor;
            }else{
                respuesta={error:true, code:200, message:'No hay actores'}
            }
        }
    }else{
        respuesta={error:true, code:200, message:'Pelicula inexistente'};
    }
    savePelicula(pelicula)
    response.send(respuesta);
})


app.get('/pelicula/director',(request,response)=>{
    console.log(`petición get /director`)
    let pelicula=getPelicula();
    let respuesta;
    if(pelicula!=null){
        if(pelicula.director != null){
            respuesta={error:false, code:200, message:'mostrando director', resultado: pelicula.director}
        }else{
            respuesta={error:true, code:200, message:'director no existe', resultado: pelicula.director}
        }
    }else{
        respuesta={error:true, code:200, message:'Pelicula inexistente'};
    }
    response.send(respuesta);
})


app.get('/pelicula/guionista',(request,response)=>{
    console.log(`petición get /guionista`)
    let pelicula=getPelicula();
    let respuesta;
    if(pelicula!=null){
        if(pelicula.writer != null){
            respuesta={error:false, code:200, message:'mostrando guionista', resultado: pelicula.writer}
        }else{
            respuesta={error:true, code:200, message:'guionista no existe', resultado: pelicula.writer}
        }
    }else{
        respuesta={error:true, code:200, message:'Pelicula inexistente'};
    }
    
    response.send(respuesta);
})





app.post('/pelicula/actor',(request,response)=>{
    console.log(`petición post /actor`)
    let pelicula=getPelicula();
    let respuesta;
    if(pelicula!=null){
        let actor=new Professional(request.body.name,request.body.age,request.body.gender,request.body.weight,request.body.height,
            request.body.hairColor,request.body.eyeColor,request.body.isRetired,request.body.nationality,request.body.oscarNumber,request.body.profession);
        if(pelicula.actor.includes(actor)){
            respuesta={error:true, code:200, message:'actor ya existe', resultado: null};
        }else{
            pelicula.actor.push(actor);
            respuesta={error:false, code:200, message:'actor añadido', resultado: actor};
        }
    }else{
        respuesta={error:true, code:200, message:'Pelicula inexistente'};
    }
    savePelicula(pelicula)
    response.send(respuesta);
})


app.post('/pelicula/director',(request,response)=>{
    console.log(`petición post /director`)
    let pelicula=getPelicula();
    let respuesta;
    if(pelicula!=null){
        let director=new Professional(request.body.name,request.body.age,request.body.gender,request.body.weight,request.body.height,
            request.body.hairColor,request.body.eyeColor,request.body.isRetired,request.body.nationality,request.body.oscarNumber,request.body.profession)
        if(pelicula.director instanceof Professional){
            respuesta={error:true, code:200, message:'director ya existe', resultado: null}
        }else{
            pelicula.director=director
            respuesta={error:false, code:200, message:'director creado', resultado: pelicula.director}
        }
    }else{
        respuesta={error:true, code:200, message:'Pelicula inexistente'};
    }
    savePelicula(pelicula)
    response.send(respuesta);
})



app.post('/pelicula/guionista',(request,response)=>{
    let pelicula=getPelicula();
    console.log(`petición post /guionista`)
    let respuesta;
    if(pelicula!=null){
        let guionista=new Professional(request.body.name,request.body.age,request.body.gender,request.body.weight,request.body.height,
            request.body.hairColor,request.body.eyeColor,request.body.isRetired,request.body.nationality,request.body.oscarNumber,request.body.profession)
        if(pelicula.writer instanceof Professional){
            respuesta={error:true, code:200, message:'guionista ya existe', resultado: null}
        }else{
            pelicula.writer=guionista
            respuesta={error:false, code:200, message:'guionista creado', resultado: pelicula.writer}
        }
    }else{
        respuesta={error:true, code:200, message:'Pelicula inexistente'};
    }
    savePelicula(pelicula);
    response.send(respuesta);
})




app.put('/pelicula/actor',(request,response)=>{
    let pelicula=getPelicula();
    let respuesta;
    let id=request.body.id;
    console.log(`petición put /actor con id ${id}`)
    if(pelicula!=null){
        if(id!=null){
            if(pelicula.actor.length>id){
                let modifiedProfesional=new Professional(request.body.name,request.body.age,request.body.gender,request.body.weight,request.body.height,
                    request.body.hairColor,request.body.eyeColor,request.body.isRetired,request.body.nationality,request.body.oscarNumber,request.body.profession)
                    //console.log(modifiedProfesional)
                if(pelicula.actor[id] instanceof Professional){
                    let atributos=Object.keys(modifiedProfesional);
                    for(let i=0;i<atributos.length;i++){
                        if(modifiedProfesional[atributos[i]]!=null){
                            pelicula.actor[id][atributos[i]]=modifiedProfesional[atributos[i]];
                        }
                    }
                }else{
                    pelicula.actor[id]=modifiedProfesional;
                }
                respuesta={error:false, code:200, message:'Actor modificado', resultado: pelicula.actor[id]}
            }else{
                respuesta={error:true, code:200, message:'Actor no existe'}
            }
        }else{
            respuesta={error:true, code:200, message:'Id del actor a modificar no especificado'}
        }
    }else{
        respuesta={error:true, code:200, message:'Pelicula inexistente'};
    }
    savePelicula(pelicula);
    response.send(respuesta);
})



app.put('/pelicula/director',(request,response)=>{
    let pelicula=getPelicula();
    let respuesta;
    console.log(`petición put /director`)
    if(pelicula!=null){
        if(pelicula.director!=null){
            let modifiedProfesional=new Professional(request.body.name,request.body.age,request.body.gender,request.body.weight,request.body.height,
                request.body.hairColor,request.body.eyeColor,request.body.isRetired,request.body.nationality,request.body.oscarNumber,request.body.profession)
                //console.log(modifiedProfesional)
            if(pelicula.director instanceof Professional){
                let atributos=Object.keys(modifiedProfesional);
                for(let i=0;i<atributos.length;i++){
                    if(modifiedProfesional[atributos[i]]!=null){
                        pelicula.director[atributos[i]]=modifiedProfesional[atributos[i]];
                    }
                }
            }else{
                pelicula.director=modifiedProfesional;
            }
            
            respuesta={error:false, code:200, message:'director modificado', resultado: pelicula.director}
        }else{
            respuesta={error:true, code:200, message:'director no existe'}
        }
    }else{
        respuesta={error:true, code:200, message:'Pelicula inexistente'};
    }
    savePelicula(pelicula);
    response.send(respuesta);
})


app.put('/pelicula/guionista',(request,response)=>{
    let pelicula=getPelicula();
    let respuesta;
    console.log(`petición put /guionista`)
    if(pelicula!=null){
        if(pelicula.writer!=null){
            let modifiedProfesional=new Professional(request.body.name,request.body.age,request.body.gender,request.body.weight,request.body.height,
                request.body.hairColor,request.body.eyeColor,request.body.isRetired,request.body.nationality,request.body.oscarNumber,request.body.profession)
                //console.log(modifiedProfesional)
            if(pelicula.writer instanceof Professional){
                let atributos=Object.keys(modifiedProfesional);
                for(let i=0;i<atributos.length;i++){
                    if(modifiedProfesional[atributos[i]]!=null){
                        pelicula.writer[atributos[i]]=modifiedProfesional[atributos[i]];
                    }
                }
            }else{
                pelicula.writer=modifiedProfesional;
            }
            
            respuesta={error:false, code:200, message:'guionista modificado', resultado: pelicula.writer}
        }else{
            respuesta={error:true, code:200, message:'guionista no existe'}
        }
    }else{
        respuesta={error:true, code:200, message:'Pelicula inexistente'};
    }
    savePelicula(pelicula);
    response.send(respuesta);
})




app.delete('/pelicula/actor',(request,response)=>{
    let pelicula=getPelicula();
    let respuesta;
    let id=request.body.id;
    console.log(`petición delete /actor con id ${id}`)
    if(pelicula!=null){
        if(id!=null){
            if(pelicula.actor.length>id){
                pelicula.actor.splice(id,1);
                respuesta={error:false, code:200, message:'Actor eliminado', resultado: null}
            }else{
                respuesta={error:true, code:200, message:'Actor no existe'}
            }
        }else{
            respuesta={error:true, code:200, message:'Id del actor a modificar no especificado'}
        }
    }else{
        respuesta={error:true, code:200, message:'Pelicula inexistente'};
    }
    savePelicula(pelicula);
    response.send(respuesta);
})

app.delete('/pelicula/director',(request,response)=>{
    let pelicula=getPelicula();
    let respuesta;
    console.log(`petición delete /director`)
    if(pelicula!=null){
        if(pelicula.director){
            pelicula.director=null;
            respuesta={error:false, code:200, message:'director eliminado', resultado: pelicula.director}
        }else{
            respuesta={error:true, code:200, message:'director no existe'}
        }
    }else{
        respuesta={error:true, code:200, message:'Pelicula inexistente'};
    }
    response.send(respuesta);
})

app.delete('/pelicula/guionista',(request,response)=>{
    let respuesta;
    console.log(`petición delete /guionista`)
    if(pelicula!=null){
        if(pelicula.writer){
            pelicula.writer=null;
            respuesta={error:false, code:200, message:'guionista eliminado', resultado: pelicula.writer}
        }else{
            respuesta={error:true, code:200, message:'guionista no existe'}
        }
    }else{
        respuesta={error:true, code:200, message:'Pelicula inexistente'};
    }
    savePelicula(pelicula);
    response.send(respuesta);
})



//Llamadas sin ruta específica:
app.all('/',(request,response,next)=>{
    console.log('petición recibida desde inicio');
    let respuesta={error:true, code:200, message:'Punto de inicio'};
    response.send(respuesta);
    next();
})

app.use((request,response,next)=>{
    console.log('petición recibida');
    let respuesta={error:true, code:404, message:'oye que esta URL no vale'};
    response.send(respuesta);
    next();
})



app.listen(3000)