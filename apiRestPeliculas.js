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


function getPeliculas(){
    return JSON.parse(fs.readFileSync('peliculas.json'));
}

function savePeliculas(peliculas){
    fs.writeFileSync('peliculas.json',JSON.stringify(peliculas))
}


app.get('/peliculas',(request,response)=>{
    let peliculas=getPeliculas();
    let id=request.query.id;
    let respuesta;
    if(peliculas.length>0){
        if(id!=null){
            console.log(`petición get /peliculas con id ${id}`)
            if(peliculas.length>id){
                respuesta=peliculas[id];
                //console.log(peliculas[id])
            }else{
                respuesta={error:true, code:200, message:`Pelicula con id ${id} no existe`};
                //console.log("hola")
            }
        }else{
            respuesta=peliculas;
        }
    }else{
        respuesta={error:true, code:200, message:'No hay peliculas'};
    }
    response.send(respuesta);
})



app.post('/peliculas',(request,response)=>{
    let peliculas=getPeliculas();
    let respuesta;
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
    let pelicula=new Movie(request.body.title,request.body.releaseYear,request.body.nationality,
            request.body.genre,director,writer,request.body.language,request.body.isMCU,
            request.body.mainCharacterName,request.body.producer,request.body.distributor,actors);
    if(peliculas.includes(pelicula)){
        respuesta={error:true, code:200, message:'Película ya existente'};
    }else{
        peliculas.push(pelicula)
        respuesta={error:false, code:200, message:'Película añadida', resultado: peliculas[peliculas.length-1]};
    }
    savePeliculas(peliculas);
    response.send(respuesta);
})


app.put('/peliculas',(request,response)=>{
    let peliculas=getPeliculas();
    let id=request.body.id;
    let respuesta;
    if(id!=null){
        if(peliculas.length>id){
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
                actors=peliculas[id].actor
            }
            let modifiedPelicula=new Movie(request.body.title,request.body.releaseYear,request.body.nationality,
                    request.body.genre,director,writer,request.body.language,request.body.isMCU,
                    request.body.mainCharacterName,request.body.producer,request.body.distributor,actors);
                    
            let atributos=Object.keys(modifiedPelicula);
            for(let i=0;i<atributos.length;i++){
                if(modifiedPelicula[atributos[i]]!=null){
                    peliculas[id][atributos[i]]=modifiedPelicula[atributos[i]];
                }
            }
            respuesta={error:false, code:200, message:'Película modificada', resultado: peliculas[id]};
        }else{
            respuesta={error:true, code:200, message:'Película inexistente'};
        }
    }else{
        respuesta={error:true, code:200, message:'Id de la pelicula a modificar no especificado'};
    }
    savePeliculas(peliculas)
    response.send(respuesta);          
})



app.delete('/peliculas',(request,response)=>{
    let peliculas=getPeliculas();
    let id=request.body.id;
    let respuesta;
    if(id!=null){
        if(peliculas.length>id){
            peliculas.splice(id,1);
            respuesta={error:false, code:200, message: 'Pelicula eliminada', resultado: null};
        }else{
            respuesta={error:true, code:200, message:'Pelicula inexistente'};
        }
    }else{
        respuesta={error:true, code:200, message:'Id de la pelicula a eliminar no especificado'}
    }
    savePeliculas(peliculas);
    response.send(respuesta);
})


app.get('/peliculas/actor',(request,response)=>{
    let peliculas=getPeliculas();
    let id=request.query.id;
    let respuesta;
    if(id!=null){
        if(peliculas.length>id){
            console.log(`petición get /actor con id de pelicula ${id}`)
                respuesta={error:false, code:200, message:`actores de la pelicula con id ${id}:`, resultado:peliculas[id].actor};
                //console.log(pelicula[id].actor)
            }else{
                respuesta={error:true, code:200, message:`pelicula con id ${id} no existe`};
                //console.log("hola")
            }   
    }else{
        respuesta={error:true, code:200, message:'Id de película no especificado'};
    }
    response.send(respuesta);
})



app.get('/peliculas/director',(request,response)=>{
    let peliculas=getPeliculas();
    let id=request.query.id;
    let respuesta;
    console.log(`petición get /director con id de pelicula ${id}`)
    if(id!=null){
        if(peliculas.length>id){
                respuesta={error:false, code:200, message:`director de la pelicula con id ${id}:`, resultado:peliculas[id].director};
                //console.log(pelicula[id].director)
            }else{
                respuesta={error:true, code:200, message:`pelicula con id ${id} no existe`};
                //console.log("hola")
            }   
    }else{
        respuesta={error:true, code:200, message:'Id de película no especificado'};
    }
    response.send(respuesta);
})


