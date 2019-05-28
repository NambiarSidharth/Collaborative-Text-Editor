var IPFS = require('ipfs')
var node  =  new IPFS({
    repo: repo(),
    EXPERIMENTAL: {
        pubsub:true
    }
}
)

node.on('ready',()=>node.id((err,info)=>{
    if(err){throw err}
    console.log('IPFS node ready with address'+info.id)

}))

var Y = require('yjs')
require('y-memory')(Y)
require('y-array')(Y)
require('y-text')(Y)
require('y-ipfs-connector')(Y)

Y({
    db:{
        name:'memory'
    },
    connector: {
        name: 'ipfs',
        room: 'ipfs-text-colab',
        ipfs: node
    },
    share:{
        textfield: 'Text'
    }
}).then((y)=>{
    y.share.textfield.bind(document.getElementById('textfield'))
})

function repo(){
    return 'ipfs/text-colab/'+ Math.random()
}