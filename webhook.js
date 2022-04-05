const http = require('http')
const crypto = require('crypto')

const SECRET = '123456'
const compareSignature = (body) => {
    return 'sha1=' + crypto.createHmac('sha1', SECRET).update(body).digest('hex')
}

const serve = http.createServer((req, res) => {
        if (req.method === 'POST' && req.url === '/webhook') {
            let buffer = []
            req.on('data', (buff) => {
                buffer.push(buff)
            })
            req.on('end', () =>{
                const body = Buffer.concat(buffer)
                const signature = req.headers['x-hub-signature']
                console.log(signature)
                console.log(compareSignature(body))
                if (signature !== compareSignature(body)) {
                    return res.end('Not ALLOWED')
                }
                res.setHeader('Content-type', 'application/json')
                res.end(JSON.stringify({
                    ok: true
                }))
            })
        } else {
            res.end('NOT FOUND')
        }
    }
)

serve.listen(4000, () =>{
    console.log('服务器已经启动在:http://localhost:4000')
})