function debounce(timeout){
    return (target, name, descriptor)=>{
        const oldVal = descriptor.value
        let timer
        const newFun = function(){
            
        }

        return {
            ...descriptor,
            value(){
                if(timer){
                    clearTimeout(timer)
                }
                timer = setTimeout(()=>{
                    oldVal.apply(this, arguments)
                },timeout)
            }
        }
    }    
}

class A{
    @debounce(0)
    log(){
        console.log('log')
    }
}

const xx = new A

xx.log();
xx.log();
xx.log();
xx.log();
xx.log();
xx.log();