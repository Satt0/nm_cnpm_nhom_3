


exports.formatSuccess = (response) => {

    return { error: false, data: response }
}
exports.formatError=({message="SYSTEM ERROR!"})=>{
    return {error:true,message}
}