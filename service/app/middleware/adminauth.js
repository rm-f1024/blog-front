module.exports = options =>{
    return async function adminauth(ctx,next){
        //console.log('ctx=============>',ctx.session)
        if(ctx.session.openId){
            await next()
        }else{
            ctx.body={data:'请先登录'}
        }
    }
}