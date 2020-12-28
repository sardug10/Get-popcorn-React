export function reduceWriteUp(writeUp, limit=90){
    if(!writeUp) return
    const newWriteUp = []
        if(writeUp.length > limit){
            writeUp.split(' ').reduce((acc,cur)=>{
                if (acc + cur.length <= limit){
                    newWriteUp.push(cur)
                }
                return acc + cur.length
            },0);
            return `${newWriteUp.join(' ')}...`
        }
    return writeUp
}