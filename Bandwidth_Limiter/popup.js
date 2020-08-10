document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('button').addEventListener('click',
     onclick, false)

    function limit () {
        const options = {
            createConnection(options) {
                const socket = new net.Socket();
                return socket.connect({host: options.host, port: options.port});
            },
            hostname: "212.183.159.230",
            path: "/5MB.zip"
        };
        
        const time = Date.now();
        
        const req = http.request(options, (res) => {
        
            res.pipe(new Throttle({rate: 200 * 1024}))
                .on("data", (chunk) => {
                    console.log(chunk.length);
                })
        
            res.on("end", () => {
                console.log("Done! Elapsed time: " + (Date.now() - time) + "ms");
            });
        });
    }

    function onclick () {
        chrome.tabs.query({currentWindow: true, active: true},
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, "Silahkan melanjutkan kegiatan Anda.")
            })
    }

}, false)