app.get('/peliculas/guionista',(request,response)=>{
    let peliculas=getPeliculas();
    let id=request.query.id;
    let respuesta;
    console.log(`petición get /guionista con id de pelicula ${id}`)
    if(id!=null){
        if(peliculas.length>id){
                respuesta={error:false, code:200, message:`guionista de la pelicula con id ${id}:`, resultado:peliculas[id].writer};
                //console.log(pelicula[id].guionista)
            }else{
                respuesta={error:true, code:200, message:`pelicula con id ${id} no existe`};
                //console.log("hola")
            }   
    }else{
        respuesta={error:true, code:200, message:'Id de película no especificado'};
    }
    
    response.send(respuesta);
})





app.post('/peliculas/actor',(request,response)=>{
    let peliculas=getPeliculas();
    let id=request.body.id;
    let respuesta;
    console.log(`petición post /actor con id de pelicula ${id}`)
    if(id!=null){
        if(peliculas.length>id){
            let actor=new Professional(request.body.name,request.body.age,request.body.gender,request.body.weight,request.body.height,
                request.body.hairColor,request.body.eyeColor,request.body.isRetired,request.body.nationality,request.body.oscarNumber,request.body.profession)
            if(peliculas[id].actor.includes(actor)){
                respuesta={error:true, code:200, message:'actor ya existe', resultado: null}
            }else{
                peliculas[id].actor.push(actor)
                respuesta={error:false, code:200, message:'actor añadido', resultado: peliculas[id].actor}
            }
        }else{
            respuesta={error:true, code:200, message:'Pelicula inexistente'};
        }
    }else{
        respuesta={error:true, code:200, message:'Id de película no especificado'};
    }
    savePeliculas(peliculas);
    response.send(respuesta);
})


app.post('/peliculas/director',(request,response)=>{
    let peliculas=getPeliculas();
    let id=request.body.id;
    console.log(`petición post /director con id de pelicula ${id}`)
    let respuesta;
    if(id!=null){
        if(peliculas.length>id){
            let director=new Professional(request.body.name,request.body.age,request.body.gender,request.body.weight,request.body.height,
                request.body.hairColor,request.body.eyeColor,request.body.isRetired,request.body.nationality,request.body.oscarNumber,request.body.profession)
            if(peliculas[id].director){
                respuesta={error:true, code:200, message:'director ya existe', resultado: null};
            }else{
                peliculas[id].director=director;
                respuesta={error:false, code:200, message:'director creado', resultado: peliculas[id].director}
            }
        }else{
            respuesta={error:true, code:200, message:'Pelicula inexistente'};
        }
    }else{
        respuesta={error:true, code:200, message:'Id de película no especificado'};
    }
    savePeliculas(peliculas);
    response.send(respuesta);
})



app.post('/peliculas/guionista',(request,response)=>{
    let peliculas=getPeliculas();
    let id=request.body.id;
    console.log(`petición post /guionista con id de pelicula ${id}`)
    let respuesta;
    if(id!=null){
        if(peliculas.length>id){
            let writer=new Professional(request.body.name,request.body.age,request.body.gender,request.body.weight,request.body.height,
                request.body.hairColor,request.body.eyeColor,request.body.isRetired,request.body.nationality,request.body.oscarNumber,request.body.profession)
            if(peliculas[id].writer){
                respuesta={error:true, code:200, message:'guionista ya existe', resultado: null};
            }else{
                peliculas[id].writer=writer;
                respuesta={error:false, code:200, message:'guionista creado', resultado: peliculas[id].writer}
            }
        }else{
            respuesta={error:true, code:200, message:'Pelicula inexistente'};
        }
    }else{
        respuesta={error:true, code:200, message:'Id de película no especificado'};
    }
    savePeliculas(peliculas);
    response.send(respuesta);
})




app.put('/peliculas/actor',(request,response)=>{
    let peliculas=getPeliculas();
    let respuesta;
    let id=request.body.id;
    let idA=request.body.idA;
    console.log(`petición put /actor con id de película ${id} e id de actor ${idA}`)
    if(id!=null && idA!=null){
        if(peliculas.length>id){
            if(peliculas[id].actor.length>idA){
                let modifiedProfesional=new Professional(request.body.name,request.body.age,request.body.gender,request.body.weight,request.body.height,
                    request.body.hairColor,request.body.eyeColor,request.body.isRetired,request.body.nationality,request.body.oscarNumber,request.body.profession)
                    //console.log(modifiedProfesional)
                let atributos=Object.keys(modifiedProfesional);
                for(let i=0;i<atributos.length;i++){
                    if(modifiedProfesional[atributos[i]]!=null){
                        peliculas[id].actor[idA][atributos[i]]=modifiedProfesional[atributos[i]];
                    }
                }
                respuesta={error:false, code:200, message:'Actor modificado', resultado: peliculas[id].actor[idA]}
            }else{
                respuesta={error:true, code:200, message:'Actor no existe'}
            }
        }else{
            respuesta={error:true, code:200, message:'Pelicula inexistente'};
        }
    }else{
        respuesta={error:true, code:200, message:'Id de película o actor no especificado'};
    }
    savePeliculas(peliculas);
    response.send(respuesta);
})



