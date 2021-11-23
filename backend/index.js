const loadServer=require('./src/app')

loadServer(__dirname).catch(e=>{
    console.log(e.message);
});