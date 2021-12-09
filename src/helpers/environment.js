let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = "http://localhost:3000"
        break;
        case "jld-mood-client.herokuapp.com":
            APIURL = "https://jld-mood-server.herokuapp.com"
}

export default APIURL;