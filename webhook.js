import http from 'http'

const serve = http.createServer((req, res) => {
        if (req.method === 'POST' && req.url === '/webhook') {
            const buffs = []
            req.on('data', (buff) => {
                buffs.push(buff)
            })

            req.on('end', () =>{
                const payload = Buffer.from(buffs).toString()
                console.log(payload)
            })
            res.setHeader('Content-type', 'application/json')
            res.end(JSON.stringify({
                ok: true
            }))
        } else {
            res.end('NOT FOUND')
        }
    }
)

serve.listen(4000, () =>{
    console.log('服务器已经启动在:http://localhost:4000')
})