app.put('/peliculas/director',(request,response)=>{
    let peliculas=getPeliculas();
    let respuesta;
    let id=request.body.id;
    console.log(`petición put /director con id de película ${id}`)
    if(id!=null){
        if(peliculas.length>id){
            if(peliculas[id].director){
                let modifiedProfesional=new Professional(request.body.name,request.body.age,request.body.gender,request.body.weight,request.body.height,
                    request.body.hairColor,request.body.eyeColor,request.body.isRetired,request.body.nationality,request.body.oscarNumber,request.body.profession)
                    //console.log(modifiedProfesional)
                let atributos=Object.keys(modifiedProfesional);
                for(let i=0;i<atributos.length;i++){
                    if(modifiedProfesional[atributos[i]]){
                         peliculas[i].director[atributos[i]]=modifiedProfesional[atributos[i]];
                    }
                }
                respuesta={error:false, code:200, message:'director modificado', resultado: peliculas[id].director}
            }else{
                respuesta={error:true, code:200, message:'director no existe'}
            }
        }else{
            respuesta={error:true, code:200, message:'Pelicula inexistente'};
        }
    }else{
        respuesta={error:true, code:200, message:'Id de película no especificado'};
    }
    savePeliculas(peliculas);
    response.send(respuesta);
})


app.put('/peliculas/guionista',(request,response)=>{
    let peliculas=getPeliculas();
    let respuesta;
    let id=request.body.id;
    console.log(`petición put /guionita con id de película ${id}`)
    if(id!=null){
        if(peliculas.length>id){
            if(peliculas[id].writer){
                let modifiedProfesional=new Professional(request.body.name,request.body.age,request.body.gender,request.body.weight,request.body.height,
                    request.body.hairColor,request.body.eyeColor,request.body.isRetired,request.body.nationality,request.body.oscarNumber,request.body.profession)
                    //console.log(modifiedProfesional)
                let atributos=Object.keys(modifiedProfesional);
                for(let i=0;i<atributos.length;i++){
                    if(modifiedProfesional[atributos[i]]){
                         peliculas[i].writer[atributos[i]]=modifiedProfesional[atributos[i]];
                    }
                }
                respuesta={error:false, code:200, message:'guionista modificado', resultado: peliculas[id].writer}
            }else{
                respuesta={error:true, code:200, message:'guionista no existe'}
            }
        }else{
            respuesta={error:true, code:200, message:'Pelicula inexistente'};
        }
    }else{
        respuesta={error:true, code:200, message:'Id de película no especificado'};
    }
    savePeliculas(peliculas);
    response.send(respuesta);
})




app.delete('/peliculas/actor',(request,response)=>{
    let peliculas=getPeliculas();
    let respuesta;
    let id=request.body.id;
    let idA=request.body.idA;
    console.log(`petición delete /actor con id de película ${id} e id de actor ${idA}`)
    if(id!=null && idA!=null){
        if(peliculas.length>id){
            if(peliculas[id].actor.length>idA){
                peliculas[id].actor.splice(idA,1);
                respuesta={error:false, code:200, message:'Actor eliminado', resultado: null}
            }else{
                respuesta={error:true, code:200, message:'Actor no existe'}
            }
        }else{
            respuesta={error:true, code:200, message:'Pelicula inexistente'};
        }
    }else{
        respuesta={error:true, code:200, message:'Id de película o actor no especificado'};
    }
    savePeliculas();
    response.send(respuesta);
})

app.delete('/peliculas/director',(request,response)=>{
    let peliculas=getPeliculas();
    let respuesta;
    let id=request.body.id;
    console.log(`petición delete /director con id de película ${id}`)
    if(id!=null){
        if(peliculas.length>id){
            if(peliculas[id].director){
                peliculas[id].director=null;
                respuesta={error:false, code:200, message:'Director eliminado', resultado: null}
            }else{
                respuesta={error:true, code:200, message:'Director no existe'}
            }
        }else{
            respuesta={error:true, code:200, message:'Pelicula inexistente'};
        }
    }else{
        respuesta={error:true, code:200, message:'Id de película no especificado'};
    }
    savePeliculas(peliculas);
    response.send(respuesta);
})

app.delete('/peliculas/guionista',(request,response)=>{
    let peliculas=getPeliculas();
    let respuesta;
    let id=request.body.id;
    console.log(`petición delete /guionista con id de película ${id}`)
    if(id!=null){
        if(peliculas.length>id){
            if(peliculas[id].writer){
                peliculas[id].writer=null;
                respuesta={error:false, code:200, message:'guionista eliminado', resultado: null}
            }else{
                respuesta={error:true, code:200, message:'guionista no existe'}
            }
        }else{
            respuesta={error:true, code:200, message:'Pelicula inexistente'};
        }
    }else{
        respuesta={error:true, code:200, message:'Id de película no especificado'};
    }
    savePeliculas(peliculas);
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