const http = require('http');
const os = require('os');
const fs = require('fs');
const port = 9000;

let localDatabase = [{myNumber: "a"}];
const server = http.createServer(function(req, res){
    const {url, method} = req;
    const [urlNoQuery] = url.split('?');
    const [, urlQuery] = url.split('?');
    const urlMethod = urlNoQuery + "-" + method;
    res.setHeader('Content-Type', 'string');
    if (urlMethod === '/myNumber-PUT'){
        try{
            const rawbody = [];
            req.on('data', (chunk) => {
                rawbody.push(chunk);
            });

            req.on('end', ()=>{
                const buffer = Buffer.concat(rawbody).toString();
                const body = JSON.parse(buffer);    

                if (isNaN(body.myNumber) === true){
                    res.statusCode = 400;
                    res.end('Bad Request');
                    return 
                }   

                if (localDatabase.length === 0){
                    localDatabase.push({});
                    localDatabase[0].myNumber = body.myNumber;
                    res.statusCode = 201;
                    res.end(JSON.stringify(localDatabase[0]));
                    return
                }

                if (localDatabase[0].hasOwnProperty('myNumber') === false){
                    localDatabase[0].myNumber = body.myNumber;
                    res.statusCode = 201;
                    res.end(JSON.stringify(localDatabase[0]));
                    return
                }
                
                
                localDatabase[0].myNumber = body.myNumber;
                res.statusCode = 200;
                res.end(JSON.stringify(localDatabase[0]));
                return    
            });
            return 
        } catch(error){
            console.log(error)
            res.statusCode = 504;
            res.end("Bad Gateaway");
        }
        return 
    }

    if (urlMethod === '/myNumber-GET'){
        try{
            if(localDatabase[0].hasOwnProperty("myNumber") === true && isNaN(localDatabase[0].myNumber) === false){
                res.statusCode = 200
                return res.end(String(localDatabase[0].myNumber));
            } 
            res.statusCode = 404;
            return res.end("Resource Not Found");

        } catch(error){
            console.log(error)
            res.statusCode = 504;
            res.end("Bad Gateaway");
        }
    }

    if (urlMethod === '/myNumber-DELETE'){
        localDatabase = [{}];
        res.statusCode = 200;
        return res.end(JSON.stringify(localDatabase[0]));
    }

    if (method === 'GET'){
        const myNumberRegExp = /^\/myNumber\/\d+$/;
        if (myNumberRegExp.test(urlNoQuery)){
            multiply = (urlNoQuery.split("/"))[2];
            if (isNaN(localDatabase[0].myNumber) === false){
                const nb = Number(multiply) * localDatabase[0].myNumber;
                res.statusCode = 200;
                return res.end(String(nb)); 
            }
        }    
    }

   res.statusCode = 404;
   return res.end("Resource Not Found");
});


server.listen(port, 'localhost', null, ()=> {
    console.log('Estoy escuchando');
});